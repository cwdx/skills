#!/usr/bin/env node
// Level and spectrum report for a WAV file, to judge a generated track before a person listens.
// Usage: node analyze-wav.mjs file.wav [--profile calm|lively]   |   node analyze-wav.mjs --selftest
// Reads 16-bit PCM or 32-bit float WAV. No dependencies. Exit 0 when the profile holds, 1 when it does not, 2 on bad input.
import { readFileSync } from 'node:fs'

const PROFILES = {
  calm: { maxPeak: 0.25, maxAbove2k: 0.01 },
  lively: { maxPeak: 0.6, maxAbove2k: 0.2 },
}
const BANDS = [[0, 200], [200, 500], [500, 2000], [2000, 4000], [4000, 8000], [8000, Infinity]]
const SIZE = 4096

function parseWav(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') throw new Error('not a WAV file')
  let pos = 12, fmt, data
  while (pos + 8 <= buf.length) {
    const id = buf.toString('ascii', pos, pos + 4), size = buf.readUInt32LE(pos + 4)
    if (id === 'fmt ') fmt = { format: buf.readUInt16LE(pos + 8), channels: buf.readUInt16LE(pos + 10), rate: buf.readUInt32LE(pos + 12), bits: buf.readUInt16LE(pos + 22) }
    if (id === 'data') data = buf.subarray(pos + 8, pos + 8 + size)
    pos += 8 + size + (size % 2)
  }
  if (!fmt || !data) throw new Error('missing fmt or data chunk')
  const step = fmt.bits / 8, frames = Math.floor(data.length / (step * fmt.channels))
  const mono = new Float32Array(frames)
  for (let i = 0; i < frames; i++) {
    let sum = 0
    for (let c = 0; c < fmt.channels; c++) {
      const at = (i * fmt.channels + c) * step
      sum += fmt.format === 3 ? data.readFloatLE(at) : fmt.bits === 16 ? data.readInt16LE(at) / 32768 : (() => { throw new Error(`unsupported format ${fmt.format}/${fmt.bits}`) })()
    }
    mono[i] = sum / fmt.channels
  }
  return { rate: fmt.rate, samples: mono }
}

function fft(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1
    for (; j & bit; bit >>= 1) j ^= bit
    j ^= bit
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]] }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len
    for (let i = 0; i < n; i += len)
      for (let k = 0; k < len / 2; k++) {
        const wr = Math.cos(ang * k), wi = Math.sin(ang * k)
        const a = i + k, b = a + len / 2
        const tr = re[b] * wr - im[b] * wi, ti = re[b] * wi + im[b] * wr
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti
      }
  }
}

export function analyze({ rate, samples }) {
  let sum = 0, peak = 0
  for (const v of samples) { sum += v * v; peak = Math.max(peak, Math.abs(v)) }
  const power = BANDS.map(() => 0)
  let total = 0
  const re = new Float64Array(SIZE), im = new Float64Array(SIZE)
  for (let at = 0; at + SIZE <= samples.length; at += SIZE) {
    for (let i = 0; i < SIZE; i++) { re[i] = samples[at + i] * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / SIZE)); im[i] = 0 }
    fft(re, im)
    for (let bin = 1; bin < SIZE / 2; bin++) {
      const hz = (bin * rate) / SIZE, p = re[bin] ** 2 + im[bin] ** 2
      power[BANDS.findIndex(([lo, hi]) => hz >= lo && hz < hi)] += p
      total += p
    }
  }
  const share = power.map((p) => (total ? p / total : 0))
  return { rms: Math.sqrt(sum / Math.max(1, samples.length)), peak, bands: BANDS.map(([lo, hi], i) => ({ lo, hi, share: share[i] })), above2k: share.slice(3).reduce((a, b) => a + b, 0) }
}

const judge = (report, profile) => {
  const limit = PROFILES[profile]
  const problems = []
  if (report.peak > limit.maxPeak) problems.push(`peak ${report.peak.toFixed(3)} is over ${limit.maxPeak}`)
  if (report.above2k > limit.maxAbove2k) problems.push(`${(report.above2k * 100).toFixed(2)}% of energy above 2 kHz is over ${limit.maxAbove2k * 100}%`)
  return problems
}

function tone(rate, seconds, parts) {
  const samples = new Float32Array(rate * seconds)
  for (let i = 0; i < samples.length; i++) samples[i] = parts.reduce((s, [hz, gain]) => s + gain * Math.sin((2 * Math.PI * hz * i) / rate), 0)
  return { rate, samples }
}

function selftest() {
  const calm = analyze(tone(44100, 3, [[220, 0.1], [440, 0.05]]))
  const bright = analyze(tone(44100, 3, [[220, 0.1], [5000, 0.4]]))
  const ok = judge(calm, 'calm').length === 0 && judge(bright, 'calm').length === 2 && calm.above2k < 0.001 && bright.above2k > 0.5
  console.log(ok ? 'selftest passed' : 'selftest FAILED')
  process.exit(ok ? 0 : 1)
}

const args = process.argv.slice(2)
if (args.includes('--selftest')) selftest()
const file = args.find((a) => !a.startsWith('--'))
const profile = args.includes('--profile') ? args[args.indexOf('--profile') + 1] : 'calm'
if (!file || !PROFILES[profile]) { console.error('usage: analyze-wav.mjs file.wav [--profile calm|lively] | --selftest'); process.exit(2) }
try {
  const report = analyze(parseWav(readFileSync(file)))
  const problems = judge(report, profile)
  console.log(`rms ${report.rms.toFixed(4)}  peak ${report.peak.toFixed(3)}  above 2 kHz ${(report.above2k * 100).toFixed(2)}%`)
  for (const b of report.bands) console.log(`${String(b.lo).padStart(5)}-${b.hi === Infinity ? 'inf' : b.hi}`.padEnd(14) + `${(b.share * 100).toFixed(1)}%`)
  console.log(problems.length ? `profile ${profile} broken: ${problems.join('; ')}` : `profile ${profile} holds`)
  process.exit(problems.length ? 1 : 0)
} catch (e) {
  console.error(e.message)
  process.exit(2)
}
