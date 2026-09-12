# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Link to my github.io for my other projects" height="60"></a>

A Lovelace card for gates: real consolidated state, per-state colors, animated illustration, pedestrian pass mode and impulse-safe commands.

Built for the common setup where *command* and *state* are two different channels: the gate is driven by an RF impulse (AirSend, RFXCOM, Shelly relay, dry contact…) exposed as a `cover`, while the **reliable** position comes from separate open/closed sensors. The card shows the consolidated state and sends commands to the cover, without guessing.

> Feedback and issues welcome.
> 🇫🇷 [Lire en français](README.fr.md)

[![HA Gate Card screenshot](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)

## Features

- **Two entities**: commands go to the `cover`, the displayed state comes from any `state_entity` (`input_select`, sensor, template…).
- **State normalization**: `Fermé`, `closed`, `ouverture`, `En mouvement`… are auto-detected (accent-insensitive, 12 languages) and mapped to closed / open / opening / closing / moving / pedestrian / unlocked / venting / part-open / unknown. `state_map` covers anything else.
- **Per-state colors** from your theme (closed = green, open & unlocked = orange, moving = blue, unknown = red), or a fixed `gate_color`.
- **Four animated types**: `sliding`, `swing`, `door` (wicket / entrance door, display-only unless you configure command entities, handy for smart locks) and `garage` (roller door), with five `gate_style` designs each for sliding/swing, type-matched icons in compact mode and on the buttons. `compact: true` swaps the illustration for an icon.
- **Pedestrian pass** (sliding/swing): set `pedestrian_entity` → a *Pedestrian* button while closed, one leaf opens with a pictogram, only *Close* is offered.
- **Part-open garage doors**: `vent_entity` opens a slot at the top (a breeze blows through it), `partial_entity` lifts the curtain off the floor (a cat walks through). Each adds its own button while closed; in either position only *Close* is offered.
- **Gate spotlight**: `light_entity` bolts a bracket spot to the post (recessed in the lintel for `door`), throws a beam onto the leaf when it is on, and adds a *Light* button that stays available even while the gate moves. Drawing and button are separable: `show_light_button: false` shows the state without offering the control. In `compact` mode the spot shrinks to a pip on the state circle, drawn only while the light is on.
- **Impulse-safe buttons**: only relevant commands are shown, **none while moving** (an extra impulse stops or reverses the leaf), optional two-tap confirmation and `show_stop`.
- **Command overrides** (`open_entity` / `close_entity` / `stop_entity`) for gates that aren't covers, and a **visual editor** for every field.
- **Smart locks** (Nuki…): a `lock` as `entity`, an *Unlocked* state drawn closed in orange, an optional *Unlock* button next to the unlatch, `contact_entity` for the real open/closed state and a `battery_entity` corner indicator.

## Installation (HACS)

1. Search for **HA Gate Card** in HACS and install it.
2. Add a `custom:ha-gate-card` card (YAML or visual editor).

## Configuration

| Option | Description |
|---|---|
| `entity` | **Required.** The `cover`, or a `lock` (Nuki…) where *Open* unlocks and *Close* locks, receiving commands. (Optional if you use overrides or `state_entity` only.) |
| `state_entity` | Entity holding the reliable consolidated state (any domain). Defaults to `entity`. |
| `contact_entity` | Physical open/closed sensor (door contact). Open contact + locked bolt → unknown. |
| `battery_entity` | Battery percentage sensor, shown top-right (green/orange/red), on a line of its own on a narrow card. Hidden in `compact` mode. |
| `state_map` | Optional map: raw state → `closed`\|`open`\|`opening`\|`closing`\|`moving`\|`pedestrian`\|`unlocked`\|`vent`\|`partial`\|`unknown`. |
| `gate_type` | `sliding` (default), `swing`, `door` or `garage`. `door` is display-only unless command entities are set. |
| `gate_style` | Leaf design (sliding/swing). Sliding: `slats` (default), `bars`, `semi`, `solid`. Swing: `bell` (default), `bars`, `slats`, `semi`, `solid`. |
| `slide_direction` | `left` (default) or `right`. |
| `gate_color` | `state` (default) or a fixed color: `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown`, or any CSS color. |
| `name` | Card title. Defaults to the state entity's friendly name. |
| `compact` | `true` for a colored icon instead of the illustration. |
| `show_state` | Show the state in words under the name. Default `true`; `false` keeps only the name and the elapsed time, since the colour and the icon already carry the state. |
| `confirm` | Two-tap confirmation. Default `true`. |
| `show_stop` | *Stop* button while moving. Default `false`, to be left off for impulse (RF) gates. |
| `card_tap` | `true` makes the whole card tappable when a single command is available (big touch target for car dashboards). Same two-tap confirmation. Default `false`. |
| `show_key` | Key symbol on the closed gate. Default `true`. |
| `show_runner` | Pedestrian pictogram in pedestrian mode. Default `true`. |
| `show_car` | Car pictogram in the opening when fully open (sliding/swing/garage). Default `true`. |
| `show_breeze` | Breeze pictogram in the venting slot (garage). Default `true`. |
| `show_cat` | Cat pictogram in the part-open gap (garage). Default `true`. |
| `light_entity` | Light (or switch) toggled by a *Light* button, drawn as a spotlight aimed at the gate. No confirmation, and the button stays while moving. |
| `light_position` | Spotlight side: `right` (default) or `left`. Ignored for `door`, where the luminaire sits in the middle of the lintel. |
| `show_spot` | Draw the spotlight, or its pip on the state circle in `compact` mode. Default `true`; `false` hides the drawing and the button together. |
| `show_light_button` | Offer the *Light* button. Default `true`; `false` keeps the spot on the illustration but leaves the light out of your reach, for a light you only want to watch. |
| `open_entity` / `close_entity` / `stop_entity` | Button/script/switch/lock used instead of the cover services. A `lock` as `open_entity` maps *Open* to `lock.open` (unlatch) and adds a separate *Unlock* button while locked. |
| `pedestrian_entity` | Button/script/switch for the partial pedestrian opening (sliding/swing). Enables the *Pedestrian* button while closed. |
| `vent_entity` | Button/script/switch for the venting position (garage). Slot at the top, *Vent* button while closed. |
| `partial_entity` | Button/script/switch for the part-open position (garage). Gap at the floor, *Part-open* button while closed. |

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
