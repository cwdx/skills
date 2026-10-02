# Rhythm and feel

## The grid

Work on a fixed number of steps per bar (sixteen sixteenth notes is the usual choice). Every layer is a pattern of steps, a length and a velocity, so layers can be placed, shifted and repeated on integers, and a bar is a list that a test can read.

## Feel

- **Swing** delays every second step by a share of a step. Communities quote swing on different scales (a percentage of the beat, of the step, or a drum machine's own scale), so the style sheet must say which scale a number is on, and the code must use one scale throughout.
- **Looseness** is small seeded timing offsets, mostly late, applied when notes are scheduled rather than written into the score. It should be large enough to feel played and small enough to stay in time; the sheet gives the style's tightness, and a listening round tunes it. Keep the bass and the kick tight, because they anchor the groove.
- **Velocity** varies within a range so no two onsets are identical; accents and ghost notes are part of a style's pattern, so they come from the sheet.
- Keep the composer's output on the grid and do swing and looseness in the player, so the score stays readable and testable.

## Density

- Give each section a density, meaning how many events each layer plays per bar, and build the form with it: sparse to full and back, as the style does.
- Give a layer a rest probability only if the style's layer rests. A pattern that is the identity of the style (a kick pattern, a riff) stays locked, and a texture that is supposed to drift rests and varies.
- Let app state add or remove events, never rearrange the structure: chords, form and tempo stay where they are.

## Independent clocks

A layer whose length does not divide the bar returns to the same place only after many bars. Use one when the style wants a texture that shifts against the pulse, with notes drawn from the chord that sounds when each one fires, so it cannot clash. Do not use one on a pattern that gives the style its identity; the sheet says which layers those are.

## Form

Build a piece from sections of two, four or eight bars: an introduction, a main body, a contrasting stretch and a close. Keep the contrast to a few elements at a time (chords, register, drum feel). Whether the music ends, fades or loops back is a tell of the style, so take it from the sheet; when it loops, make sure something (a pulse, a pad, a bass note) runs across the join.
