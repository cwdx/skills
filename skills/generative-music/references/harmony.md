# Harmony and pitch

Choose the pitch world first. Randomness that can only pick consonant notes cannot sound wrong.

## Modes and what they do

| Mode | Characteristic note | Character | Use for |
| --- | --- | --- | --- |
| Lydian | raised 4th | floating, open, unresolved | space, wonder, dreamy ambient |
| Dorian | natural 6th in a minor mode | warm, cool, jazzy | lo-fi, focus, night |
| Mixolydian | flat 7th | relaxed, no leading tone | focus pulse, folk, easy driving |
| Aeolian (natural minor) | flat 6th and 7th | reflective | lo-fi, melancholy |
| Phrygian | flat 2nd | dark, tense | action, menace |

A mode survives only if its characteristic note is heard on a strong place or in the bass or a long note. Without it the ear files the music under plain major or minor.

## Chords for stillness

- Stack open voicings: root, fifth, seventh, ninth, and for Lydian a raised eleventh. Leave the third out of some chords; a chord without a third is ambiguous and calm.
- Spread the stack: put the root in the bass voice, and lift the other tones by at least a fourth or fifth between neighbours. A cluster (two notes a semitone or whole tone apart in the low-middle register) sounds muddy even when quiet.
- Move chords by common tones or by step. Parallel major sevenths a step apart are the signature sound of calm space music.
- In ambient, avoid functional dominant-to-tonic cadences. They end things, and an endless track should never end. A major V in a Lydian progression is colour, not a dominant: let it move to I, II or vi, and never add the seventh that pulls it home.
- Lo-fi takes sevenths, ninths and the occasional eleventh on a close-voiced electric piano: minor 9, major 9, dominant 9. Strum the voices by a few milliseconds.

## Progression patterns

Write progressions as scale degrees and keep a handful per track, so a piece picks one and the next piece picks another.

- Lydian: I – II – I – V, I – vi – II – V, vi – I – II – I.
- Dorian: i – IV – i – VII, i – ii – IV – i.
- Natural minor lo-fi: i – VI – III – VII, i – iv – VII – III, iv – V – i – i.
- Move the tonic between pieces by a fourth, a fifth or a second, within a fixed range, so a long session wanders and returns.

## Note pools that never clash

- For bells and sparse lines over a Lydian bed, take the major pentatonic plus the major seventh (degrees 1 2 3 5 6 7). Add the raised fourth rarely and quietly: one note that bends the pool is a colour, many of them is a clash.
- For a layer that moves independently of the chord, draw its pitch from the tones of the chord sounding now, mapped into the layer's register. It stays consonant through every chord change.
- A walk through the pool (step ±1 or ±2 from the previous note) sounds like a melody; a uniform random pick sounds like noise.

## Registers

Write a register as two MIDI numbers per voice and keep them in the track, not scattered in the code.

| Voice | A calm track's range | Why |
| --- | --- | --- |
| Sub or bass | MIDI 28–45 | below the chord, single note |
| Pad body | MIDI 48–80 | where chords live; the voicing spreads across it |
| Bells, stars, plucks | MIDI 55–85 | soft sines stay gentle here; keep the ceiling low |
| Anything exposed above | avoid | sustained notes above about C6 get shrill fast |

When a listener says a sound is "high pitched" or "piercing", lower the voice an octave and cut its upper partials before changing the notes.
