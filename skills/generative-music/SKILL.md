---
name: generative-music
description: >-
  Use when composing, tuning or reviewing music that a program generates: an
  endless ambient, lo-fi, game or UI soundtrack; a seeded composer in code
  (Web Audio, Tone.js, SuperCollider, any engine); a track that sounds shrill,
  muddy, repetitive, mechanical or too loud; or a "dreamy", "space", "chill" or
  "focus" score. Covers the musical idea (hooks, riffs, motifs, bridges,
  breakdowns, loops that close), harmony, rhythm, timbre, reverb, long-form
  variation, adapting to context, tests and measurement. Not for mixing recorded audio or
  prompting text-to-music models.
license: MIT
metadata:
  version: "0.1.0"
---

# Generative music

A generated score is a small program that has to sound good for hours, with nobody editing it. It fails in five ways: shrill, muddy, repetitive, mechanical, or louder than everything else. Each step below prevents one of them and ends in a check.

Compose in code as data: a pure function turns a seed and the app's state into the next bar of note events, and a separate synth plays them. That keeps the music reproducible, testable and swappable. The shape is in [architecture.md](references/architecture.md).

## 1. Brief

Write down, in one line each: the mood, where it plays (focus, sleep, game, UI, stream), how long a listener stays (minutes or hours), whether it must replay from a seed, and what app state it should follow (busy, calm, danger, time of day) and which direction means what: busy is denser and brighter unless the brief says otherwise. Pick the nearest archetype in [archetypes.md](references/archetypes.md) as the starting values.

Done when: the brief has all five lines and one archetype is named with the values you will change.

## 2. Choose the pitch world

Fix the mode, the tonic range, the chord set and the note pool before any rhythm. A pool that cannot clash lets randomness run without ever sounding wrong. When choosing, read [harmony.md](references/harmony.md).

Done when: every note any layer can play belongs to the current chord or to a pool declared consonant with it (a rare colour note is a declared exception with its probability), and the sustained voices' registers are written as numbers.

## 3. Write the idea

Decide what the listener will recognise: a hook, a riff or a theme, or nothing at all for a bed. Write it as a short pattern with a rhythm cell, a contour and a place to end, then decide where it returns, how it changes, and where a bridge or breakdown contrasts it. When writing it, read [composition-craft.md](references/composition-craft.md). A person who does not read music can still check every rule in it.

Done when: the brief names the idea (or says a bed has none), each phrase has a length and an ending, and the idea returns at least once with one change.

## 4. Set the feel

Decide tempo, swing, timing jitter, velocity range, and how dense each section is. Leave rests: silence is what makes the notes that do play feel placed. When writing the groove or the density curve, read [rhythm-and-feel.md](references/rhythm-and-feel.md).

Done when: each section has a density, and each layer has either a rest probability or a locked pattern: ambient and chill layers rest and drift, a driving riff stays locked and changes only at the end of a phrase.

## 5. Shape the sound

Give each voice a role (bed, bell, bass, texture) and a frequency zone. Keep sustained, exposed voices low and soft; put a long dark reverb on the beds. Start with the recipes in [timbre-and-mix.md](references/timbre-and-mix.md) when you build a voice, a reverb or an echo, or when anything is harsh.

Done when: no sustained voice has energy that the brief calls shrill, the reverb return has its low end filtered, and levels sit near the other tracks of the same product.

## 6. Make it last

A loop of a few bars becomes noise to the listener within minutes. Run layers on cycles that never line up, vary over minutes as well as bars, and let state change density and brightness slowly. Read [long-form.md](references/long-form.md) when the track must run longer than a few minutes or react to state.

Done when: a calm track has two layers with lengths that do not divide the bar and a driving track has a locked riff that changes only at phrase ends, and a change of state moves density and brightness by smoothed steps, never by a jump.

## 7. Verify

Test what the code guarantees and measure what the ear will judge. Read [verification.md](references/verification.md) for the tests (same seed same bars, ranges, form, context independence; the tune checks are in `composition-craft.md`) and for measuring level and spectrum from a running page or a rendered file with `scripts/analyze-wav.mjs`.

Done when: the determinism and range tests pass, `node scripts/analyze-wav.mjs --selftest` passes, and a measurement of the real output shows level, peak and the share of energy above 2 kHz.

## 8. Listen and revise

Ask the person to listen for ten minutes and name what bothers them. Map the complaint to its cause with the table in [verification.md](references/verification.md), change one thing, measure again, and ask again. A complaint about pitch is a register or a spectrum problem, so lower the voice and check the spectrum before touching the harmony.

Done when: the listener has no complaint left, or the remaining ones are recorded as taste.

## Rules that bind under pressure

- Draw every random number from the seeded generator, and draw the same count whatever the app state is. A track whose state changes the draw count stops being reproducible and stops being comparable between a calm and a busy page.
- Keep sustained voices below the band the brief calls harsh, and measure, because a partial two octaves up is what bites.
- Lock the groove of a driving or dance track. Randomising which notes of the bass or arp play each bar sounds like a glitch, not a variation; vary at the end of a phrase.
- Change one parameter per listen. Two changes at once cannot be told apart by ear.
- Cite where a number came from. Producer-blog numbers are starting values, so say so, and tune by measurement and by ear: [sources.md](references/sources.md) says which are which.
