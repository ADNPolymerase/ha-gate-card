# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour portails : état consolidé, couleurs par état, illustration animée et commandes sûres pour portail à impulsion.

Pensée pour le cas où la *commande* et l'*état* sont séparés : le portail est piloté par impulsion (AirSend, RFXCOM, relais Shelly…) exposée en `cover`, et l'état fiable vient d'autres capteurs. La card affiche cet état et envoie les commandes au cover, sans deviner.

> Retours et issues bienvenus. 🇬🇧 [Read in English](README.md)

[![Capture d'écran HA Gate Card](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.fr.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- **Deux entités** : commandes au `cover`, état lu dans n'importe quelle `state_entity` (`input_select`, sensor, template…).
- **États reconnus automatiquement** (13 langues, sans accents) : fermé, ouvert, ouverture, fermeture, mouvement, piéton, déverrouillé, aération, partiel, inconnu. `state_map` pour le reste.
- **Couleurs par état** issues du thème, ou une couleur fixe `gate_color`.
- **Quatre types animés** : coulissant, battant (deux vantaux ou un seul, charnière à gauche ou à droite), portillon (`door`) et garage, avec plusieurs styles de vantail. `compact` remplace le dessin par une icône.
- **Positions intermédiaires** : passage piéton, aération et ouverture partielle du garage, chacune avec son bouton.
- **Spot** : `light_entity` dessine un projecteur allumé ou éteint et ajoute un bouton *Lumière*.
- **Position réelle** : `show_position` affiche le pourcentage, `draw_position` fait suivre le dessin pendant la course et à mi-course.

  [![Position réelle](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/position.fr.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/position.fr.png)
- **Boutons sûrs** : seules les commandes utiles, aucune pendant le mouvement, confirmation par double appui.
- **Serrures connectées** (Nuki…), commandes personnalisées et **éditeur visuel** complet.

## Installation (HACS)

1. Cherchez **HA Gate Card** dans HACS et installez-la.
2. Ajoutez une card `custom:ha-gate-card` (YAML ou éditeur visuel).

## Configuration

| Option | Description |
|---|---|
| `entity` | **Obligatoire.** Le `cover`, ou une `lock` (*Ouvrir* déverrouille, *Fermer* verrouille). |
| `state_entity` | Entité portant l'état fiable (tout domaine). Défaut : `entity`. |
| `contact_entity` | Contact d'ouverture physique. Contact ouvert + pêne verrouillé → inconnu. |
| `battery_entity` | Batterie en %, en haut à droite. Masquée en `compact`. |
| `state_map` | État brut → `closed`\|`open`\|`opening`\|`closing`\|`moving`\|`pedestrian`\|`unlocked`\|`vent`\|`partial`\|`unknown`. |
| `gate_type` | `sliding` (défaut), `swing`, `door` ou `garage`. `door` est en affichage seul sans commande configurée. |
| `gate_style` | Coulissant : `slats` (défaut), `bars`, `semi`, `solid`. Battant : `bell` (défaut), `bars`, `slats`, `semi`, `solid`. |
| `single_leaf` | Battant uniquement : `left` ou `right` pour un seul vantail, charnière de ce côté. Défaut : deux vantaux. |
| `slide_direction` | `left` (défaut) ou `right`. |
| `gate_color` | `state` (défaut), `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown` ou toute couleur CSS. |
| `name` | Titre. Défaut : nom de l'entité d'état. |
| `compact` | Icône colorée à la place de l'illustration. |
| `show_state` | État en toutes lettres sous le nom. Défaut `true`. |
| `single_line` | Nom, état et heure sur une ligne, repliée si la place manque. Défaut `false`. |
| `show_position` | Pourcentage `current_position` à côté de l'état : `false` (défaut), `moving` ou `true`. |
| `draw_position` | Dessin à la position réelle pendant la course et à mi-course (coulissant, battant, garage). Défaut `false`. |
| `confirm` | Confirmation par double appui. Défaut `true`. |
| `show_stop` | Bouton *Stop* pendant le mouvement. Défaut `false`, à éviter sur un portail à impulsion. |
| `card_tap` | Toute la card déclenche la commande quand il n'y en a qu'une. Défaut `false`. |
| `show_tap_button` | Avec `card_tap`, garder le bouton. Défaut `true`. |
| `show_key` / `show_runner` / `show_car` / `show_breeze` / `show_cat` | Pictogrammes clé, piéton, voiture, brise et chat. Défaut `true`. |
| `light_entity` | Lumière ou switch du bouton *Lumière*, dessiné en spot. Sans confirmation, disponible pendant le mouvement. |
| `light_position` | Côté du spot : `right` (défaut) ou `left`. |
| `show_spot` / `show_light_button` | Afficher le spot / le bouton *Lumière*. Défaut `true`. Sans spot, pas de bouton. |
| `open_entity` / `close_entity` / `stop_entity` | Bouton, script, switch ou serrure à la place des services du cover. |
| `pedestrian_entity` / `vent_entity` / `partial_entity` | Commandes piéton (coulissant, battant), aération et ouverture partielle (garage). Chacune ajoute son bouton quand c'est fermé. |

### Exemple

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: input_select.portail_etat
gate_type: swing
name: Portail
```

## Licence

MIT, voir [LICENSE](LICENSE).
