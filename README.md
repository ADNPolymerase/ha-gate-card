# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for gates — real consolidated state, per-state colors, animated illustration, pedestrian pass mode and impulse-safe commands.

Built for the common setup where *command* and *state* are two different channels: the gate is driven by an RF impulse (AirSend, RFXCOM, Shelly relay, dry contact…) exposed as a `cover`, while the **reliable** position comes from separate open/closed sensors. The card shows the consolidated state and sends commands to the cover — no guessing.

> Status: early preview. Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

[![HA Gate Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)

## Features

- **Two entities**: commands go to the `cover`, the displayed state comes from any `state_entity` (`input_select`, sensor, template…).
- **State normalization**: `Fermé`, `closed`, `ouverture`, `En mouvement`… are auto-detected (accent-insensitive, 12 languages) and mapped to closed / open / opening / closing / moving / pedestrian / unknown. `state_map` covers anything else.
- **Per-state colors** from your theme (closed = green, open = orange, moving = blue, unknown = red), or a fixed `gate_color`.
- **Four animated types**: `sliding`, `swing`, `door` (wicket, display-only) and `garage` (roller door) — five `gate_style` designs each for sliding/swing. `compact: true` swaps the illustration for an icon.
- **Pedestrian pass** (sliding/swing): set `pedestrian_entity` → a *Pedestrian* button while closed, one leaf opens with a pictogram, only *Close* is offered.
- **Impulse-safe buttons**: only relevant commands are shown, **none while moving** (an extra impulse stops or reverses the leaf), optional two-tap confirmation and `show_stop`.
- **Command overrides** (`open_entity` / `close_entity` / `stop_entity`) for gates that aren't covers, and a **visual editor** for every field.

## Installation (HACS)

Not yet in the default HACS store — add it as a custom repository:

1. HACS → "⋮" menu → **Custom repositories**.
2. Repository: `https://github.com/ADNPolymerase/ha-gate-card`, category: **Dashboard**.
3. Install **HA Gate Card**, then add a `custom:ha-gate-card` card (YAML or visual editor).

## Configuration

| Option | Description |
|---|---|
| `entity` | **Required.** The `cover` receiving commands. (Optional if you use overrides or `state_entity` only.) |
| `state_entity` | Entity holding the reliable consolidated state (any domain). Defaults to `entity`. |
| `state_map` | Optional map: raw state → `closed`\|`open`\|`opening`\|`closing`\|`moving`\|`pedestrian`\|`unknown`. |
| `gate_type` | `sliding` (default), `swing`, `door` (display-only) or `garage`. |
| `gate_style` | Leaf design (sliding/swing). Sliding: `slats` (default), `bars`, `semi`, `solid`. Swing: `bell` (default), `bars`, `slats`, `semi`, `solid`. |
| `slide_direction` | `left` (default) or `right`. |
| `gate_color` | `state` (default) or a fixed color: `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown`, or any CSS color. |
| `name` | Card title. Defaults to the state entity's friendly name. |
| `compact` | `true` for a colored icon instead of the illustration. |
| `confirm` | Two-tap confirmation. Default `true`. |
| `show_stop` | *Stop* button while moving. Default `false` — leave off for impulse (RF) gates. |
| `open_entity` / `close_entity` / `stop_entity` | Button/script/switch used instead of the cover services. |
| `pedestrian_entity` | Button/script/switch for the partial pedestrian opening (sliding/swing). Enables the *Pedestrian* button while closed. |

### Example

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: input_select.portail_etat
gate_type: swing
name: Portail
```

## License

MIT — see [LICENSE](LICENSE).
