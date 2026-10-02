# Skills

Skills for AI coding agents, in the [Agent Skills](https://agentskills.io/) format.

[![skills.sh](https://skills.sh/b/cwdx/skills)](https://skills.sh/cwdx/skills)

```sh
npx skills add cwdx/skills
```

## Available skills

### generative-music

Compose, tune and test music that a program generates: an endless ambient, lo-fi, game or UI soundtrack, or a seeded
composer in code on Web Audio, Tone.js, SuperCollider or any engine. It works through the musical idea (hooks, riffs,
motifs, bridges, loops that close), harmony, rhythm and feel, timbre and reverb, long-form variation, adapting to app
state, and tests and measurement. A plain-language guide, so you do not need to read music.

**Use when:**

- Writing a seeded generative soundtrack, or a track for a procedural music system
- A generated track sounds shrill, muddy, repetitive, mechanical or too loud
- You want a "dreamy", "space", "chill", "driving" or "focus" score
- A loop does not close well, or has no hook

**What is in it:**

- A process from brief to listening review, each step ending in a check
- Starting values for ambient, lo-fi, driving and focus tracks
- Recipes for voices, a generated-impulse reverb, echo and a master chain that stays dark
- Rules a generator can enforce so a melody sounds like a tune, and tests for them
- `scripts/analyze-wav.mjs`, which reports level and the share of energy above 2 kHz for a rendered file, and fails
  when a track breaks its profile
- Cited sources, marking which numbers are conventions and which are research

Not for mixing recorded audio or prompting text-to-music models.

## License

MIT.
