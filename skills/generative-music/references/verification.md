# Verification

Test what the code guarantees and measure what the ear will judge. A listener hears levels and spectrum before notes.

## Tests the composer must pass

Write these as plain unit tests that call the composer with no audio.

| Test | Assertion |
| --- | --- |
| Reproducible | the same seed gives deeply equal bars over 80 or more bars; a different seed does not |
| Form | the roles and lengths of one piece match the plan, and the next piece starts after it |
| Registers | every note of every voice, over 100+ bars at full activity, lies inside its declared range and is a finite number |
| Context independence | driven (activity 1) and idle (0) runs have the same chords and sections; only the density differs |
| Density follows state | the driven run has more events than the idle run |
| No silence | no bar is empty in a section that should sound |
| Starting at piece N | composing to the start of piece N then continuing equals a fresh run to the same bar |
| Registry | the built-in ids exist, an unknown id throws a clear error, a registered custom track plays |

A test that fails on an out-of-range note is how a stray octave jump gets caught: a NaN or an undefined from indexing past a short array fails the range check.

## Measuring the output

Measure a real run, not the notes. Two routes:

- **A running page.** Capture the analyser node (patch `AnalyserNode.prototype.getFloatTimeDomainData` once to record `this`), then sample for 10 s per track: RMS from the time-domain data, the peak, and the share of spectral power above 2 kHz from `getFloatFrequencyData` (power is `10 ** (dB / 10)`). Compare tracks in one session so the numbers are comparable.
- **A rendered file.** Render offline (an `OfflineAudioContext` in a browser, or a Node Web Audio implementation), write a WAV, and run `node scripts/analyze-wav.mjs file.wav --profile calm`, or with your own limits. It prints RMS, peak and the band shares and exits 1 when a limit is broken.

Take the targets from the style sheet and pass them to the script: a peak ceiling, the frequency above which a share of energy must stay small, and that share (`--max-peak`, `--split`, `--max-above`). Two presets exist for convenience, `calm` and `lively`; neither is a standard. Keep RMS within a few decibels of the product's other tracks, which the script prints and you compare.

Run `node scripts/analyze-wav.mjs --selftest` once after copying the script: it generates a quiet low tone and a loud bright one and checks that the profile separates them.

## Listening review

Ask for ten minutes of listening, ideally in the place the music will play, and for the first moment something bothers. Then map the complaint:

| Complaint | Likely cause | First fix |
| --- | --- | --- |
| high-pitched, piercing, shrill | a sustained voice too high, or a bright partial | lower the register, drop the partial, measure above 2 kHz |
| muddy, boomy | voices in the low-mid, reverb with bass | thin the voicing, high-pass the reverb return |
| repetitive, loopy | one clock, one pool, constant density | add an independent layer, rests, a rare event |
| mechanical, stiff | a perfect grid and equal velocities | seeded jitter, velocity range, swing |
| too loud, too quiet | levels not matched | measure RMS against the other tracks |
| boring, flat | no form, no register movement | add a break; move the tonic between pieces |
| harsh hats or clicks | bright noise unfiltered | band-pass lower, shorten, reduce velocity |
| pumping, a "whmm" or pulse in the background, odd breathing | a swell or duck that repeats every bar or beat (a pad that re-attacks with each chord, a kick-driven duck on the beds), or modulation too fast or deep | hold the bed across chord changes, drop the swell or the duck, or slow and shrink the modulation |
| restarts jarringly | cut at a seam | fade out, hold a chord |

Change one thing per round and measure again before asking again.
