# Timbre and mix

Most complaints about generated music are spectrum complaints. Design each voice for a role and a zone, then measure the result.

## Zones

| Zone | Typical range | What lives there and the risk |
| --- | --- | --- |
| Sub and bass | below about 200 Hz | one voice at a time; two bass-range voices mask each other |
| Low-mid | about 200–500 Hz | the muddy band: keep few voices here and keep reverb out of it |
| Mid | about 500 Hz–2 kHz | most notes and chords; the crowded band |
| Presence | about 2–6 kHz | what cuts through and what tires: soften it where the style is gentle |
| Air | above about 6 kHz | sparkle and noise |

The sheet says which zones the style fills and which it keeps quiet. Draw the budget before building: which voice owns each zone, and which band must stay clean.

## Building a voice

A voice is an oscillator or two, a filter, an envelope and some movement. To build one from the style sheet:

1. Read what the style's instrument or machine did to the sound, and pick the waveform family that is closest: sine for pure and round, triangle for soft and hollow, saw for rich and bright, pulse for reedy, noise for breath, hats and texture.
2. Shape it with a low-pass filter set to the brightness the sheet wants. A filter on every voice is cheaper and safer than a bright voice and a dark master.
3. Set the attack and release from the voice's role: a bed swells and fades, a stab is short, a bass starts and stops cleanly.
4. Add movement: two oscillators a few cents apart beat slowly against each other, a slow pitch drift gives an analogue feel, a tiny noise burst gives a hit its click.
5. Place it in the register the sheet gives and check its upper partials. A partial a few octaves above the note can be what a listener hears as shrill; keep it faint or remove it.

Illustrations of the method, not recipes to copy: a soft bell can be two sines a few cents apart with a faint octave and a low-pass; a pad can be a triangle with two detuned saws through a low-pass and a slow attack; an electric-piano stab can be a sine with a brief bell partial and a medium decay. A style that wants a different sound gets a different voice.

## Reverb

A hall is a convolver with a generated impulse response, so no assets are needed: noise multiplied by a decay that reaches -60 dB at the chosen reverberation time, passed through a one-pole low-pass whose cutoff falls along the tail, so the tail darkens. Give it a short pre-delay, remove the low end from the return so the tail adds air and no mud, send only the voices that should sit back, and keep the drums and bass dry unless the style wants them wet. Build the convolver the first time a track asks for it, cache the impulse per context, and disconnect the nodes with the bus on stop.

```ts
let low = 0
for (let i = Math.floor(rate * preDelay); i < length; i++) {
  const t = i / rate - preDelay                       // seconds into the tail
  low += (rng.float() * 2 - 1 - low) * (0.5 - 0.42 * Math.min(1, t / rt60))  // a one-pole low-pass, brighter early and darker late
  data[i] = low * 10 ** ((-3 * t) / rt60)             // -60 dB at the reverberation time
}
```

The size and darkness of the space are tells of a style; take them from the sheet.

## Echo

Time the delay to the tempo, so it falls on a grid division, and keep its feedback low enough that repeats fade. Darken each repeat with a low-pass inside the feedback loop: repeats as bright as the source tire the ear.

## Master

- A low-pass on the master, with its cutoff following the app state slowly and drifting on cycles that never line up, so the brightness does not settle.
- Soft saturation behind a low-pass, so any harmonics it adds come from dark material, and a soft clip at the end to keep peaks safe.
- Slow pitch drift on oscillators for an analogue feel, deeper for a worn, retro sound and shallower for a clean one.

## Levels

Match each track to the others in the product by measuring RMS from the real output, within a few decibels, and keep peaks well below full scale before the last limiter. Loudness norms differ by style; the sheet gives the target.

## Harshness checklist

When a track is called shrill, piercing or tiring, go down this list and stop at the first fix that works.

1. Measure the share of energy in the band the style calls unpleasant. For a soft style that is a fraction of a percent of the total above the presence band's start.
2. Lower the register of the loudest sustained voice.
3. Remove or soften the voice's upper partial.
4. Add or lower the voice's own low-pass.
5. Lower the master cutoff and darken the echo and reverb return.
6. Only then change the notes.
