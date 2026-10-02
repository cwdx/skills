# Long-form: staying good for as long as someone listens

Repetition is fine; repetition with no variation is not. A loop that keeps its length, pitches and brightness exactly turns into noise for the listener. Different styles solve this differently, and the style sheet says how.

## Pick the variation the style uses

| Mechanism | What it does | Typical home |
| --- | --- | --- |
| Layers on lengths that never line up | the layers shift against each other and the whole almost never repeats | atmospheric music with no fixed groove |
| Changes at phrase ends | a fill, a turnaround bar or a changed last bar every few bars | groove-based music, where the pattern itself must stay put |
| Section changes and a macro arc | sparse to full and back over minutes | most styles |
| Slow modulators off the tempo grid | brightness, pan or filter drift on cycles that never line up | almost any soft style |
| Rare events | a quiet colour note, a longer chord, a dropped part, once in many bars | any style that can afford a surprise |
| Piece-to-piece change | a new key, progression, motif or tempo each time | any seeded endless track |

Use the mechanisms the sheet names. Do not add a mechanism from another style: a drifting layer on a locked groove, or random gating of a riff, sounds like a fault. A pulse (a kick, a bass or a pad) that keeps running across the join between pieces stops the loop from dropping out.

## Layers on independent clocks

Give each layer its own length in steps (a prime or near-prime does best) and take each pitch from the chord sounding when it fires, so the layers never clash however the phase falls. One layer per texture is usually plenty. This is the idea behind tape-loop music: loops of different lengths, one note each, which almost never re-align.

## Rare events

Draw the chance every bar, so the stream stays stable, and choose it from how often the event should happen: p = 1 / (bars per minute × minutes between events).

## Following state

- One input in, two outputs: map it to density (more events, shorter rests) and brightness (a higher cutoff), nothing structural.
- Smooth every change, over a long time or per bar by a small step; never jump.
- Use two thresholds with a dead band to decide a switch of track, so a value hovering near the line does not flip the music.
- Say in the brief which end of the input means what, because "busy" can mean urgent or focused, and the two are opposite.

## Sources of fatigue

| Cause | Fix |
| --- | --- |
| Same length and pitches for minutes | a layer on an independent clock, or a phrase-end change |
| Constant density | a form with a contrast; rests where the style rests |
| Constant brightness | slow modulation of the filter |
| Bright repeats and tails | dark echo and reverb |
| Hard seams between pieces | a pulse across the join, fades, held chords |
| Everything exactly on the beat | seeded looseness where the style is loose |
| A periodic swell, duck or pad re-attack | it is heard as a pulse; keep it out of a track meant to sit in the background |
| A restart or key change at each piece boundary in a track that should loop | keep the key, chords and riffs for the whole session and vary only the lead |
