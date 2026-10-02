# Composition craft: the idea, not just the sound

Everything else in this skill makes a track sound good. This file is about what makes it a tune: something a listener can recognise, hum and wait for. You do not need to read music. Each term below is a thing a program can make, count and test.

## Words, in one line each

- **Bar**: one repeat of the beat pattern. This skill uses 16 steps to a bar. A **phrase** is 2, 4 or 8 bars that say one thing, like a sentence.
- **Motif / theme**: a few notes with a recognisable rhythm and shape. It is the seed of the piece and comes back changed.
- **Hook**: the part you hum afterwards. Short, in the foreground, and it returns almost unchanged.
- **Riff**: a short pattern repeated as the groove, often the bass or an arpeggio. In driving electronic music the riff is the hook.
- **Contour**: the up-and-down shape of a melody. People remember the shape better than the notes.
- **Cadence**: how a phrase ends. A stable ending lands on a chord tone (the home note, its third or its fifth); an open one stops on the second or fifth note of the scale and asks for more.
- **Bridge (middle section, B part)**: a contrasting stretch, mostly 4 to 8 bars and about two thirds of the way through, with different chords, melody or drum feel, so the return of the main idea feels fresh.
- **Breakdown, build, drop** (electronic): a breakdown strips the drums to leave pads and melody; a build raises energy with a rising pitch or a roll of snare hits; the drop is the full-energy return, the payoff.
- **Stinger**: a short phrase fired over the music on an event, in games and apps.

## Rules a generator should enforce

Tune-ness is made of limits. Each rule is a number a test can check. The numbers are craft conventions from educators and producers, not experiments, except where marked, and some styles break them on purpose; the style sheet decides.

1. **Mostly steps.** About two thirds to three quarters of the intervals between melody notes move one or two scale degrees. A leap of a fourth or more is rare, and one in four or five notes at most.
2. **Recover leaps.** After a leap, step back the other way. Never follow a big leap with another in the same direction.
3. **One peak.** The highest note of a phrase happens once, on a strong beat, roughly two thirds of the way through. Keep the range to about an octave and a half (12 to 18 semitones) for a lead you can hum.
4. **Chord tones on the strong beats.** Beats one and three land on notes of the chord that is sounding; notes that are not in the chord sit on weak beats and move by step.
5. **Repeat a rhythm cell.** Choose a short pattern of two to four note lengths (long, short, short, long) and use it in about 60–75% of the bars. A hook is mostly rhythm, so the pitches may change while the rhythm returns.
6. **Repeat, vary, return.** State the idea, repeat it within a bar or two with one change (a new pitch, ending or rhythm), keep about half the notes identical, and bring the original back unchanged near the end. Exposure and repetition are the best-supported predictors of a tune sticking; a familiar arch with one surprise is what stays interesting (research-backed, qualitative).
7. **Phrases come in 2, 4 or 8 bars, as a question and an answer.** The first phrase ends open, the second ends on the home note.
8. **End phrases stable and long.** The last note of a phrase is a chord tone held at least twice as long as the average note.
9. **Contrast on purpose.** Put a bridge or breakdown where the energy has been constant for a long stretch, change at least two of chords, register and drum feel, and keep it short.
10. **A loop must close.** Make loop lengths a whole number of bars, end close to where it starts, let reverb and echo tails ring over the join, and switch tracks or sections on a bar line, never in the middle of one.

## Developing a motif

Every operation is one line on a list of (scale degree, length) pairs:

- **Sequence**: the same shape moved up or down a step, two or three times.
- **Inversion**: flip the up and down.
- **Augmentation or diminution**: double or halve every length.
- **Fragmentation**: keep the first two or three notes.
- **Ornament**: add a neighbour or passing note on a weak beat.
- **Transposition**: move it by a scale degree, not a fixed number of semitones, so it stays in the mode.

Plan the piece before playing it: pick the key, chords, motif and form up front, expand the form to a list of bars, and then fill each bar. A model that only picks the next note from the last two or three (a Markov chain) wanders, because it has no phrase, no return and no ending.

## Where the idea lives in a style

Ask the style sheet, and expect the answer to differ: in some styles the idea is a melody on a lead, in some it is a bass or arpeggio riff locked to the grid, in some it is a chord rhythm, in some it is a slow gesture or a texture, and in some there is deliberately no hook because it would pull the ear. Where the idea is a locked pattern, vary it at phrase ends and section changes, not note by note. Where there is no hook, say so in the sheet and let the variety come from the long-form mechanisms. Two illustrations: a groove-based dance track may keep its piano-stab rhythm locked and turn around every fourth bar; an atmospheric bed may have no hook at all.

## Tests for tune-ness

Add these beside the determinism and range tests, for any track with a lead:

- Over many bars, at least about 65% of lead intervals are within two scale degrees.
- A leap of three or more degrees is followed by a step in the other direction in nearly every case.
- The most common rhythm cell is used in at least about half the bars of a section.
- Each phrase has one highest note, and each phrase ends on a chord tone.
- The last bar of a loop and the first bar of the next share a pulse (a kick, a bass note or a pad) so there is no silence at the join.
