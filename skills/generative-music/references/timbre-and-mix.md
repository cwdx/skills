# Timbre and mix

Most complaints about generated music are spectrum complaints. Design each voice for a zone and measure the result.

## Zones

| Zone | Hz | Rule |
| --- | --- | --- |
| Sub, bass | 30–200 | one voice, a sine or a soft triangle, mono |
| Low-mid | 200–500 | the muddy band: keep the number of voices here small and thin the reverb return here |
| Mid | 500–2 000 | where pads, keys and most notes live |
| Presence | 2 000–6 000 | what bites and tires: soften it in a calm track and cut it in the reverb |
| Air | 6 000+ | only noise and sparkle; for a calm track, almost none |

## Voice recipes

All are oscillator-only starting points. Replace the waveform before reaching for an effect.

- **Bell or star (the "halo").** Two sines a few cents apart (±4) so each note beats slowly, plus a faint octave (about 10% level). Attack 30–60 ms, a tail of 2 s or more, a low-pass near 2.4 kHz. Slow detune drift of a few cents. Avoid an FM bell with a partial at 4× the pitch: that partial is the shrill part.
- **Pad bed.** A triangle or sine centre with two detuned saws (±5–8 cents), through a low-pass at 600–1 800 Hz, Q about 0.7. Attack 1–4 s, release 2–8 s, so chords arrive and leave like a tide. Two or more voices per note, panned a little apart.
- **Electric piano (lo-fi).** A sine tine with a short bell partial (4× at about 6% for 0.1 s), decaying under its sustain; slow wow of 5–8 cents.
- **Bass.** A sine for calm tracks, a triangle for energetic ones; envelope with a short attack and a short release.
- **Pluck.** A sine through a 1.8 kHz low-pass, 15 ms attack, a 0.3 s release.
- **Noise.** Vinyl crackle: sparse seeded clicks of 1–3 ms, one to a few per second, about -25 to -30 dB under the music. Air or tape hiss: a band-passed bed at -40 dB or lower. Hats: band-passed noise near 2.4 kHz, short, at 55–70% velocity.

## Relative levels

Set the pad bed as the reference and tune from there. Starting values: bells and stars 6–10 dB under the bed; bass 3 dB under; noise beds 25–40 dB under; a pad's two voices panned about ±25% apart. Move a layer by 2–3 dB at a time and re-measure.

## Reverb: the largest single step toward dreamy

A hall is a convolver with a generated impulse response, no assets needed: noise multiplied by a decay that reaches -60 dB at the RT60, run through a one-pole low-pass whose cutoff falls over the tail, so the tail darkens.

- RT60 4–10 s for ambient, 1–2 s for lo-fi. Pre-delay 20–50 ms.
- Build the impulse like this for each channel (independent noise per channel), and normalise by leaving the convolver's `normalize` on:

```ts
let low = 0
for (let i = Math.floor(rate * preDelay); i < length; i++) {
  const t = i / rate - preDelay                       // seconds into the tail
  low += (rng.float() * 2 - 1 - low) * (0.5 - 0.42 * Math.min(1, t / rt60))  // one-pole low-pass: bright early (about 6 kHz), dark late (about 1.5 kHz)
  data[i] = low * 10 ** ((-3 * t) / rt60)             // -60 dB at the RT60
}
```
- High-pass the return at about 120 Hz so the tail adds air and no mud.
- Send the beds and bells to it, not the bass or drums. Build the convolver the first time a track asks for it, and cache the impulse per context.
- Fade the dry bus on stop and disconnect the reverb nodes with it.

## Echo

- Time it to the tempo: three sixteenths is a dotted eighth, the classic. Feedback 0.3–0.4, wet 20–30%.
- Darken each repeat: a low-pass (about 1.5 kHz) and a high-pass (about 200 Hz) inside the feedback loop. Repeats that stay as bright as the source tire the ear.

## Master

- A low-pass on the master (2.5–4 kHz for calm, 4–7 kHz for lively), with its cutoff following the app state slowly.
- Let the cutoff drift by a quarter either way on two slow cycles that never line up (for example 7 and 11 bars), so the brightness never settles.
- Soft saturation `tanh(k·x)/tanh(k)` with k of 1.5–3 behind a low-pass, so harmonics are made from dark content. A soft clip at the end keeps peaks safe.
- Wow and flutter: a slow pitch LFO of 3–8 cents at 0.1–0.6 Hz, optionally a faint 5–7 Hz one of 1–2 cents. Lower and slower for ambient.

## Levels

- Match the loudness of the other tracks in the same product within about 3 dB RMS, measured from the real output. Ambient sits at -20 to -14 LUFS, lo-fi near -12.
- Peaks stay under -6 dBFS before the master chain's limiter. A calm track has no reason to approach 0.

## Harshness checklist

When a track is called shrill, piercing, tiring or "high-pitched", go down this list and stop at the first fix that works.

1. Measure the share of energy above 2 kHz. For a calm track it should be a fraction of a percent.
2. Lower the register of the sustained voice that is loudest above C5.
3. Remove or soften the upper partial of the voice (an FM index, a bell partial, a bright saw).
4. Add or lower the voice's own low-pass.
5. Lower the master cutoff and darken the echo and reverb return.
6. Only then change notes.
