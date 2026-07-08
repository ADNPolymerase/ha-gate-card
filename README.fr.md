# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

[![Buy Me A Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-orange.png)](https://buymeacoffee.com/adnpolymerase)
[![Lien vers mon github.io pour mes autres projets](https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg)](https://adnpolymerase.github.io/HA/)

Une card Lovelace Home Assistant pour portails — état réel consolidé, couleurs par état, illustration animée (coulissant ou battants), et commandes contextuelles sécurisées.

Conçue pour le cas réel très courant où le canal de *commande* et le canal d'*état* sont deux choses différentes : le portail est piloté par impulsion RF (AirSend, RFXCOM, relais Shelly, contact sec…) exposée en `cover`, tandis que la position **fiable** vient de capteurs ouvert/fermé séparés, consolidés dans un `input_select` ou un template sensor. La card affiche l'état consolidé et envoie les commandes au cover — sans deviner.

Interface multilingue (anglais, français, allemand, espagnol, italien, néerlandais — détectée automatiquement depuis Home Assistant).

> Statut : préversion. Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

[![Capture d'écran HA Gate Card](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.png)

## Fonctionnalités

- **Deux entités** : les commandes vont au `cover`, l'état affiché vient de n'importe quelle `state_entity` (`input_select`, `sensor`, template…) — ou du cover lui-même si vous n'avez pas de capteurs séparés.
- **Normalisation d'état** : convertit ce que rapporte votre entité (`ferme`, `Fermé`, `closed`, `opening`, `ouverture`, …) vers un vocabulaire commun fermé / ouvert / ouverture / fermeture / inconnu, insensible aux accents, avec un `state_map` explicite en option.
- **Couleurs par état** : fermé = vert, ouvert = orange, mouvement = bleu, inconnu = rouge (via `--success-color` / `--warning-color` / `--info-color` / `--error-color` de votre thème). Ou choisissez une couleur fixe classique (`gate_color`) et seul le texte d'état portera la couleur.
- **Deux types de portail** : `gate_type: sliding` (un vantail coulissant sur rail, roulettes qui tournent pendant le mouvement) ou `gate_type: swing` (deux vantaux pivotant sur leurs gonds). L'illustration animée suit l'état — fermé, ouvert, ou en mouvement. `compact: true` la remplace par une simple icône colorée.
- **Boutons contextuels sécurisés** : seules les commandes pertinentes sont affichées — *Ouvrir* si fermé, *Fermer* si ouvert, les deux si inconnu, et **rien pendant le mouvement** (sur un portail à impulsion, une impulsion supplémentaire stoppe ou inverse le vantail). `show_stop: true` active un bouton Stop pendant le mouvement pour les moteurs disposant d'un vrai canal stop.
- **Confirmation intégrée** : un appui → le bouton demande confirmation, un second appui sous 4 s → la commande part. Désactivable avec `confirm: false`.
- **Commandes personnalisées** : pointez `open_entity` / `close_entity` / `stop_entity` vers des boutons, scripts ou switchs si votre portail n'est pas un `cover`.
- **Éditeur visuel** avec sélecteurs d'entités pour chaque champ.

## Installation (HACS)

Cette card n'est pas encore dans le store HACS par défaut. Ajoutez-la comme dépôt personnalisé :

1. HACS → menu « ⋮ » (en haut à droite) → **Dépôts personnalisés**.
2. Dépôt : `https://github.com/ADNPolymerase/ha-gate-card`, catégorie : **Dashboard** (plugin Lovelace).
3. Installez **HA Gate Card**, puis rechargez/videz le cache si la ressource n'est pas prise en compte automatiquement.
4. Ajoutez une card de type `custom:ha-gate-card`, en YAML ou via l'éditeur visuel.

## Configuration

| Option | Description |
|---|---|
| `entity` | **Obligatoire.** Le `cover` qui reçoit les commandes ouvrir/fermer/stop. (Optionnel si vous définissez `open_entity`/`close_entity`.) |
| `state_entity` | Entité portant l'état consolidé fiable (tout domaine). Par défaut : `entity`. |
| `state_map` | Map optionnelle chaîne d'état brute → `closed`\|`open`\|`opening`\|`closing`\|`unknown`, pour les formulations non détectées automatiquement. |
| `gate_type` | `sliding` (défaut) ou `swing` — choisit l'illustration. |
| `gate_color` | `state` (défaut : le portail suit la couleur de l'état) ou une couleur fixe classique : `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown` (inspirées RAL), ou toute couleur CSS. En couleur fixe, seul le texte d'état reste coloré. |
| `name` | Titre de la card. Par défaut : le nom convivial de l'entité d'état. |
| `compact` | `true` pour remplacer l'illustration par une icône ronde colorée. |
| `confirm` | Confirmation par double appui avant toute commande. `true` par défaut ; `false` pour désactiver. |
| `show_stop` | Affiche un bouton *Stop* pendant le mouvement. `false` par défaut — à laisser désactivé pour les portails à impulsion (RF). |
| `open_entity` / `close_entity` / `stop_entity` | Entités bouton/script/switch optionnelles utilisées à la place des services du cover. |

### Exemple

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: input_select.portail_etat
gate_type: swing
name: Portail
```

Avec un state map explicite :

```yaml
type: custom:ha-gate-card
entity: cover.portail
state_entity: sensor.etat_portail
state_map:
  "Grand ouvert": open
  "Verrouillé": closed
  "Manoeuvre": opening
```

## Feuille de route

- `gate_type: door` — une variante porte simple (portillon, porte de service) partageant la même logique commande/état.

## Licence

MIT — voir [LICENSE](LICENSE).
