# Robot-WATCHDOG: Failure Detection through Object-Centric Graph Representation

This repository hosts the **project webpage** and supplementary materials for the paper:

**Robot-WATCHDOG: Failure Detection through Object-Centric Graph Representation**
Quentin Rolland, Fabrice Mayran de Chamisso, Jean-Baptiste Mouret
*Conference on Robot Learning (CoRL), 2026*

Link to the site: **https://cea-list.github.io/Robot-WATCHDOG/**

---

## Overview

Reliable real-time failure detection is critical for deploying learned robotic policies in the
real world, but enumerating failures explicitly is intractable in open-world settings. Purely
visual monitors are highly sensitive to benign background variation; kinematic monitors are blind
to the surrounding environment. Both struggle with **relational** errors — grasping the wrong
object, swapping target locations, violating task order.

**Robot-WATCHDOG** is a self-supervised failure detection framework built on an object-centric
representation of dynamic scenes as **spatio-temporal graphs** over tracked labeled objects and
their pairwise interactions. Within that representation it deploys two complementary detectors:

- **GnnT** — a predictive graph transformer (GATv2 + Transformer encoder) for data-rich settings,
  which flags failures as deviations from learned object-centric spatio-temporal dynamics.
- **TPC (Trajectory Projection and Correlation)** — a non-parametric detector for extreme
  few-shot regimes (< 25 episodes), combining time-weighted orthogonal projection distance to
  expert trajectories with a pairwise object-correlation penalty.

Both are calibrated by **conformal prediction**, giving a guaranteed upper bound on the false
positive rate without manual threshold tuning and without ever seeing failure data.

---

## Datasets

We evaluate on two datasets:

- **BotFails** ([project page](https://cea-list.github.io/FIDeL/)) — a public benchmark for
  robotic failure detection. We retain the 4 tasks involving rigid, visually distinguishable
  objects: Table-setting, Dish storing, Vegetable sorting, Groceries sorting.
- **Ours** — a new dataset of two relationally challenging manipulation tasks:

| Task | Split | Robot | # Episodes | # Frames | FPS | Cameras | Action dim |
| --- | --- | --- | ---: | ---: | ---: | --- | ---: |
| Table-setting | Expert | ALOHA | 100 | 67,341 | 15 | 4 views | 9 |
| Table-setting | Test | ALOHA | 21 | 13,471 | 15 | 4 views | 9 |
| Waste sorting | Expert | SO-100 | 100 | 59,562 | 30 | Top view | 6 |
| Waste sorting | Test | SO-100 | 51 | 30,378 | 30 | Top view | 6 |

---

## Results

Across both datasets and all metrics, the object-centric methods outperform prior work:

- **AUPR 0.69–0.78** and **MCC 0.67–0.72**, against 0.47 / 0.40 for the strongest baseline.
- TPC is best on BotFails (0.666 MCC), where data is scarce; GnnT is best on the more dynamic
  Watchdog dataset (0.719 MCC).
- After conformal calibration, end-to-end MCC reaches **0.657** (GnnT, Watchdog) and **0.483**
  (TPC, BotFails), while FIDeL and FAIL-Detect remain below 0.15.

---

## Repository layout

```
index.html            project page
static/css            Bulma + page styles
static/js             Bulma carousel / slider
static/images         figures used by the page
release_videos/       result videos, uploaded as GitHub Release assets (not committed)
```

### Videos

Result videos are **not committed to this repository**. They are attached as assets of the
GitHub release tagged `video`, and the page streams them from there. To (re)publish them:

```bash
gh release create video release_videos/*.mp4 --title "website_videos" --notes "Result videos for the project page"
# or, if the release already exists:
gh release upload video release_videos/*.mp4 --clobber
```

The page references these exact filenames:

```
table_setting_nominal.mp4
table_setting_failure_wrong_side.mp4
table_setting_failure_misplaced.mp4
waste_sorting_nominal.mp4
waste_sorting_failure_wrong_bin.mp4
waste_sorting_failure_unsorted.mp4
```

---

## Acknowledgments

Parts of this project page were adopted from the [Nerfies](https://nerfies.github.io/) page.

## Website License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike 4.0 International License</a>.
