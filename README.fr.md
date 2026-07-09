# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour portails — état réel consolidé, couleurs par état, illustration animée, mode passage piéton et commandes sécurisées pour portail à impulsion.

Conçue pour le cas très courant où la *commande* et l'*état* sont deux canaux différents : le portail est piloté par impulsion RF (AirSend, RFXCOM, relais Shelly, contact sec…) exposée en `cover`, tandis que la position **fiable** vient de capteurs ouvert/fermé séparés. La card affiche l'état consolidé et envoie les commandes au cover — sans deviner.

> Statut : préversion. Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

[![Capture d'écran HA Gate Card](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.fr.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- **Deux entités** : les commandes vont au `cover`, l'état affiché vient de n'importe quelle `state_entity` (`input_select`, sensor, template…).
- **Normalisation d'état** : `Fermé`, `closed`, `ouverture`, `En mouvement`… sont détectés automatiquement (insensible aux accents, 12 langues) et convertis en fermé / ouvert / ouverture / fermeture / en mouvement / piéton / inconnu. `state_map` couvre le reste.
- **Couleurs par état** via votre thème (fermé = vert, ouvert = orange, mouvement = bleu, inconnu = rouge), ou une couleur fixe `gate_color`.
- **Quatre types animés** : `sliding`, `swing`, `door` (portillon, affichage seul) et `garage` (porte roulante) — cinq `gate_style` chacun pour coulissant/battants. `compact: true` remplace l'illustration par une icône.
- **Passage piéton** (coulissant/battants) : définissez `pedestrian_entity` → un bouton *Piéton* quand c'est fermé, un vantail s'ouvre avec un pictogramme, seul *Fermer* est proposé.
- **Boutons sécurisés impulsion** : seules les commandes pertinentes s'affichent, **aucune pendant le mouvement** (une impulsion de plus stoppe ou inverse le vantail), confirmation double appui et `show_stop` en option.
- **Commandes personnalisées** (`open_entity` / `close_entity` / `stop_entity`) pour les portails qui ne sont pas des covers, et **éditeur visuel** pour chaque champ.

## Installation (HACS)

Pas encore dans le store HACS par défaut — ajoutez un dépôt personnalisé :

1. HACS → menu « ⋮ » → **Dépôts personnalisés**.
2. Dépôt : `https://github.com/ADNPolymerase/ha-gate-card`, catégorie : **Dashboard**.
3. Installez **HA Gate Card**, puis ajoutez une card `custom:ha-gate-card` (YAML ou éditeur visuel).

## Configuration

| Option | Description |
|---|---|
| `entity` | **Obligatoire.** Le `cover` qui reçoit les commandes. (Optionnel avec des overrides ou une `state_entity` seule.) |
| `state_entity` | Entité portant l'état consolidé fiable (tout domaine). Défaut : `entity`. |
| `state_map` | Map optionnelle : état brut → `closed`\|`open`\|`opening`\|`closing`\|`moving`\|`pedestrian`\|`unknown`. |
| `gate_type` | `sliding` (défaut), `swing`, `door` (affichage seul) ou `garage`. |
| `gate_style` | Style du vantail (coulissant/battants). Coulissant : `slats` (défaut), `bars`, `semi`, `solid`. Battants : `bell` (défaut), `bars`, `slats`, `semi`, `solid`. |
| `slide_direction` | `left` (défaut) ou `right`. |
| `gate_color` | `state` (défaut) ou une couleur fixe : `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown`, ou toute couleur CSS. |
| `name` | Titre de la card. Défaut : nom convivial de l'entité d'état. |
| `compact` | `true` pour une icône colorée à la place de l'illustration. |
| `confirm` | Confirmation par double appui. Défaut `true`. |
| `show_stop` | Bouton *Stop* pendant le mouvement. Défaut `false` — à laisser désactivé pour les portails à impulsion (RF). |
| `show_key` | Clé sur le portail fermé. Défaut `true`. |
| `show_runner` | Pictogramme piéton en mode piéton. Défaut `true`. |
| `open_entity` / `close_entity` / `stop_entity` | Bouton/script/switch utilisés à la place des services du cover. |
| `pedestrian_entity` | Bouton/script/switch de l'ouverture partielle piéton (coulissant/battants). Active le bouton *Piéton* quand c'est fermé. |

### Exemple

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: input_select.portail_etat
gate_type: swing
name: Portail
```

## Licence

MIT — voir [LICENSE](LICENSE).
