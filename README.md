# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for gates: consolidated state, per-state colors, animated illustration and impulse-safe commands.

Built for setups where *command* and *state* are separate: the gate is driven by an impulse (AirSend, RFXCOM, Shelly relay…) exposed as a `cover`, and the reliable state comes from other sensors. The card shows that state and sends commands to the cover, without guessing.

> Feedback and issues welcome. 🇫🇷 [Lire en français](README.fr.md)

[![HA Gate Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)

## Features

- **Two entities**: commands go to the `cover`, the state is read from any `state_entity` (`input_select`, sensor, template…).
- **States detected automatically** (13 languages, accent-insensitive): closed, open, opening, closing, moving, pedestrian, unlocked, venting, part-open, unknown. `state_map` for the rest.
- **Per-state colors** from your theme, or a fixed `gate_color`.
- **Four animated types**: sliding, swing (two leaves or one, hinged left or right), wicket (`door`) and garage, with several leaf designs. `compact` swaps the drawing for an icon.
- **Intermediate positions**: pedestrian pass, garage venting and part-open, each with its own button.
- **Locks**: *Open* either unlocks or releases the latch and opens the door, and every command is withdrawn while the door stands open.
- **Spotlight**: `light_entity` draws a lamp that is on or off and adds a *Light* button.
- **Real position**: `show_position` shows the percentage, `draw_position` moves the drawing while travelling and when stopped part-way.

  [![Real position](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/position.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/position.png)
- **Safe buttons**: only useful commands, none while moving, two-tap confirmation.
- **Smart locks** (Nuki…), command overrides and a complete **visual editor**.

## Installation (HACS)

1. Search for **HA Gate Card** in HACS and install it.
2. Add a `custom:ha-gate-card` card (YAML or visual editor).

## Configuration

| Option | Description |
|---|---|
| `entity` | **Required.** The `cover`, or a `lock` (*Close* locks, *Open* follows `lock_open_action`). |
| `state_entity` | Entity holding the reliable state (any domain). Defaults to `entity`. |
| `contact_entity` | Physical door contact. Open contact + locked bolt → unknown. On a lock, an open door withdraws every command. |
| `battery_entity` | Battery %, top right. Hidden in `compact`. |
| `state_map` | Raw state → `closed`\|`open`\|`opening`\|`closing`\|`moving`\|`pedestrian`\|`unlocked`\|`vent`\|`partial`\|`unknown`. |
| `gate_type` | `sliding` (default), `swing`, `door` or `garage`. `door` is display-only without command entities. |
| `gate_style` | Sliding: `slats` (default), `bars`, `semi`, `solid`. Swing: `bell` (default), `bars`, `slats`, `semi`, `solid`. |
| `single_leaf` | Swing only: `left` or `right` for a single leaf hinged on that side. Default: two leaves. |
| `slide_direction` | `left` (default) or `right`. |
| `gate_color` | `state` (default), `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown` or any CSS color. |
| `name` | Title. Defaults to the state entity's name. |
| `language` | Show the card in another language than Home Assistant: `en`, `fr`, `de`, `es`, `it`, `nl`, `pt`, `sv`, `no`, `da`, `pl`, `hu` or `ru`. The editor keeps your own language. |
| `compact` | Colored icon instead of the illustration. |
| `show_state` | State in words under the name. Default `true`. |
| `single_line` | Name, state and time on one row, wrapping when space runs out. Default `false`. |
| `show_position` | `current_position` percentage next to the state: `false` (default), `moving` or `true`. |
| `draw_position` | Drawing at the real position while travelling and when stopped part-way (sliding, swing, garage). Default `false`. |
| `confirm` | Two-tap confirmation: `true` (default), `open` for the opening commands only, or `false`. |
| `show_stop` | *Stop* button while moving. Default `false`, avoid on impulse gates. |
| `card_tap` | Command carried by a tap anywhere on the card: `false` (default), `true` for the single available one, or `close` / `open` to name it. The card stays inert where that command is not offered. |
| `show_tap_button` | With `card_tap: true`, keep the button. Default `true`. A named command always keeps its buttons. |
| `show_key` / `show_runner` / `show_car` / `show_breeze` / `show_cat` | Key, pedestrian, car, breeze and cat pictograms. Default `true`. |
| `light_entity` | Light or switch behind the *Light* button, drawn as a spotlight. No confirmation, available while moving. |
| `light_position` | Spotlight side: `right` (default) or `left`. |
| `show_spot` / `show_light_button` | Show the spotlight / the *Light* button. Default `true`. No spot, no button. |
| `open_entity` / `close_entity` / `stop_entity` | Button, script, switch or lock used instead of the cover services. |
| `lock_open_action` | Lock only: what *Open* does, `unlock` (default) or `open` to release the latch and open the door itself. |
| `show_unlock_button` | Lock set to `open`: separate *Unlock* button. Default `false`. |
| `pedestrian_entity` / `vent_entity` / `partial_entity` | Pedestrian (sliding, swing), venting and part-open (garage) commands. Each adds its button while closed. |

### Example

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: input_select.portail_etat
gate_type: swing
name: Portail
```

## License

MIT, see [LICENSE](LICENSE).
