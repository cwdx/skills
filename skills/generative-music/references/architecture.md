# Architecture

Build the composer as data in, data out, so it can be seeded, tested, swapped and replayed. The synth is a separate layer that only reads events.

## The composer

One pure function per track. It takes the previous state and the app's context and returns the next bar of events and the next state:

```ts
type Context = { activity: number; intensity: number }   // 0 to 1, from the app
type Event = { voice: string; step: number; note: number; len: number; velocity?: number }
type Bar = { bar: number; bpm: number; chord: { degree: string; root: number }; notes: Event[]; drums: Event[]; section: { role: string; bar: number; length: number } }

function nextBar(prev: State, ctx: Context): { state: State; events: Bar }
```

- The state carries the PRNG state, a bar counter, the current plan (key, tempo, chord plan, motif) and nothing from the browser or the clock.
- A bar is 16 steps (sixteenth notes), so layers can be placed, shifted and repeated on integers.
- Plan a whole piece when the last one ends (key, progression, motif, form), then play it bar by bar. Planning ahead lets motifs return and sections breathe.
- Wrap it in a stateful object (`nextBar(ctx)`) for the player. A track is `{ id, name, tone, create(seed) }`, kept in a registry that callers can add to, so adding a track never touches the player. Derive the built-in ids from an `as const` tuple so they type-check, and accept any string for custom ones.

## Seeded randomness

Use a small seedable generator and never `Math.random` in a composer. mulberry32 is enough:

```ts
function createRng(seed: number) {
  let s = seed | 0
  const float = () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  return { get state() { return s }, float, chance: (p: number) => float() < p, int: (a: number, b: number) => a + Math.floor(float() * (b - a + 1)), pick: <T>(xs: readonly T[]) => xs[Math.floor(float() * xs.length)]! }
}
```

- Salt the seed per track (`seed ^ 0x...`) so two tracks on one seed differ.
- Draw the same number of randoms in a bar whatever the context is. Gate on the context after drawing (`const roll = rng.float(); if (roll < p)`), so a busy and an idle page stay on the same chords and sections.
- Give humanisation and noise their own seeded streams, derived from the bar number, so they never shift the music's stream.
- To start at piece N of a seed, compose pieces 0 to N-1 idle and discard them. That makes `?seed=ABC.3` links work.

## The player

- Schedule ahead with the audio clock, never from timers alone: a timer fires every 50 to 100 ms and schedules every bar that starts inside a lookahead window on `AudioContext.currentTime`. Make the window generous (most of a bar rather than a few hundred milliseconds): a busy page, a scroll, a heavy animation or a throttled background tab delays the timer, and a short window turns every delay into a dropout.
- If a late timer finds the next bar already in the past, move the schedule to just after now instead of scheduling into the past, which plays the notes in a burst.
- Change tempo only at bar starts, and set tempo-dependent nodes (an echo time in steps) at the same moment.
- Create the context on a user gesture. Show a blocked state until then and resume on the first pointer or key event.
- Fade out on stop (0.3 to 0.5 s) and disconnect nodes after the fade; a leaked node per bar becomes thousands in an hour.
- Suspend the context when the page is hidden, and when it is shown again, resume it and run the scheduler at once rather than waiting for the next timer.

## Adapting to the app

Expose one input, such as `setHeadroom(h)` or `setState(context)`, and map it to the composer's context. Switching tracks needs hysteresis (two thresholds) so a value near the line does not flip the music back and forth. Smooth the input as step 5 describes.
