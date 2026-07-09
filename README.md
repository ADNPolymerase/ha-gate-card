# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Home Assistant Lovelace card for driveway gates and portals — real consolidated state, per-state colors, an animated gate illustration (sliding or swing), and safe contextual commands.

Designed for the common real-world setup where the *command* channel and the *state* channel are different things: the gate is driven by an RF impulse (AirSend, RFXCOM, Shelly relay, dry contact…) exposed as a `cover`, while the **reliable** position comes from separate open/closed sensors consolidated into an `input_select` or template sensor. The card displays the consolidated state and sends commands to the cover — no guessing.

Multilingual UI (English, French, German, Spanish, Italian, Dutch, Portuguese, Swedish, Norwegian, Danish, Polish, Russian — auto-detected from Home Assistant).

> Status: early preview. Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

[![HA Gate Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)

## Features

- **Two-entity design**: commands go to the `cover`, the displayed state comes from any `state_entity` (`input_select`, `sensor`, template…) — or from the cover itself if you don't have separate sensors.
- **State normalization**: maps whatever your state entity reports (`ferme`, `Fermé`, `closed`, `opening`, `ouverture`, …) to a common closed / open / opening / closing / unknown vocabulary, accent-insensitive, with an optional explicit `state_map` override.
- **Per-state colors**: closed = green, open = orange, moving = blue, unknown = red (uses your theme's `--success-color` / `--warning-color` / `--info-color` / `--error-color`). Or pick a fixed classic gate color (`gate_color`) and let only the state text carry the color.
- **Two gate types, two designs each**: `gate_type: sliding` (single leaf on a rail, wheels spinning while moving) or `gate_type: swing` (two leaves pivoting on their hinges), each with a `gate_style`: modern (horizontal aluminium slats / bell-top "chapeau de gendarme") or classic (vertical bars / concave). Sliding gates open to the left or to the right (`slide_direction`). The animated illustration follows the state — closed, open, or gently moving. `compact: true` swaps it for a simple colored icon.
- **Safe contextual buttons**: only the commands that make sense are shown — *Open* when closed, *Close* when open, both when unknown, and **nothing while moving** (on impulse-driven gates an extra impulse stops or reverses the leaf). `show_stop: true` opts into a Stop button while moving for motors with a real stop channel.
- **Built-in confirmation**: tap once → the button asks to confirm, tap again within 4 s → the command fires. Disable with `confirm: false`.
- **Command overrides**: point `open_entity` / `close_entity` / `stop_entity` at buttons, scripts or switches if your gate isn't a `cover` at all.
- **Visual editor** with entity pickers for every field.

## Installation (HACS)

This card is not yet in the default HACS store. Add it as a custom repository:

1. HACS → the "⋮" menu (top right) → **Custom repositories**.
2. Repository: `https://github.com/ADNPolymerase/ha-gate-card`, category: **Dashboard** (Lovelace plugin).
3. Install **HA Gate Card**, then reload/clear cache if the resource doesn't pick up automatically.
4. Add a card of type `custom:ha-gate-card` to a dashboard, either via YAML or the visual editor.

## Configuration

| Option | Description |
|---|---|
| `entity` | **Required.** The `cover` receiving open/close/stop commands. (Optional if you set `open_entity`/`close_entity` instead.) |
| `state_entity` | Entity holding the reliable consolidated state (any domain). Defaults to `entity`. |
| `state_map` | Optional map of raw state string → `closed`\|`open`\|`opening`\|`closing`\|`unknown`, for wordings the auto-detection doesn't catch. |
| `gate_type` | `sliding` (default) or `swing` — picks the illustration. |
| `gate_style` | Design of the leaf. Sliding: `slats` (default), `bars`, `semi`, `solid`. Swing: `bell` (default), `bars`, `slats`, `semi`, `solid`. Real-world designs: horizontal slats, vertical bars / concave, semi-open (solid lower panel), solid with laser-cut pattern, bell-top "chapeau de gendarme". `modern`/`classic` from v0.7 still work as aliases. |
| `slide_direction` | `left` (default) or `right` — which way the sliding gate opens. |
| `gate_color` | `state` (default: the gate follows the state color) or a fixed classic color: `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown` (RAL-inspired), or any raw CSS color. With a fixed color only the state text stays state-colored. |
| `name` | Card title. Defaults to the state entity's friendly name. |
| `compact` | `true` to replace the illustration with a colored round icon. |
| `confirm` | Two-tap confirmation before any command. Default `true`; set `false` to disable. |
| `show_stop` | Show a *Stop* button while the gate is moving. Default `false` — leave it off for impulse-driven (RF) gates. |
| `open_entity` / `close_entity` / `stop_entity` | Optional button/script/switch entities used instead of the cover services. |

### Example

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: input_select.portail_etat
gate_type: swing
name: Portail
```

With an explicit state map:

```yaml
type: custom:ha-gate-card
entity: cover.driveway_gate
state_entity: sensor.gate_status
state_map:
  "Sesame open": open
  "Sesame shut": closed
  "Busy": opening
```

## Roadmap

- `gate_type: door` — a single pedestrian door variant, for wickets and side doors sharing the same command/state pattern.

## License

MIT — see [LICENSE](LICENSE).
