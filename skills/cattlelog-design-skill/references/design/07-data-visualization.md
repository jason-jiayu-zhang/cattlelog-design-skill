## 7. Data Visualization

- **Sequential:** `blue-300` to `blue-500` to `blue-700` to `blue-900`. **Diverging (bad to good):** `red-500` to `black-200` to `green-500`.
- **Categorical (max 5 series), in order:** `accent-1`, `accent-4`, `accent-9`, `accent-5`, `accent-6`. A single-series chart uses `accent-1`. Legend chips use the paired `surface-N` fill with an 8px dot in the series color.
- **Marks:** bars are narrow (about 8px wide) with a `2px` top radius, anchored to the baseline; lines are 2px strokes with small point dots. Gridlines are 0.5px `black-200`; axis labels use Subtext in `black-600`; y-axis ticks at 0/25/50/75/100% for percentage charts.
- **Tooltip:** `black-0` background, `0.5px black-200` border, `8px` radius, `p-3`, `pointer-events: none`, `z-index: 600`; bold title plus rows of dot + series name + value. Tooltips are also reachable by keyboard focus on the mark.
- **Accessibility:** every chart has a text summary or data-table alternative (`aria-label` plus a visually hidden table). Never rely on color alone: series are also distinguished by legend label.
- **Mobile:** keep tick labels legible (thin them out rather than shrinking text); let wide charts scroll horizontally inside their card with a fade affordance.
