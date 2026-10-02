---
name: generative-music
description: >-
  Use when composing, researching or tuning music that a program generates, in
  any style: an endless soundtrack, a game or UI score, a seeded composer in
  code (Web Audio, Tone.js, SuperCollider, any engine), or a style you must
  learn first ("make it sound like ..."). Also when a generated track sounds
  shrill, muddy, repetitive, mechanical or too loud. Covers researching a style
  from the web into a spec, the musical idea (hooks, riffs, motifs, bridges,
  loops that close), harmony, rhythm, timbre, reverb, long-form variation,
  adapting to app state, tests and measurement. Not for mixing recorded audio
  or prompting text-to-music models.
license: MIT
metadata:
  version: "0.2.0"
---

# Generative music

A generated score is a small program that has to sound right for as long as someone listens, with nobody editing it. Every style has its own idea of right, so this skill does not carry recipes for styles. It carries a method: learn what makes the target style sound like itself, write that down as a spec, build to the spec, and check the result by measurement and by ear.

Compose in code as data: a pure function turns a seed and the app's state into the next bar of note events, and a separate synth plays them. That keeps the music reproducible, testable and swappable. The shape is in [architecture.md](references/architecture.md).

## 1. Brief

Write down in one line each: the mood, where it plays and what the listener is doing, how long they stay, whether it must replay from a seed, what app state it should follow and which direction means what. Name the style the way a fan of it would, with the era or scene if there is one.

Done when: the brief has those lines and a style name, or says "no existing style" and describes the feel in words.

## 2. Learn the style

Research the style before choosing any value, and do the searching now: a plan to research later is not research, and a design that skips it must mark every value as a placeholder. A style is a set of tells: the few choices (pulse, harmony, voices, form, mix, how it loops) that make a listener name it within seconds. Find the tells on the web, write them as a style sheet, and treat that sheet as the spec for everything after. When the style is new to you, or when you are about to type a number from memory, read [research-a-style.md](references/research-a-style.md) for the search method, the source ladder and the sheet's fields. [worked-examples.md](references/worked-examples.md) shows two finished sheets as illustrations of the format, not as values to reuse. [sources.md](references/sources.md) lists sources already read and which of their numbers are conventions rather than research.

Done when: the style sheet has every field filled or marked unknown, each number has a source or is marked a guess, and at least two independent sources agree on each of its tells.

## 3. Choose the pitch world

Derive the mode, tonic range, chord set and note pool from the sheet. A pool that cannot clash lets randomness run without ever sounding wrong. When choosing or voicing, read [harmony.md](references/harmony.md).

Done when: every note any layer can play belongs to the sounding chord or to a pool declared consonant with it (a colour note is a declared exception with its probability), and sustained voices have a register written as numbers.

## 4. Write the idea

Decide what the listener will recognise in this style: a hook, a riff, a theme, a texture, or nothing at all. Write it as a short pattern with a rhythm cell, a contour and an ending, then decide where it returns, how it changes and where a bridge or breakdown contrasts it. Read [composition-craft.md](references/composition-craft.md) when writing it. A person who does not read music can check every rule in it.

Done when: the sheet's idea is written as a pattern, each phrase has a length and an ending, and the idea returns at least once with one change, or the style's lack of a hook is stated.

## 5. Set the feel

Take tempo, swing, timing looseness, velocity range and density from the sheet. Leave rests where the style rests. When writing the groove or the density curve, read [rhythm-and-feel.md](references/rhythm-and-feel.md).

Done when: each section has a density, and each layer is either locked to a pattern or free to rest, as the sheet says that style does it.

## 6. Shape the sound

Give each voice a role and a frequency zone, and build each voice from the sheet's description of how the style sounds. Decide where the track must stay soft, dark or clean, and put space around what is meant to sit back. Read [timbre-and-mix.md](references/timbre-and-mix.md) when building a voice, a reverb or an echo, or when anything is harsh.

Done when: each voice traces to a line in the style sheet, no voice has energy in a band the sheet calls unpleasant for this style, and levels sit near the other tracks in the product.

## 7. Make it last

Repetition without variation turns into noise for the listener. Choose the variation the style itself uses, and use it on a slow clock as well as a fast one. Read [long-form.md](references/long-form.md) when the track runs longer than a few minutes, loops, or reacts to state.

Done when: the sheet names where this style varies (which layers stay fixed, which move, how it closes a loop), the build follows it, and a change of state moves density and brightness by smoothed steps, never by a jump.

## 8. Verify

Test what the code guarantees and measure what the ear will judge. Read [verification.md](references/verification.md) for the tests and for measuring level and spectrum from a running page or a rendered file with `scripts/analyze-wav.mjs`.

Done when: the determinism and range tests pass, `node scripts/analyze-wav.mjs --selftest` passes, and a measurement of the real output shows level, peak and the spectrum band the style sheet cares about.

## 9. Listen and revise

Ask the person to listen for a while in the place it will play, and to name what bothers them. Map the complaint to its cause with the table in [verification.md](references/verification.md), change one thing, measure again, and ask again. A complaint about pitch is a register or spectrum problem before it is a harmony problem.

Done when: the listener has no complaint left, or the remaining ones are recorded as taste.

## Rules that bind under pressure

- The style sheet is the authority. When a value in any reference here disagrees with it, the sheet wins; the references explain how to build, and say little about what a style should be.
- Draw every random number from the seeded generator, and draw the same count whatever the app state is, so a calm and a busy page stay comparable and a seed replays.
- Use only the voices and moves the style uses. A recipe from another style is a different style.
- Change one thing per listen: two changes at once cannot be told apart by ear.
- Explain every musical term in plain words the first time it appears, unless the person has shown they read music. Most people who ask for generated music are not musicians.
- Say where each number came from. A figure from a producer blog is a starting value to tune, and the sheet says which it is.
