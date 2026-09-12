# HA Gate Card

[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/hacs/default)
[![GitHub Release](https://img.shields.io/github/v/release/ADNPolymerase/ha-gate-card?sort=semver)](https://github.com/ADNPolymerase/ha-gate-card/releases)
[![HACS Action](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/ADNPolymerase/ha-gate-card/actions/workflows/hacs.yml)
[![HA Version](https://img.shields.io/badge/Home%20Assistant-2024.1%2B-blue.svg)](https://www.home-assistant.io)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/adnpolymerase)

<a href="https://buymeacoffee.com/adnpolymerase" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-orange.png" alt="Buy Me A Coffee" height="60"></a>
<a href="https://adnpolymerase.github.io/HA/" target="_blank"><img src="https://raw.githubusercontent.com/ADNPolymerase/HA/main/assets/site-button.svg" alt="Lien vers mon github.io pour mes autres projets" height="60"></a>

Une card Lovelace pour portails : état réel consolidé, couleurs par état, illustration animée, mode passage piéton et commandes sécurisées pour portail à impulsion.

Conçue pour le cas très courant où la *commande* et l'*état* sont deux canaux différents : le portail est piloté par impulsion RF (AirSend, RFXCOM, relais Shelly, contact sec…) exposée en `cover`, tandis que la position **fiable** vient de capteurs ouvert/fermé séparés. La card affiche l'état consolidé et envoie les commandes au cover, sans deviner.

> Retours et issues bienvenus.
> 🇬🇧 [Read in English](README.md)

[![Capture d'écran HA Gate Card](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.fr.png)](https://raw.githubusercontent.com/ADNPolymerase/ha-gate-card/main/docs/screenshot.fr.png)

## Fonctionnalités

- **Deux entités** : les commandes vont au `cover`, l'état affiché vient de n'importe quelle `state_entity` (`input_select`, sensor, template…).
- **Normalisation d'état** : `Fermé`, `closed`, `ouverture`, `En mouvement`… sont détectés automatiquement (insensible aux accents, 12 langues) et convertis en fermé / ouvert / ouverture / fermeture / en mouvement / piéton / déverrouillé / aération / ouverture partielle / inconnu. `state_map` couvre le reste.
- **Couleurs par état** via votre thème (fermé = vert, ouvert & déverrouillé = orange, mouvement = bleu, inconnu = rouge), ou une couleur fixe `gate_color`.
- **Quatre types animés** : `sliding`, `swing`, `door` (portillon / porte d'entrée, affichage seul sauf si des commandes sont configurées, pratique pour les serrures connectées) et `garage` (porte roulante), avec cinq `gate_style` chacun pour coulissant/battants, icônes assorties au type en mode compact et sur les boutons. `compact: true` remplace l'illustration par une icône.
- **Ouvertures partielles du garage** : `vent_entity` entrouvre une fente en haut (une brise la traverse), `partial_entity` décolle le tablier du sol (un chat s'y faufile). Chacune ajoute son bouton quand c'est fermé ; dans l'une ou l'autre position, seul *Fermer* est proposé.
- **Passage piéton** (coulissant/battants) : définissez `pedestrian_entity` → un bouton *Piéton* quand c'est fermé, un vantail s'ouvre avec un pictogramme, seul *Fermer* est proposé.
- **Spot sur le portail** : `light_entity` fixe un projecteur sur potence au montant (encastré dans le linteau pour `door`), envoie un faisceau sur le vantail quand il est allumé, et ajoute un bouton *Lumière* qui reste disponible même pendant le mouvement. Le dessin et le bouton sont dissociables : `show_light_button: false` montre l'état sans proposer la commande. En mode `compact`, le spot se réduit à une pastille sur la pastille d'état, dessinée seulement quand la lumière est allumée.
- **Boutons sécurisés impulsion** : seules les commandes pertinentes s'affichent, **aucune pendant le mouvement** (une impulsion de plus stoppe ou inverse le vantail), confirmation double appui et `show_stop` en option.
- **Commandes personnalisées** (`open_entity` / `close_entity` / `stop_entity`) pour les portails qui ne sont pas des covers, et **éditeur visuel** pour chaque champ.
- **Serrures connectées** (Nuki…) : une `lock` comme `entity`, un état *Déverrouillé* dessiné porte fermée en orange, un bouton *Déverrouiller* optionnel à côté du bec de cane, `contact_entity` pour l'état d'ouverture physique réel et un indicateur `battery_entity` en coin.

## Installation (HACS)

1. Cherchez **HA Gate Card** dans HACS et installez-la.
2. Ajoutez une card `custom:ha-gate-card` (YAML ou éditeur visuel).

## Configuration

| Option | Description |
|---|---|
| `entity` | **Obligatoire.** Le `cover`, ou la serrure `lock` (Nuki…) où *Ouvrir* déverrouille et *Fermer* verrouille, qui reçoit les commandes. (Optionnel avec des overrides ou une `state_entity` seule.) |
| `state_entity` | Entité portant l'état consolidé fiable (tout domaine). Défaut : `entity`. |
| `contact_entity` | Capteur d'ouverture physique (contact de porte). Contact ouvert + pêne verrouillé → inconnu. |
| `battery_entity` | Capteur de batterie en %, affiché en haut à droite (vert/orange/rouge), sur sa propre ligne quand la carte est étroite. Masqué en mode `compact`. |
| `state_map` | Map optionnelle : état brut → `closed`\|`open`\|`opening`\|`closing`\|`moving`\|`pedestrian`\|`unlocked`\|`vent`\|`partial`\|`unknown`. |
| `gate_type` | `sliding` (défaut), `swing`, `door` ou `garage`. `door` est en affichage seul sauf si des commandes sont configurées. |
| `gate_style` | Style du vantail (coulissant/battants). Coulissant : `slats` (défaut), `bars`, `semi`, `solid`. Battants : `bell` (défaut), `bars`, `slats`, `semi`, `solid`. |
| `slide_direction` | `left` (défaut) ou `right`. |
| `gate_color` | `state` (défaut) ou une couleur fixe : `white`, `gray`, `anthracite`, `black`, `green`, `burgundy`, `blue`, `brown`, ou toute couleur CSS. |
| `name` | Titre de la card. Défaut : nom convivial de l'entité d'état. |
| `compact` | `true` pour une icône colorée à la place de l'illustration. |
| `show_state` | Afficher l'état en toutes lettres sous le nom. Défaut `true` ; `false` ne garde que le nom et l'heure, la couleur et l'icône disant déjà l'état. |
| `confirm` | Confirmation par double appui. Défaut `true`. |
| `show_stop` | Bouton *Stop* pendant le mouvement. Défaut `false`, à laisser désactivé pour les portails à impulsion (RF). |
| `card_tap` | `true` rend toute la card cliquable quand une seule commande est disponible (grande zone tactile, pratique en voiture). Même confirmation double appui. Défaut `false`. |
| `show_key` | Clé sur le portail fermé. Défaut `true`. |
| `show_runner` | Pictogramme piéton en mode piéton. Défaut `true`. |
| `show_car` | Pictogramme voiture dans l'ouverture quand c'est totalement ouvert (coulissant/battant/garage). Défaut `true`. |
| `show_breeze` | Pictogramme brise dans la fente d'aération (garage). Défaut `true`. |
| `show_cat` | Pictogramme chat dans l'ouverture partielle (garage). Défaut `true`. |
| `light_entity` | Lumière (ou switch) commandée par un bouton *Lumière*, dessinée comme un spot orienté vers le portail. Sans confirmation, et le bouton reste pendant le mouvement. |
| `light_position` | Côté du spot : `right` (défaut) ou `left`. Sans effet sur `door`, où le luminaire est au milieu du linteau. |
| `show_spot` | Dessiner le spot, ou sa pastille sur le rond d'état en mode `compact`. Défaut `true` ; `false` masque le dessin et le bouton ensemble. |
| `show_light_button` | Proposer le bouton *Lumière*. Défaut `true` ; `false` garde le spot sur l'illustration mais retire la commande, pour une lumière que l'on veut seulement voir. |
| `open_entity` / `close_entity` / `stop_entity` | Bouton/script/switch/serrure utilisés à la place des services du cover. Une serrure `lock` en `open_entity` fait *Ouvrir* → `lock.open` (bec de cane) et ajoute un bouton *Déverrouiller* séparé quand c'est verrouillé. |
| `pedestrian_entity` | Bouton/script/switch de l'ouverture partielle piéton (coulissant/battants). Active le bouton *Piéton* quand c'est fermé. |
| `vent_entity` | Bouton/script/switch de la position aération (garage). Fente en haut, bouton *Aérer* quand c'est fermé. |
| `partial_entity` | Bouton/script/switch de l'ouverture partielle (garage). Fente au sol, bouton *Partiel* quand c'est fermé. |

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
