# Replay results

Each behavior case ran twice as a blind headless run of a mid-size model from a neutral directory: once told to use the skill, once told to use no skill (both could search the web). A separate grader saw only the task, the assertions and the two anonymous answers, with the arm labels shuffled, and graded each assertion strictly.

| Case | With the skill | Without |
| --- | --- | --- |
| Learn an unfamiliar style (lounge music) before writing code | 5 / 5 | 1 / 5 |
| A bell-driven ambient track is called high-pitched: what to check and change | 4 / 4 | 1 / 4 |
| A looping, groove-based track for a non-musician | 4 / 5 | 1 / 5 |
| Design an endless calm ambient composer | 3 / 4 | 3 / 4 |
| **Total** | **16 / 18** | **6 / 18** |

What the skill added: multi-angle research with a written style sheet and per-trait source checks (including converting between swing scales); measure-first, one-change-per-round tuning; a locked groove that varies only at phrase ends with a pulse across the loop join; automated tests for the groove and the seam.

Where the skill lost an assertion, and the edit it caused:

- A non-musician's answer used unexplained jargon: a rule to explain musical terms in plain words was added.
- The ambient design case gave values from memory and only planned the research: step 2 now says to do the searching, and to mark every value a placeholder when it is skipped.
- The baseline matched the skill on the ambient design case, where the answer is largely a known engineering shape; the draw-count rule was the only assertion the skill alone met.

Later, four research agents followed the skill's method to write style sheets for four tracks built earlier and listed concrete gaps between each sheet and its implementation; the fixes are in the track docs.
