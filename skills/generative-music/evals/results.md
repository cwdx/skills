# Replay results

One behavior case, run in two fresh agents (a mid-size model): one reading the skill, one with no skill. Graded against the seven assertions in `cases.json`.

| Assertion | With the skill | Baseline |
| --- | --- | --- |
| Seeded generator, composer never uses Math.random | pass | partial (seeded, never stated) |
| Same random draws whatever the state | pass | pass (a different mechanism: a sub-seed per bar) |
| Chords of four or more bars, no functional cadence | pass | pass |
| A layer whose length does not divide the bar | pass | fail |
| Low register ceiling or a measured share above 2 kHz | pass | pass |
| Long dark reverb with a high-passed return | pass | pass |
| Tests and a measurement, not only listening | pass | pass |

The baseline already designs well; the skill adds the independent-clock layer, the measured-spectrum habit with a script that can fail, and concrete recipes. Its unclear points became edits: the direction of "busy", reverb-darkening numbers, relative levels, the script's thresholds, an ambient form, rare-event probabilities, a Lydian V, and declared exceptions to the note pool. Two more behavior cases are written and not yet replayed: a tuning task ("this is shrill, fix it"), where the harshness checklist should matter most, and a looping task for a non-musician (a locked groove that closes at the join).
