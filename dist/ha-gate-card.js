const CARD_VERSION = "1.4.1";

console.info(
  "%c HA-GATE-CARD %c v" + CARD_VERSION + " ",
  "color:white;background:#2e7d32;font-weight:700;",
  "color:#2e7d32;background:white;font-weight:700;"
);

// ---------------------------------------------------------------------------
// i18n
// NOTE: this file is intentionally pure ASCII -- every non-ASCII character
// is written as a \uXXXX escape so the card renders correctly no matter
// which charset the resource is served with.
// ---------------------------------------------------------------------------

const T = {
  en: {
    closed: "Closed", open: "Open", opening: "Opening\u2026", closing: "Closing\u2026",
    unknown: "Unknown state", since: "since",
    pedestrian: "Pedestrian pass", moving: "Moving\u2026",
    open_btn: "Open", close_btn: "Close", stop_btn: "Stop", unlock_btn: "Unlock", confirm_tap: "Confirm?",
    entity: "Gate cover or lock entity (required)",
    state_entity: "Consolidated state entity (optional)",
    unlocked: "Unlocked",
    vent: "Venting",
    partial: "Part-open",
    vent_btn: "Vent",
    partial_btn: "Part-open",
    vent_entity: "Venting command entity (garage)",
    partial_entity: "Part-open command entity (garage)",
    show_breeze: "Show the breeze pictogram",
    show_cat: "Show the cat pictogram",
    light_btn: "Light",
    light_entity: "Light entity (spotlight on the gate)",
    light_position: "Spotlight side",
    light_pos_right: "Right",
    light_pos_left: "Left",
    show_spot: "Show the spotlight and its button",
    show_light_button: "Show the Light button",
    show_state: "Show the state in words",
    contact_entity: "Physical open/closed sensor (optional)", battery_entity: "Battery entity",
    name: "Name", compact: "Compact mode (icon instead of illustration)",
    confirm_opt: "Ask for confirmation before commands (tap twice)",
    show_stop: "Show a Stop button while moving",
    gate_type: "Gate type", type_sliding: "Sliding", type_swing: "Swing (two leaves)",
    slide_direction: "Opening direction (sliding)", dir_left: "To the left", dir_right: "To the right",
    gate_style: "Gate design", style_slats: "Horizontal slats", style_bars_sliding: "Vertical bars",
    style_bars_swing: "Concave", style_bell: "Bell top", style_semi: "Semi-open", style_solid: "Solid, laser pattern",
    gate_color: "Gate color", color_state: "Follow the state (default)",
    color_white: "White", color_gray: "Light gray", color_anthracite: "Anthracite",
    color_black: "Black", color_green: "Fir green", color_burgundy: "Burgundy",
    color_blue: "Steel blue", color_brown: "Brown",
    section_advanced: "Command overrides (buttons / scripts)",
    open_entity: "Open command entity",
    close_entity: "Close command entity",
    stop_entity: "Stop command entity",
    pedestrian_entity: "Pedestrian pass command entity",
    pedestrian_btn: "Pedestrian", type_door: "Door / wicket", type_garage: "Roller garage door",
    show_key: "Show the key symbol when closed", show_runner: "Show the pedestrian pictogram", show_car: "Show the car pictogram when open",
    card_tap: "Tap anywhere on the card to run the single available command",
  },
  fr: {
    closed: "Ferm\u00e9", open: "Ouvert",
    opening: "Ouverture en cours\u2026", closing: "Fermeture en cours\u2026",
    unknown: "\u00c9tat inconnu", since: "depuis",
    pedestrian: "Pi\u00e9ton", moving: "En mouvement\u2026",
    open_btn: "Ouvrir", close_btn: "Fermer", stop_btn: "Stop", unlock_btn: "D\u00e9verrouiller", confirm_tap: "Confirmer ?",
    entity: "Entit\u00e9 cover ou serrure du portail (obligatoire)",
    state_entity: "Entit\u00e9 d'\u00e9tat consolid\u00e9 (optionnel)",
    unlocked: "D\u00e9verrouill\u00e9",
    vent: "A\u00e9ration",
    partial: "Ouverture partielle",
    vent_btn: "A\u00e9rer",
    partial_btn: "Partiel",
    vent_entity: "Entit\u00e9 de commande a\u00e9ration (garage)",
    partial_entity: "Entit\u00e9 de commande ouverture partielle (garage)",
    show_breeze: "Afficher le pictogramme brise",
    show_cat: "Afficher le pictogramme chat",
    light_btn: "Lumi\u00e8re",
    light_entity: "Entit\u00e9 de la lumi\u00e8re (spot sur le portail)",
    light_position: "C\u00f4t\u00e9 du spot",
    light_pos_right: "\u00c0 droite",
    light_pos_left: "\u00c0 gauche",
    show_spot: "Afficher le spot et son bouton",
    show_light_button: "Afficher le bouton Lumi\u00e8re",
    show_state: "Afficher l'\u00e9tat en toutes lettres",
    contact_entity: "Capteur d'ouverture physique (optionnel)", battery_entity: "Entit\u00e9 batterie",
    name: "Nom", compact: "Mode compact (ic\u00f4ne au lieu de l'illustration)",
    confirm_opt: "Demander confirmation avant les commandes (double appui)",
    show_stop: "Afficher un bouton Stop pendant le mouvement",
    gate_type: "Type de portail", type_sliding: "Coulissant", type_swing: "\u00c0 battants",
    slide_direction: "Sens d'ouverture (coulissant)", dir_left: "Vers la gauche", dir_right: "Vers la droite",
    gate_style: "Style du portail", style_slats: "Lames horizontales", style_bars_sliding: "Barreaud\u00e9",
    style_bars_swing: "Concave", style_bell: "Chapeau de gendarme", style_semi: "Semi-ajour\u00e9", style_solid: "Plein, motif laser",
    gate_color: "Couleur du portail", color_state: "Selon l'\u00e9tat (d\u00e9faut)",
    color_white: "Blanc", color_gray: "Gris clair", color_anthracite: "Anthracite",
    color_black: "Noir", color_green: "Vert sapin", color_burgundy: "Bordeaux",
    color_blue: "Bleu acier", color_brown: "Marron",
    section_advanced: "Commandes personnalis\u00e9es (boutons / scripts)",
    open_entity: "Entit\u00e9 commande Ouvrir",
    close_entity: "Entit\u00e9 commande Fermer",
    stop_entity: "Entit\u00e9 commande Stop",
    pedestrian_entity: "Entit\u00e9 commande Pi\u00e9ton",
    pedestrian_btn: "Pi\u00e9ton", type_door: "Portillon / porte", type_garage: "Porte de garage roulante",
    show_key: "Afficher la cl\u00e9 quand c'est ferm\u00e9", show_runner: "Afficher le pictogramme pi\u00e9ton", show_car: "Afficher le pictogramme voiture quand c'est ouvert",
    card_tap: "Toute la carte d\u00e9clenche la commande unique disponible",
  },
  ru: {
    closed: "\u0417\u0430\u043a\u0440\u044b\u0442\u043e", open: "\u041e\u0442\u043a\u0440\u044b\u0442\u043e", opening: "\u041e\u0442\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f\u2026", closing: "\u0417\u0430\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f\u2026",
    unknown: "\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435", since: "\u0441",
    pedestrian: "\u041f\u0435\u0448\u0435\u0445\u043e\u0434\u043d\u044b\u0439 \u043f\u0440\u043e\u0445\u043e\u0434", moving: "\u0412 \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0438\u2026",
    open_btn: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c", close_btn: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c", stop_btn: "\u0421\u0442\u043e\u043f", unlock_btn: "\u041e\u0442\u043f\u0435\u0440\u0435\u0442\u044c", confirm_tap: "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c?",
    entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c cover \u0438\u043b\u0438 \u0437\u0430\u043c\u043a\u0430 \u0432\u043e\u0440\u043e\u0442 (\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    state_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u0441\u0432\u043e\u0434\u043d\u043e\u0433\u043e \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    unlocked: "\u041d\u0435 \u0437\u0430\u043f\u0435\u0440\u0442\u043e",
    vent: "\u041f\u0440\u043e\u0432\u0435\u0442\u0440\u0438\u0432\u0430\u043d\u0438\u0435",
    partial: "\u0427\u0430\u0441\u0442\u0438\u0447\u043d\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u043e",
    vent_btn: "\u041f\u0440\u043e\u0432\u0435\u0442\u0440\u0438\u0442\u044c",
    partial_btn: "\u0427\u0430\u0441\u0442\u0438\u0447\u043d\u043e",
    vent_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u043f\u0440\u043e\u0432\u0435\u0442\u0440\u0438\u0432\u0430\u043d\u0438\u044f (\u0433\u0430\u0440\u0430\u0436)",
    partial_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u0447\u0430\u0441\u0442\u0438\u0447\u043d\u043e\u0433\u043e \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u044f (\u0433\u0430\u0440\u0430\u0436)",
    show_breeze: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0438\u043a\u0442\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u0432\u043e\u0437\u0434\u0443\u0445\u0430",
    show_cat: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0438\u043a\u0442\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u043a\u043e\u0448\u043a\u0438",
    light_btn: "\u0421\u0432\u0435\u0442",
    light_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u0441\u0432\u0435\u0442\u0430 (\u043f\u0440\u043e\u0436\u0435\u043a\u0442\u043e\u0440 \u043d\u0430 \u0432\u043e\u0440\u043e\u0442\u0430\u0445)",
    light_position: "\u0421\u0442\u043e\u0440\u043e\u043d\u0430 \u043f\u0440\u043e\u0436\u0435\u043a\u0442\u043e\u0440\u0430",
    light_pos_right: "\u0421\u043f\u0440\u0430\u0432\u0430",
    light_pos_left: "\u0421\u043b\u0435\u0432\u0430",
    show_spot: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0436\u0435\u043a\u0442\u043e\u0440 \u0438 \u0435\u0433\u043e \u043a\u043d\u043e\u043f\u043a\u0443",
    show_light_button: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0443 \u0441\u0432\u0435\u0442\u0430",
    show_state: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u0441\u043b\u043e\u0432\u0430\u043c\u0438",
    contact_entity: "\u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0434\u0430\u0442\u0447\u0438\u043a \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u044f (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)", battery_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u0431\u0430\u0442\u0430\u0440\u0435\u0438",
    name: "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435", compact: "\u041a\u043e\u043c\u043f\u0430\u043a\u0442\u043d\u044b\u0439 \u0440\u0435\u0436\u0438\u043c (\u0437\u043d\u0430\u0447\u043e\u043a \u0432\u043c\u0435\u0441\u0442\u043e \u0438\u043b\u043b\u044e\u0441\u0442\u0440\u0430\u0446\u0438\u0438)",
    confirm_opt: "\u0417\u0430\u043f\u0440\u0430\u0448\u0438\u0432\u0430\u0442\u044c \u043f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u0435\u0440\u0435\u0434 \u043a\u043e\u043c\u0430\u043d\u0434\u0430\u043c\u0438 (\u0434\u0432\u043e\u0439\u043d\u043e\u0435 \u043d\u0430\u0436\u0430\u0442\u0438\u0435)",
    show_stop: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043d\u043e\u043f\u043a\u0443 \u0421\u0442\u043e\u043f \u0432\u043e \u0432\u0440\u0435\u043c\u044f \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u044f",
    gate_type: "\u0422\u0438\u043f \u0432\u043e\u0440\u043e\u0442", type_sliding: "\u041e\u0442\u043a\u0430\u0442\u043d\u044b\u0435", type_swing: "\u0420\u0430\u0441\u043f\u0430\u0448\u043d\u044b\u0435 (\u0434\u0432\u0435 \u0441\u0442\u0432\u043e\u0440\u043a\u0438)",
    slide_direction: "\u041d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435 \u043e\u0442\u043a\u0440\u044b\u0442\u0438\u044f (\u043e\u0442\u043a\u0430\u0442\u043d\u044b\u0435)", dir_left: "\u0412\u043b\u0435\u0432\u043e", dir_right: "\u0412\u043f\u0440\u0430\u0432\u043e",
    gate_style: "\u0414\u0438\u0437\u0430\u0439\u043d \u0432\u043e\u0440\u043e\u0442", style_slats: "\u0413\u043e\u0440\u0438\u0437\u043e\u043d\u0442\u0430\u043b\u044c\u043d\u044b\u0435 \u043b\u0430\u043c\u0435\u043b\u0438", style_bars_sliding: "\u0412\u0435\u0440\u0442\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0435 \u043f\u0440\u0443\u0442\u044c\u044f",
    style_bars_swing: "\u0412\u043e\u0433\u043d\u0443\u0442\u044b\u0435", style_bell: "\u0410\u0440\u043e\u0447\u043d\u044b\u0439 \u0432\u0435\u0440\u0445", style_semi: "\u041f\u043e\u043b\u0443\u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0435", style_solid: "\u0421\u043f\u043b\u043e\u0448\u043d\u044b\u0435, \u043b\u0430\u0437\u0435\u0440\u043d\u044b\u0439 \u0443\u0437\u043e\u0440",
    gate_color: "\u0426\u0432\u0435\u0442 \u0432\u043e\u0440\u043e\u0442", color_state: "\u041f\u043e \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044e (\u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e)",
    color_white: "\u0411\u0435\u043b\u044b\u0439", color_gray: "\u0421\u0432\u0435\u0442\u043b\u043e-\u0441\u0435\u0440\u044b\u0439", color_anthracite: "\u0410\u043d\u0442\u0440\u0430\u0446\u0438\u0442",
    color_black: "\u0427\u0451\u0440\u043d\u044b\u0439", color_green: "\u0417\u0435\u043b\u0451\u043d\u044b\u0439 (\u0435\u043b\u044c)", color_burgundy: "\u0411\u043e\u0440\u0434\u043e\u0432\u044b\u0439",
    color_blue: "\u0421\u0442\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u0438\u043d\u0438\u0439", color_brown: "\u041a\u043e\u0440\u0438\u0447\u043d\u0435\u0432\u044b\u0439",
    section_advanced: "\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u044b (\u043a\u043d\u043e\u043f\u043a\u0438 / \u0441\u043a\u0440\u0438\u043f\u0442\u044b)",
    open_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u041e\u0442\u043a\u0440\u044b\u0442\u044c",
    close_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u0417\u0430\u043a\u0440\u044b\u0442\u044c",
    stop_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u0421\u0442\u043e\u043f",
    pedestrian_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u041f\u0435\u0448\u0435\u0445\u043e\u0434",
    pedestrian_btn: "\u041f\u0435\u0448\u0435\u0445\u043e\u0434", type_door: "\u0414\u0432\u0435\u0440\u044c / \u043a\u0430\u043b\u0438\u0442\u043a\u0430", type_garage: "\u0420\u0443\u043b\u043e\u043d\u043d\u044b\u0435 \u0433\u0430\u0440\u0430\u0436\u043d\u044b\u0435 \u0432\u043e\u0440\u043e\u0442\u0430",
    show_key: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043b\u044e\u0447, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u043a\u0440\u044b\u0442\u043e", show_runner: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0438\u043a\u0442\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u043f\u0435\u0448\u0435\u0445\u043e\u0434\u0430", show_car: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0438\u043a\u0442\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u0430\u0432\u0442\u043e\u043c\u043e\u0431\u0438\u043b\u044f, \u043a\u043e\u0433\u0434\u0430 \u043e\u0442\u043a\u0440\u044b\u0442\u043e",
    card_tap: "\u041d\u0430\u0436\u0430\u0442\u0438\u0435 \u043d\u0430 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442 \u0435\u0434\u0438\u043d\u0441\u0442\u0432\u0435\u043d\u043d\u0443\u044e \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0443\u044e \u043a\u043e\u043c\u0430\u043d\u0434\u0443",
  },
  de: {
    closed: "Geschlossen", open: "Offen", opening: "\u00d6ffnet\u2026", closing: "Schlie\u00dft\u2026",
    unknown: "Unbekannter Zustand", since: "seit",
    pedestrian: "Personendurchgang", moving: "In Bewegung\u2026",
    open_btn: "\u00d6ffnen", close_btn: "Schlie\u00dfen", stop_btn: "Stopp", unlock_btn: "Entriegeln", confirm_tap: "Best\u00e4tigen?",
    entity: "Tor-Cover- oder Schloss-Entit\u00e4t (erforderlich)",
    state_entity: "Konsolidierte Status-Entit\u00e4t (optional)",
    unlocked: "Entriegelt",
    vent: "L\u00fcftung",
    partial: "Teilweise offen",
    vent_btn: "L\u00fcften",
    partial_btn: "Teilweise",
    vent_entity: "Entit\u00e4t f\u00fcr L\u00fcftungsbefehl (Garage)",
    partial_entity: "Entit\u00e4t f\u00fcr Teil\u00f6ffnungsbefehl (Garage)",
    show_breeze: "Luftstrom-Piktogramm anzeigen",
    show_cat: "Katzen-Piktogramm anzeigen",
    light_btn: "Licht",
    light_entity: "Licht-Entit\u00e4t (Strahler am Tor)",
    light_position: "Seite des Strahlers",
    light_pos_right: "Rechts",
    light_pos_left: "Links",
    show_spot: "Strahler und Schaltfl\u00e4che anzeigen",
    show_light_button: "Licht-Schaltfl\u00e4che anzeigen",
    show_state: "Zustand als Text anzeigen",
    contact_entity: "Physischer \u00d6ffnungssensor (optional)", battery_entity: "Batterie-Entit\u00e4t",
    name: "Name", compact: "Kompaktmodus (Symbol statt Illustration)",
    confirm_opt: "Vor Befehlen best\u00e4tigen (zweimal tippen)",
    show_stop: "Stopp-Taste w\u00e4hrend der Bewegung anzeigen",
    gate_type: "Tortyp", type_sliding: "Schiebetor", type_swing: "Fl\u00fcgeltor",
    slide_direction: "\u00d6ffnungsrichtung (Schiebetor)", dir_left: "Nach links", dir_right: "Nach rechts",
    gate_style: "Tor-Design", style_slats: "Horizontale Lamellen", style_bars_sliding: "St\u00e4be",
    style_bars_swing: "Konkav", style_bell: "Bogen oben", style_semi: "Halboffen", style_solid: "Voll, Lasermuster",
    gate_color: "Torfarbe", color_state: "Dem Zustand folgen (Standard)",
    color_white: "Wei\u00df", color_gray: "Hellgrau", color_anthracite: "Anthrazit",
    color_black: "Schwarz", color_green: "Tannengr\u00fcn", color_burgundy: "Bordeauxrot",
    color_blue: "Stahlblau", color_brown: "Braun",
    section_advanced: "Befehls-Overrides (Buttons / Skripte)",
    open_entity: "Entit\u00e4t Befehl \u00d6ffnen",
    close_entity: "Entit\u00e4t Befehl Schlie\u00dfen",
    stop_entity: "Entit\u00e4t Befehl Stopp",
    pedestrian_entity: "Entit\u00e4t Befehl Fu\u00dfg\u00e4nger",
    pedestrian_btn: "Fu\u00dfg\u00e4nger", type_door: "T\u00fcr / Pforte", type_garage: "Rolltor (Garage)",
    show_key: "Schl\u00fcsselsymbol anzeigen, wenn geschlossen", show_runner: "Fu\u00dfg\u00e4nger-Piktogramm anzeigen", show_car: "Auto-Piktogramm anzeigen, wenn offen",
    card_tap: "Tippen auf die ganze Karte f\u00fchrt den einzigen verf\u00fcgbaren Befehl aus",
  },
  es: {
    closed: "Cerrado", open: "Abierto", opening: "Abriendo\u2026", closing: "Cerrando\u2026",
    unknown: "Estado desconocido", since: "desde",
    pedestrian: "Peatonal", moving: "En movimiento\u2026",
    open_btn: "Abrir", close_btn: "Cerrar", stop_btn: "Parar", unlock_btn: "Desbloquear", confirm_tap: "\u00bfConfirmar?",
    entity: "Entidad cover o cerradura del port\u00f3n (obligatoria)",
    state_entity: "Entidad de estado consolidado (opcional)",
    unlocked: "Desbloqueado",
    vent: "Ventilaci\u00f3n",
    partial: "Apertura parcial",
    vent_btn: "Ventilar",
    partial_btn: "Parcial",
    vent_entity: "Entidad de comando de ventilaci\u00f3n (garaje)",
    partial_entity: "Entidad de comando de apertura parcial (garaje)",
    show_breeze: "Mostrar el pictograma de brisa",
    show_cat: "Mostrar el pictograma del gato",
    light_btn: "Luz",
    light_entity: "Entidad de la luz (foco en la puerta)",
    light_position: "Lado del foco",
    light_pos_right: "Derecha",
    light_pos_left: "Izquierda",
    show_spot: "Mostrar el foco y su bot\u00f3n",
    show_light_button: "Mostrar el bot\u00f3n Luz",
    show_state: "Mostrar el estado en palabras",
    contact_entity: "Sensor f\u00edsico de apertura (opcional)", battery_entity: "Entidad de bater\u00eda",
    name: "Nombre", compact: "Modo compacto (icono en lugar de ilustraci\u00f3n)",
    confirm_opt: "Pedir confirmaci\u00f3n antes de los comandos (doble toque)",
    show_stop: "Mostrar bot\u00f3n Parar durante el movimiento",
    gate_type: "Tipo de port\u00f3n", type_sliding: "Corredero", type_swing: "Batiente",
    slide_direction: "Sentido de apertura (corredero)", dir_left: "Hacia la izquierda", dir_right: "Hacia la derecha",
    gate_style: "Dise\u00f1o del port\u00f3n", style_slats: "Lamas horizontales", style_bars_sliding: "Barrotes",
    style_bars_swing: "C\u00f3ncavo", style_bell: "Curva alta", style_semi: "Semicalado", style_solid: "Ciego, motivo l\u00e1ser",
    gate_color: "Color del port\u00f3n", color_state: "Seg\u00fan el estado (predeterminado)",
    color_white: "Blanco", color_gray: "Gris claro", color_anthracite: "Antracita",
    color_black: "Negro", color_green: "Verde abeto", color_burgundy: "Burdeos",
    color_blue: "Azul acero", color_brown: "Marr\u00f3n",
    section_advanced: "Comandos personalizados (botones / scripts)",
    open_entity: "Entidad comando Abrir",
    close_entity: "Entidad comando Cerrar",
    stop_entity: "Entidad comando Parar",
    pedestrian_entity: "Entidad comando Peatonal",
    pedestrian_btn: "Peatonal", type_door: "Puerta peatonal", type_garage: "Puerta de garaje enrollable",
    show_key: "Mostrar la llave cuando est\u00e1 cerrado", show_runner: "Mostrar el pictograma peatonal", show_car: "Mostrar el pictograma del coche cuando est\u00e1 abierto",
    card_tap: "Tocar la tarjeta ejecuta el \u00fanico comando disponible",
  },
  it: {
    closed: "Chiuso", open: "Aperto", opening: "Apertura\u2026", closing: "Chiusura\u2026",
    unknown: "Stato sconosciuto", since: "dalle",
    pedestrian: "Pedonale", moving: "In movimento\u2026",
    open_btn: "Apri", close_btn: "Chiudi", stop_btn: "Stop", unlock_btn: "Sblocca", confirm_tap: "Confermare?",
    entity: "Entit\u00e0 cover o serratura del cancello (obbligatoria)",
    state_entity: "Entit\u00e0 di stato consolidato (opzionale)",
    unlocked: "Sbloccato",
    vent: "Ventilazione",
    partial: "Apertura parziale",
    vent_btn: "Ventila",
    partial_btn: "Parziale",
    vent_entity: "Entit\u00e0 comando ventilazione (garage)",
    partial_entity: "Entit\u00e0 comando apertura parziale (garage)",
    show_breeze: "Mostra il pittogramma della brezza",
    show_cat: "Mostra il pittogramma del gatto",
    light_btn: "Luce",
    light_entity: "Entit\u00e0 della luce (faretto sul cancello)",
    light_position: "Lato del faretto",
    light_pos_right: "Destra",
    light_pos_left: "Sinistra",
    show_spot: "Mostra il faretto e il suo pulsante",
    show_light_button: "Mostra il pulsante Luce",
    show_state: "Mostra lo stato a parole",
    contact_entity: "Sensore fisico di apertura (opzionale)", battery_entity: "Entit\u00e0 batteria",
    name: "Nome", compact: "Modalit\u00e0 compatta (icona invece dell'illustrazione)",
    confirm_opt: "Chiedere conferma prima dei comandi (doppio tocco)",
    show_stop: "Mostra il pulsante Stop durante il movimento",
    gate_type: "Tipo di cancello", type_sliding: "Scorrevole", type_swing: "A battente",
    slide_direction: "Direzione di apertura (scorrevole)", dir_left: "Verso sinistra", dir_right: "Verso destra",
    gate_style: "Design del cancello", style_slats: "Doghe orizzontali", style_bars_sliding: "A barre",
    style_bars_swing: "Concavo", style_bell: "Ad arco", style_semi: "Semiaperto", style_solid: "Cieco, motivo laser",
    gate_color: "Colore del cancello", color_state: "Segue lo stato (predefinito)",
    color_white: "Bianco", color_gray: "Grigio chiaro", color_anthracite: "Antracite",
    color_black: "Nero", color_green: "Verde abete", color_burgundy: "Bordeaux",
    color_blue: "Blu acciaio", color_brown: "Marrone",
    section_advanced: "Comandi personalizzati (pulsanti / script)",
    open_entity: "Entit\u00e0 comando Apri",
    close_entity: "Entit\u00e0 comando Chiudi",
    stop_entity: "Entit\u00e0 comando Stop",
    pedestrian_entity: "Entit\u00e0 comando Pedonale",
    pedestrian_btn: "Pedonale", type_door: "Porta pedonale", type_garage: "Serranda del garage",
    show_key: "Mostra la chiave quando \u00e8 chiuso", show_runner: "Mostra il pittogramma pedonale", show_car: "Mostra il pittogramma dell'auto quando \u00e8 aperto",
    card_tap: "Toccare la scheda esegue l'unico comando disponibile",
  },
  nl: {
    closed: "Gesloten", open: "Open", opening: "Opent\u2026", closing: "Sluit\u2026",
    unknown: "Onbekende status", since: "sinds",
    pedestrian: "Voetgangersstand", moving: "In beweging\u2026",
    open_btn: "Openen", close_btn: "Sluiten", stop_btn: "Stop", unlock_btn: "Ontgrendelen", confirm_tap: "Bevestigen?",
    entity: "Poort cover- of slot-entiteit (verplicht)",
    state_entity: "Geconsolideerde status-entiteit (optioneel)",
    unlocked: "Ontgrendeld",
    vent: "Ventilatie",
    partial: "Gedeeltelijk open",
    vent_btn: "Ventileren",
    partial_btn: "Gedeeltelijk",
    vent_entity: "Entiteit ventilatiecommando (garage)",
    partial_entity: "Entiteit gedeeltelijk-open commando (garage)",
    show_breeze: "Luchtstroompictogram tonen",
    show_cat: "Kattenpictogram tonen",
    light_btn: "Licht",
    light_entity: "Lichtentiteit (spot op de poort)",
    light_position: "Zijde van de spot",
    light_pos_right: "Rechts",
    light_pos_left: "Links",
    show_spot: "Spot en bijbehorende knop tonen",
    show_light_button: "De knop Licht tonen",
    show_state: "De status in woorden tonen",
    contact_entity: "Fysieke openingssensor (optioneel)", battery_entity: "Batterij-entiteit",
    name: "Naam", compact: "Compacte modus (pictogram i.p.v. illustratie)",
    confirm_opt: "Bevestiging vragen v\u00f3\u00f3r commando's (twee keer tikken)",
    show_stop: "Stopknop tonen tijdens beweging",
    gate_type: "Poorttype", type_sliding: "Schuifpoort", type_swing: "Draaipoort",
    slide_direction: "Openingsrichting (schuifpoort)", dir_left: "Naar links", dir_right: "Naar rechts",
    gate_style: "Poortontwerp", style_slats: "Horizontale lamellen", style_bars_sliding: "Spijlen",
    style_bars_swing: "Concaaf", style_bell: "Boogvorm", style_semi: "Halfopen", style_solid: "Dicht, laserpatroon",
    gate_color: "Poortkleur", color_state: "Volgt de status (standaard)",
    color_white: "Wit", color_gray: "Lichtgrijs", color_anthracite: "Antraciet",
    color_black: "Zwart", color_green: "Dennengroen", color_burgundy: "Bordeaux",
    color_blue: "Staalblauw", color_brown: "Bruin",
    section_advanced: "Commando-overrides (knoppen / scripts)",
    open_entity: "Entiteit commando Openen",
    close_entity: "Entiteit commando Sluiten",
    stop_entity: "Entiteit commando Stop",
    pedestrian_entity: "Entiteit commando Voetganger",
    pedestrian_btn: "Voetganger", type_door: "Deur / poortje", type_garage: "Garageroldeur",
    show_key: "Sleutel tonen wanneer gesloten", show_runner: "Voetgangerspictogram tonen", show_car: "Autopictogram tonen wanneer open",
    card_tap: "Tik op de kaart om het enige beschikbare commando uit te voeren",
  },
  pt: {
    closed: "Fechado", open: "Aberto", opening: "A abrir\u2026", closing: "A fechar\u2026",
    unknown: "Estado desconhecido", since: "desde",
    pedestrian: "Pedonal", moving: "Em movimento\u2026",
    open_btn: "Abrir", close_btn: "Fechar", stop_btn: "Parar", unlock_btn: "Destrancar", confirm_tap: "Confirmar?",
    entity: "Entidade cover ou fechadura do port\u00e3o (obrigat\u00f3ria)",
    state_entity: "Entidade de estado consolidado (opcional)",
    unlocked: "Destrancado",
    vent: "Ventila\u00e7\u00e3o",
    partial: "Abertura parcial",
    vent_btn: "Ventilar",
    partial_btn: "Parcial",
    vent_entity: "Entidade de comando de ventila\u00e7\u00e3o (garagem)",
    partial_entity: "Entidade de comando de abertura parcial (garagem)",
    show_breeze: "Mostrar o pictograma de brisa",
    show_cat: "Mostrar o pictograma do gato",
    light_btn: "Luz",
    light_entity: "Entidade da luz (foco no port\u00e3o)",
    light_position: "Lado do foco",
    light_pos_right: "Direita",
    light_pos_left: "Esquerda",
    show_spot: "Mostrar o foco e o seu bot\u00e3o",
    show_light_button: "Mostrar o bot\u00e3o Luz",
    show_state: "Mostrar o estado por extenso",
    contact_entity: "Sensor f\u00edsico de abertura (opcional)", battery_entity: "Entidade de bateria",
    name: "Nome", compact: "Modo compacto (\u00edcone em vez da ilustra\u00e7\u00e3o)",
    confirm_opt: "Pedir confirma\u00e7\u00e3o antes dos comandos (dois toques)",
    show_stop: "Mostrar bot\u00e3o Parar durante o movimento",
    gate_type: "Tipo de port\u00e3o", type_sliding: "De correr", type_swing: "De batente",
    slide_direction: "Sentido de abertura (de correr)", dir_left: "Para a esquerda", dir_right: "Para a direita",
    gate_style: "Design do port\u00e3o", style_slats: "L\u00e2minas horizontais", style_bars_sliding: "Barras",
    style_bars_swing: "C\u00f4ncavo", style_bell: "Arco alto", style_semi: "Semiaberto", style_solid: "Cego, motivo laser",
    gate_color: "Cor do port\u00e3o", color_state: "Segue o estado (predefini\u00e7\u00e3o)",
    color_white: "Branco", color_gray: "Cinzento claro", color_anthracite: "Antracite",
    color_black: "Preto", color_green: "Verde abeto", color_burgundy: "Bord\u00f4",
    color_blue: "Azul a\u00e7o", color_brown: "Castanho",
    section_advanced: "Comandos personalizados (bot\u00f5es / scripts)",
    open_entity: "Entidade comando Abrir",
    close_entity: "Entidade comando Fechar",
    stop_entity: "Entidade comando Parar",
    pedestrian_entity: "Entidade comando Pedonal",
    pedestrian_btn: "Pedonal", type_door: "Porta pedonal", type_garage: "Port\u00e3o de garagem de enrolar",
    show_key: "Mostrar a chave quando fechado", show_runner: "Mostrar o pictograma pedonal", show_car: "Mostrar o pictograma do carro quando aberto",
    card_tap: "Tocar no cart\u00e3o executa o \u00fanico comando dispon\u00edvel",
  },
  sv: {
    closed: "St\u00e4ngd", open: "\u00d6ppen", opening: "\u00d6ppnar\u2026", closing: "St\u00e4nger\u2026",
    unknown: "Ok\u00e4nt l\u00e4ge", since: "sedan",
    pedestrian: "G\u00e5ngpassage", moving: "I r\u00f6relse\u2026",
    open_btn: "\u00d6ppna", close_btn: "St\u00e4ng", stop_btn: "Stopp", unlock_btn: "L\u00e5s upp", confirm_tap: "Bekr\u00e4fta?",
    entity: "Grindens cover- eller l\u00e5sentitet (obligatorisk)",
    state_entity: "Konsoliderad status-entitet (valfri)",
    unlocked: "Ol\u00e5st",
    vent: "V\u00e4dring",
    partial: "Delvis \u00f6ppen",
    vent_btn: "V\u00e4dra",
    partial_btn: "Delvis",
    vent_entity: "Entitet f\u00f6r v\u00e4dringskommando (garage)",
    partial_entity: "Entitet f\u00f6r delvis \u00f6ppning (garage)",
    show_breeze: "Visa luftpiktogrammet",
    show_cat: "Visa kattpiktogrammet",
    light_btn: "Ljus",
    light_entity: "Ljusentitet (str\u00e5lkastare p\u00e5 grinden)",
    light_position: "Str\u00e5lkastarens sida",
    light_pos_right: "H\u00f6ger",
    light_pos_left: "V\u00e4nster",
    show_spot: "Visa str\u00e5lkastaren och dess knapp",
    show_light_button: "Visa knappen Ljus",
    show_state: "Visa tillst\u00e5ndet i ord",
    contact_entity: "Fysisk \u00f6ppningssensor (valfri)", battery_entity: "Batterientitet",
    name: "Namn", compact: "Kompakt l\u00e4ge (ikon i st\u00e4llet f\u00f6r illustration)",
    confirm_opt: "Be om bekr\u00e4ftelse f\u00f6re kommandon (tryck tv\u00e5 g\u00e5nger)",
    show_stop: "Visa stoppknapp under r\u00f6relse",
    gate_type: "Grindtyp", type_sliding: "Skjutgrind", type_swing: "Slaggrind",
    slide_direction: "\u00d6ppningsriktning (skjutgrind)", dir_left: "\u00c5t v\u00e4nster", dir_right: "\u00c5t h\u00f6ger",
    gate_style: "Grinddesign", style_slats: "Horisontella ribbor", style_bars_sliding: "Spj\u00e4lor",
    style_bars_swing: "Konkav", style_bell: "B\u00e5gform", style_semi: "Halv\u00f6ppen", style_solid: "T\u00e4t, laserm\u00f6nster",
    gate_color: "Grindf\u00e4rg", color_state: "F\u00f6ljer l\u00e4get (standard)",
    color_white: "Vit", color_gray: "Ljusgr\u00e5", color_anthracite: "Antracit",
    color_black: "Svart", color_green: "Grangr\u00f6n", color_burgundy: "Vinr\u00f6d",
    color_blue: "St\u00e5lbl\u00e5", color_brown: "Brun",
    section_advanced: "Kommando-\u00f6verstyrningar (knappar / skript)",
    open_entity: "Entitet kommando \u00d6ppna",
    close_entity: "Entitet kommando St\u00e4ng",
    stop_entity: "Entitet kommando Stopp",
    pedestrian_entity: "Entitet kommando G\u00e5ng",
    pedestrian_btn: "G\u00e5ng", type_door: "D\u00f6rr / g\u00e5nggrind", type_garage: "Garageport (rullport)",
    show_key: "Visa nyckeln n\u00e4r st\u00e4ngd", show_runner: "Visa g\u00e5ngpiktogrammet", show_car: "Visa bilpiktogrammet n\u00e4r \u00f6ppen",
    card_tap: "Tryck var som helst p\u00e5 kortet f\u00f6r att k\u00f6ra det enda tillg\u00e4ngliga kommandot",
  },
  no: {
    closed: "Lukket", open: "\u00c5pen", opening: "\u00c5pner\u2026", closing: "Lukker\u2026",
    unknown: "Ukjent tilstand", since: "siden",
    pedestrian: "Gangpassasje", moving: "I bevegelse\u2026",
    open_btn: "\u00c5pne", close_btn: "Lukk", stop_btn: "Stopp", unlock_btn: "L\u00e5s opp", confirm_tap: "Bekreft?",
    entity: "Portens cover- eller l\u00e5sentitet (p\u00e5krevd)",
    state_entity: "Konsolidert status-entitet (valgfri)",
    unlocked: "Ul\u00e5st",
    vent: "Lufting",
    partial: "Delvis \u00e5pen",
    vent_btn: "Luft",
    partial_btn: "Delvis",
    vent_entity: "Entitet for luftekommando (garasje)",
    partial_entity: "Entitet for delvis \u00e5pning (garasje)",
    show_breeze: "Vis luftpiktogrammet",
    show_cat: "Vis kattepiktogrammet",
    light_btn: "Lys",
    light_entity: "Lysenhet (lyskaster p\u00e5 porten)",
    light_position: "Lyskasterens side",
    light_pos_right: "H\u00f8yre",
    light_pos_left: "Venstre",
    show_spot: "Vis lyskasteren og knappen",
    show_light_button: "Vis Lys-knappen",
    show_state: "Vis tilstanden med ord",
    contact_entity: "Fysisk \u00e5pningssensor (valgfri)", battery_entity: "Batterientitet",
    name: "Navn", compact: "Kompakt modus (ikon i stedet for illustrasjon)",
    confirm_opt: "Be om bekreftelse f\u00f8r kommandoer (trykk to ganger)",
    show_stop: "Vis stoppknapp under bevegelse",
    gate_type: "Porttype", type_sliding: "Skyveport", type_swing: "Slagport",
    slide_direction: "\u00c5pningsretning (skyveport)", dir_left: "Mot venstre", dir_right: "Mot h\u00f8yre",
    gate_style: "Portdesign", style_slats: "Horisontale lameller", style_bars_sliding: "Sprosser",
    style_bars_swing: "Konkav", style_bell: "Bueform", style_semi: "Halv\u00e5pen", style_solid: "Tett, laserm\u00f8nster",
    gate_color: "Portfarge", color_state: "F\u00f8lger tilstanden (standard)",
    color_white: "Hvit", color_gray: "Lysegr\u00e5", color_anthracite: "Antrasitt",
    color_black: "Svart", color_green: "Grangr\u00f8nn", color_burgundy: "Burgunder",
    color_blue: "St\u00e5lbl\u00e5", color_brown: "Brun",
    section_advanced: "Kommando-overstyringer (knapper / skript)",
    open_entity: "Entitet kommando \u00c5pne",
    close_entity: "Entitet kommando Lukk",
    stop_entity: "Entitet kommando Stopp",
    pedestrian_entity: "Entitet kommando Gang",
    pedestrian_btn: "Gang", type_door: "D\u00f8r / gangport", type_garage: "Garasjeport (rulleport)",
    show_key: "Vis n\u00f8kkelen n\u00e5r lukket", show_runner: "Vis gangpiktogrammet", show_car: "Vis bilpiktogrammet n\u00e5r \u00e5pen",
    card_tap: "Trykk hvor som helst p\u00e5 kortet for \u00e5 kj\u00f8re den eneste tilgjengelige kommandoen",
  },
  da: {
    closed: "Lukket", open: "\u00c5ben", opening: "\u00c5bner\u2026", closing: "Lukker\u2026",
    unknown: "Ukendt tilstand", since: "siden",
    pedestrian: "Gangpassage", moving: "I bev\u00e6gelse\u2026",
    open_btn: "\u00c5bn", close_btn: "Luk", stop_btn: "Stop", unlock_btn: "L\u00e5s op", confirm_tap: "Bekr\u00e6ft?",
    entity: "Portens cover- eller l\u00e5sentitet (p\u00e5kr\u00e6vet)",
    state_entity: "Konsolideret status-entitet (valgfri)",
    unlocked: "Ul\u00e5st",
    vent: "Udluftning",
    partial: "Delvist \u00e5ben",
    vent_btn: "Udluft",
    partial_btn: "Delvist",
    vent_entity: "Entitet til udluftningskommando (garage)",
    partial_entity: "Entitet til delvis \u00e5bning (garage)",
    show_breeze: "Vis luftpiktogrammet",
    show_cat: "Vis kattepiktogrammet",
    light_btn: "Lys",
    light_entity: "Lysenhed (spot p\u00e5 porten)",
    light_position: "Spottens side",
    light_pos_right: "H\u00f8jre",
    light_pos_left: "Venstre",
    show_spot: "Vis spotten og dens knap",
    show_light_button: "Vis Lys-knappen",
    show_state: "Vis tilstanden med ord",
    contact_entity: "Fysisk \u00e5bningssensor (valgfri)", battery_entity: "Batterientitet",
    name: "Navn", compact: "Kompakt tilstand (ikon i stedet for illustration)",
    confirm_opt: "Bed om bekr\u00e6ftelse f\u00f8r kommandoer (tryk to gange)",
    show_stop: "Vis stopknap under bev\u00e6gelse",
    gate_type: "Porttype", type_sliding: "Skydeport", type_swing: "Fl\u00f8jport",
    slide_direction: "\u00c5bningsretning (skydeport)", dir_left: "Mod venstre", dir_right: "Mod h\u00f8jre",
    gate_style: "Portdesign", style_slats: "Vandrette lameller", style_bars_sliding: "Tremmer",
    style_bars_swing: "Konkav", style_bell: "Bueform", style_semi: "Halv\u00e5ben", style_solid: "T\u00e6t, laserm\u00f8nster",
    gate_color: "Portfarve", color_state: "F\u00f8lger tilstanden (standard)",
    color_white: "Hvid", color_gray: "Lysegr\u00e5", color_anthracite: "Antracit",
    color_black: "Sort", color_green: "Grangr\u00f8n", color_burgundy: "Bordeaux",
    color_blue: "St\u00e5lbl\u00e5", color_brown: "Brun",
    section_advanced: "Kommando-tilsides\u00e6ttelser (knapper / scripts)",
    open_entity: "Entitet kommando \u00c5bn",
    close_entity: "Entitet kommando Luk",
    stop_entity: "Entitet kommando Stop",
    pedestrian_entity: "Entitet kommando Gang",
    pedestrian_btn: "Gang", type_door: "D\u00f8r / gangl\u00e5ge", type_garage: "Garageport (rulleport)",
    show_key: "Vis n\u00f8glen n\u00e5r lukket", show_runner: "Vis gangpiktogrammet", show_car: "Vis bilpiktogrammet n\u00e5r \u00e5ben",
    card_tap: "Tryk hvor som helst p\u00e5 kortet for at k\u00f8re den eneste tilg\u00e6ngelige kommando",
  },
  pl: {
    closed: "Zamkni\u0119ta", open: "Otwarta", opening: "Otwieranie\u2026", closing: "Zamykanie\u2026",
    unknown: "Stan nieznany", since: "od",
    pedestrian: "Furtka", moving: "W ruchu\u2026",
    open_btn: "Otw\u00f3rz", close_btn: "Zamknij", stop_btn: "Stop", unlock_btn: "Odblokuj", confirm_tap: "Potwierdzi\u0107?",
    entity: "Encja cover lub zamka bramy (wymagana)",
    state_entity: "Encja stanu skonsolidowanego (opcjonalna)",
    unlocked: "Odblokowana",
    vent: "Wietrzenie",
    partial: "Cz\u0119\u015bciowo otwarta",
    vent_btn: "Wietrz",
    partial_btn: "Cz\u0119\u015bciowo",
    vent_entity: "Encja polecenia wietrzenia (gara\u017c)",
    partial_entity: "Encja polecenia cz\u0119\u015bciowego otwarcia (gara\u017c)",
    show_breeze: "Poka\u017c piktogram powiewu",
    show_cat: "Poka\u017c piktogram kota",
    light_btn: "\u015awiat\u0142o",
    light_entity: "Encja \u015bwiat\u0142a (reflektor na bramie)",
    light_position: "Strona reflektora",
    light_pos_right: "Prawa",
    light_pos_left: "Lewa",
    show_spot: "Poka\u017c reflektor i jego przycisk",
    show_light_button: "Poka\u017c przycisk \u015awiat\u0142o",
    show_state: "Poka\u017c stan s\u0142ownie",
    contact_entity: "Fizyczny czujnik otwarcia (opcjonalny)", battery_entity: "Encja baterii",
    name: "Nazwa", compact: "Tryb kompaktowy (ikona zamiast ilustracji)",
    confirm_opt: "Wymagaj potwierdzenia przed komendami (dwa dotkni\u0119cia)",
    show_stop: "Poka\u017c przycisk Stop podczas ruchu",
    gate_type: "Typ bramy", type_sliding: "Przesuwna", type_swing: "Dwuskrzyd\u0142owa",
    slide_direction: "Kierunek otwierania (przesuwna)", dir_left: "W lewo", dir_right: "W prawo",
    gate_style: "Wygl\u0105d bramy", style_slats: "Poziome lamele", style_bars_sliding: "Szczebelki",
    style_bars_swing: "Wkl\u0119s\u0142y", style_bell: "\u0141ukowa", style_semi: "P\u00f3\u0142a\u017curowa", style_solid: "Pe\u0142na, wz\u00f3r laserowy",
    gate_color: "Kolor bramy", color_state: "Zgodny ze stanem (domy\u015blnie)",
    color_white: "Bia\u0142y", color_gray: "Jasnoszary", color_anthracite: "Antracyt",
    color_black: "Czarny", color_green: "Ziele\u0144 jod\u0142owa", color_burgundy: "Bordowy",
    color_blue: "Stalowy niebieski", color_brown: "Br\u0105zowy",
    section_advanced: "Niestandardowe komendy (przyciski / skrypty)",
    open_entity: "Encja komendy Otw\u00f3rz",
    close_entity: "Encja komendy Zamknij",
    stop_entity: "Encja komendy Stop",
    pedestrian_entity: "Encja komendy Furtka",
    pedestrian_btn: "Furtka", type_door: "Drzwi / furtka", type_garage: "Brama gara\u017cowa rolowana",
    show_key: "Poka\u017c klucz, gdy zamkni\u0119ta", show_runner: "Poka\u017c piktogram pieszego", show_car: "Poka\u017c piktogram samochodu, gdy otwarta",
    card_tap: "Dotkni\u0119cie karty uruchamia jedyn\u0105 dost\u0119pn\u0105 komend\u0119",
  },
};

function lang(hass) {
  const l = String((hass && ((hass.locale && hass.locale.language) || hass.language)) || "en")
    .toLowerCase().split("-")[0];
  return T[l] ? l : "en";
}
function t(hass, key) {
  const l = lang(hass);
  return (T[l] && T[l][key]) || T.en[key] || key;
}

// ---------------------------------------------------------------------------
// State normalization -- works with any state source (input_select, sensor,
// the cover itself, template sensors...). Keywords are accent-stripped before
// matching. Order matters: "opening"/"ouverture" must be tested before
// "open"/"ouvert" (prefix collisions), same for "closing" before "closed".
// ---------------------------------------------------------------------------

const STATE_KEYWORDS = {
  // vent et partial passent avant opening/closing : "Ouverture partielle"
  // contient "ouverture", et serait sinon lu comme une ouverture en cours.
  vent: ["ventilation", "aeration", "airing", "luftung", "venting", "vadring", "lufting", "udluftning", "wietrzenie"],
  partial: ["partiel", "partial", "parcial", "parziale", "teilweise", "gedeeltelijk", "delvis", "czesciowo", "animal", "chat"],
  opening: ["opening", "unlocking", "ouverture", "offnet", "abriendo", "apertura", "opent", "abrindo", "a abrir", "oppnar", "apner", "abner", "otwieranie"],
  closing: ["closing", "locking", "fermeture", "schliesst", "cerrando", "chiusura", "sluit", "fechando", "a fechar", "stanger", "lukker", "zamykanie"],
  pedestrian: ["pieton", "pedestrian", "peaton", "pedonal", "voetganger", "fussgang", "durchgang", "gangpass", "ganglage", "gangport", "furtka"],
  moving: ["moving", "mouvement", "in motion", "bewegung", "movimiento", "movimento", "beweging", "rorelse", "bevegelse", "bevaegelse", "bev\u00e6gelse", "ruch"],
  closed: ["closed", "locked", "verrouill", "ferme", "geschlossen", "cerrado", "chiuso", "gesloten", "fechado", "stangd", "lukket", "zamkni"],
  unlocked: ["unlocked", "deverrouill", "entriegelt", "desbloquead", "sbloccat", "ontgrendeld", "destrancad", "olast", "ulast", "odblokowan"],
  open: ["open", "ouvert", "offen", "abierto", "aperto", "aberto", "oppen", "apen", "aben", "otwart"],
};

function stripAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const STATE_KEYWORD_PATTERNS = Object.fromEntries(
  Object.entries(STATE_KEYWORDS).map(([norm, keywords]) => [
    norm,
    keywords.map((kw) => new RegExp(`\\b${kw}`, "i")),
  ])
);

// Freeform text (friendly_name is device-supplied) must never reach
// innerHTML or an attribute unescaped.
function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", "inconnu", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) {
    const mapped = stateMap[s];
    return STATE_COLORS[mapped] ? mapped : "unknown";
  }
  const flat = stripAccents(s);
  for (const norm of Object.keys(STATE_KEYWORD_PATTERNS)) {
    if (STATE_KEYWORD_PATTERNS[norm].some((re) => re.test(flat))) return norm;
  }
  return "unknown";
}

const STATE_COLORS = {
  closed: "var(--success-color, #4caf50)",
  open: "var(--warning-color, #ff9800)",
  opening: "var(--info-color, #2196f3)",
  closing: "var(--info-color, #2196f3)",
  moving: "var(--info-color, #2196f3)",
  pedestrian: "var(--warning-color, #ff9800)",
  unlocked: "var(--warning-color, #ff9800)",
  vent: "var(--warning-color, #ff9800)",
  partial: "var(--warning-color, #ff9800)",
  unknown: "var(--error-color, #f44336)",
};

const STATE_ICONS = {
  closed: "mdi:gate",
  open: "mdi:gate-open",
  opening: "mdi:gate-arrow-right",
  closing: "mdi:gate-arrow-left",
  moving: "mdi:gate-arrow-right",
  pedestrian: "mdi:walk",
  unlocked: "mdi:gate",
  vent: "mdi:weather-windy",
  partial: "mdi:paw",
  unknown: "mdi:gate-alert",
};

// Each palette entry carries a fill and an outline. Light colors (white,
// light gray) get a dark outline so the gate stays visible on light cards;
// black gets a gray outline for dark themes; the rest outline themselves.
const GATE_COLORS = {
  white: { fill: "#f2f0ea", line: "#33363a" },
  gray: { fill: "#c5c7c4", line: "#3f4245" },
  anthracite: { fill: "#383e42", line: "#383e42" },
  black: { fill: "#1b1d1e", line: "#565a5e" },
  green: { fill: "#0f4336", line: "#0f4336" },
  burgundy: { fill: "#6b1c23", line: "#6b1c23" },
  blue: { fill: "#1f3855", line: "#1f3855" },
  brown: { fill: "#59392f", line: "#59392f" },
};

const TYPE_ICONS = {
  garage: {
    closed: "mdi:garage", open: "mdi:garage-open",
    opening: "mdi:garage-open", closing: "mdi:garage",
    moving: "mdi:garage-open", pedestrian: "mdi:garage-open",
    unlocked: "mdi:garage",
    vent: "mdi:garage-variant",
    partial: "mdi:garage-variant",
    unknown: "mdi:garage-alert",
  },
  door: {
    closed: "mdi:door-closed", open: "mdi:door-open",
    opening: "mdi:door-open", closing: "mdi:door-closed",
    moving: "mdi:door-open", pedestrian: "mdi:door-open",
    unlocked: "mdi:door-closed",
    unknown: "mdi:door",
  },
};

function stateIcon(norm, cfg) {
  const perType = TYPE_ICONS[cfg.gate_type];
  return (perType && perType[norm]) || STATE_ICONS[norm];
}

const MOVING = ["opening", "closing", "moving"];

// Which buttons make sense for each state. While the gate is moving no
// command is shown by default: on impulse-driven gates (RF remotes, AirSend,
// dry-contact motors) an extra impulse stops or reverses the leaf, so an
// accidental tap mid-travel is exactly what we want to avoid. `show_stop`
// opts back in for motors with a real, dedicated stop channel.
function actionsFor(norm, cfg) {
  // The light is not a gate command: it stays available at all times, and the
  // two-tap confirmation does not apply to it. Drawing and button are
  // separable, for a light one only wants to watch: no spot means no button,
  // but the spot can be shown on its own.
  const lamp = cfg.light_entity && cfg.show_spot !== false && cfg.show_light_button !== false
    ? ["light"] : [];
  // Doors (wickets) are display-only unless command entities are
  // configured (smart locks like Nuki make buttons legitimate there).
  if (cfg.gate_type === "door" && !cfg.entity && !cfg.open_entity && !cfg.close_entity) return [];
  const stop = cfg.show_stop ? ["stop"] : [];
  // Pedestrian pass only exists on sliding and swing gates.
  const ped = cfg.pedestrian_entity && cfg.gate_type !== "garage";
  switch (norm) {
    case "closed":
      if (ped) return [...lamp, "pedestrian", "open"];
      // Garage: part-open positions, venting slot at the top and a floor gap.
      if (cfg.gate_type === "garage" && (cfg.vent_entity || cfg.partial_entity)) {
        return [
          ...lamp,
          ...(cfg.vent_entity ? ["vent"] : []),
          ...(cfg.partial_entity ? ["partial"] : []),
          "open",
        ];
      }
      // A lock with an unlatch override gets a separate Unlock button.
      if (domainOf(cfg.entity || "") === "lock" && domainOf(cfg.open_entity || "") === "lock") return [...lamp, "unlock", "open"];
      return [...lamp, "open"];
    case "open": return [...lamp, "close"];
    case "unlocked": return [...lamp, "open", "close"];
    case "pedestrian": return [...lamp, "close"];
    case "vent":
    case "partial": return [...lamp, "close"];
    case "opening":
    case "closing":
    case "moving": return [...lamp, ...stop];
    default: return [...lamp, "open", "close"];
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stateObj(hass, entityId) {
  return entityId && hass.states[entityId] ? hass.states[entityId] : null;
}

function domainOf(entityId) {
  return entityId ? entityId.split(".")[0] : null;
}

function formatSince(isoDate) {
  const d = new Date(isoDate);
  if (isNaN(d)) return null;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ---------------------------------------------------------------------------
// Illustrations -- a gate between two capped posts, drawn in the gate color
// with a merged-silhouette outline layer underneath (so light colors get a
// visible contour without lines between the parts).
// Sliding: single leaf of horizontal slats on a rail, wheels spin while
// moving, opens to the left or to the right (slide_direction).
// Swing: two "chapeau de gendarme" leaves pivoting on hinges; the open pose
// mirrors them past the posts like real fully-opened leaves.
// ---------------------------------------------------------------------------

const SCENE_CLOSE = `
  <g class="gate-post-g">
    <rect x="2" y="10" width="9" height="48" rx="2"/>
    <rect x="0" y="6" width="13" height="6" rx="2"/>
    <rect x="129" y="10" width="9" height="48" rx="2"/>
    <rect x="127" y="6" width="13" height="6" rx="2"/>
  </g>`;

const KEY_SHAPES = `
    <circle cx="61" cy="34" r="6"/>
    <rect x="65.5" y="32.3" width="16" height="3.4" rx="1.7"/>
    <rect x="77.5" y="34.5" width="3.2" height="5.4" rx="1"/>
    <rect x="72.3" y="34.5" width="3.2" height="4.4" rx="1"/>`;
const GATE_KEY = `
  <g transform="translate(70 34) rotate(90) scale(0.6) translate(-70 -34)">
    <g class="gate-key-halo">${KEY_SHAPES}</g>
    <g class="gate-key">${KEY_SHAPES}
      <circle cx="61" cy="34" r="2.2" class="gate-key-hole"/>
    </g>
  </g>`;

// Pedestrian pictogram (running person, JD-approved v5 pose) shown centered
// in the open gap while the gate is in pedestrian mode. Drawn twice: a halo
// layer in the card background color under the colored figure, like the key.
const RUNNER_SHAPES = `
    <circle cx="14.9" cy="5.4" r="2.3"/>
    <path d="M13.8 9 Q 12.8 11.4, 12 13.6"/>
    <path d="M13.8 9.2 L17.4 10.8 L20.6 9.8"/>
    <path d="M13.8 9.2 L10.4 8.6 L8.0 11.2"/>
    <path d="M12 13.6 L15.8 15.4 L15.2 20.8"/>
    <path d="M12 13.6 L8.6 16.4 L4.8 17.0"/>`;

function gateRunner(cx, cy, s) {
  return `
  <g transform="translate(${cx - 12 * s} ${cy - 12 * s}) scale(${s})">
    <g class="gate-runner-halo">${RUNNER_SHAPES}</g>
    <g class="gate-runner">${RUNNER_SHAPES}</g>
  </g>`;
}

// Vehicle pictogram (front-view car, solid silhouette like the key): filled
// body with windshield, headlights and plate knocked out in the card
// background color, over a halo layer. Shown centered in the opening while
// the gate is fully open (sliding/swing/garage). The silhouette is stretched
// 12% horizontally (JD-approved v4 proportions).
const CAR_BODY = `
    <path d="M3.6 19.2 L3.6 11.2 Q3.6 9.6 4.8 8.8 L6.6 7.6 L8 3 Q8.5 1.4 10.2 1.4 L17.8 1.4 Q19.5 1.4 20 3 L21.4 7.6 L23.2 8.8 Q24.4 9.6 24.4 11.2 L24.4 19.2 Q24.4 20 23.6 20 L21.2 20 Q20.4 20 20.4 19.2 L20.4 18.4 L7.6 18.4 L7.6 19.2 Q7.6 20 6.8 20 L4.4 20 Q3.6 20 3.6 19.2 Z"/>
    <path d="M6.9 7.2 L5.1 6.4 Q4.4 6.1 4.6 5.5 Q4.8 4.9 5.5 5.1 L7.5 5.7 Z"/>
    <path d="M21.1 7.2 L22.9 6.4 Q23.6 6.1 23.4 5.5 Q23.2 4.9 22.5 5.1 L20.5 5.7 Z"/>`;
const CAR_HOLES = `
    <path d="M9.4 3.1 L18.6 3.1 L19.9 6.7 L8.1 6.7 Z"/>
    <ellipse cx="6.9" cy="11.6" rx="2.2" ry="1.8"/>
    <ellipse cx="21.1" cy="11.6" rx="2.2" ry="1.8"/>
    <rect x="10.8" y="14.4" width="6.4" height="2.5" rx="0.9"/>`;

function gateCar(cx, cy, s) {
  const w = 1.12 * s;
  return `
  <g transform="translate(${cx - 14 * w} ${cy - 10.7 * s}) scale(${w} ${s})">
    <g class="gate-car-halo">${CAR_BODY}</g>
    <g class="gate-car">${CAR_BODY}</g>
    <g class="gate-car-hole">${CAR_HOLES}</g>
  </g>`;
}

function slideX(norm, cfg) {
  const dir = cfg.slide_direction === "right" ? 1 : -1;
  if (norm === "open") return 98 * dir;
  if (norm === "opening" || norm === "closing" || norm === "moving") return 49 * dir;
  if (norm === "pedestrian") return 49 * dir;
  return 0;
}

// Resolve the configured style for a gate type. "modern"/"classic" from
// v0.7.0 keep working as aliases of the per-type default / "bars".
function normStyle(cfg, type) {
  const def = type === "swing" ? "bell" : "slats";
  const s = cfg.gate_style;
  if (!s || s === "modern") return def;
  if (s === "classic") return "bars";
  if (type !== "swing" && s === "bell") return def;
  const known = ["slats", "bars", "semi", "solid", "bell"];
  return known.includes(s) ? s : def;
}

// Laser-cut perforations for the "solid" style: knocked-out dots that move
// with the leaf.
function laserDots(cells) {
  return cells
    .filter(([r, c]) => (r + c) % 2 === 0)
    .map(([r, c, cx, cy]) => `<circle class="gate-hole" cx="${cx}" cy="${cy}" r="1.9"/>`)
    .join("");
}

function slidingSvg(norm, cfg, lampOn) {
  const style = normStyle(cfg, "sliding");
  let shapes;
  let extra = "";
  if (style === "bars") {
    // Straight vertical bars between two rails (the original design).
    let bars = "";
    for (const x of [18, 31.5, 45, 58.5, 72, 85.5, 99, 112.5]) {
      bars += `<rect x="${x}" y="18" width="4" height="27" rx="2"/>`;
    }
    shapes = `
    <rect x="14" y="14" width="112" height="5" rx="2.5"/>
    <rect x="14" y="41" width="112" height="5" rx="2.5"/>
    ${bars}`;
  } else if (style === "semi") {
    // Semi-open: solid lower panel, thin bars above, thin top rail.
    let bars = "";
    for (let i = 0; i < 14; i++) {
      bars += `<rect class="slat" x="${17 + i * 7.8}" y="13" width="3.2" height="18" rx="1.6"/>`;
    }
    shapes = `
    <rect x="14" y="12" width="112" height="3.4" rx="1.7"/>
    <rect x="14" y="30" width="112" height="19" rx="2"/>
    ${bars}`;
  } else if (style === "solid") {
    // Solid convex panel with laser-cut perforations.
    shapes = `
    <path d="M14 49 L14 19 Q 70 9, 126 19 L126 49 Z"/>`;
    const cells = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 13; c++) cells.push([r, c, 22 + c * 8, 24 + r * 8]);
    extra = laserDots(cells);
  } else {
    // Horizontal slats (the 2026 aluminium look) with three uprights.
    // Slats keep a visible gap between them (the outline layer uses a
    // smaller stroke on .slat so the gaps never get swallowed).
    let slats = "";
    for (let i = 0; i < 4; i++) {
      slats += `<rect class="slat" x="14" y="${14 + i * 9.5}" width="112" height="5.5" rx="1.5"/>`;
    }
    shapes = `
    ${slats}
    <rect x="14" y="14" width="3" height="34" rx="1.5"/>
    <rect x="68.5" y="14" width="3" height="34" rx="1.5"/>
    <rect x="123" y="14" width="3" height="34" rx="1.5"/>`;
  }
  const wheel = (cx) => `
    <g class="gate-wheel">
      <circle cx="${cx}" cy="52" r="4.5"/>
      <line x1="${cx - 4.5}" y1="52" x2="${cx + 4.5}" y2="52"/>
      <line x1="${cx}" y1="47.5" x2="${cx}" y2="56.5"/>
    </g>`;
  return `
    <svg viewBox="0 0 140 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="gate-clip"><rect x="11" y="2" width="118" height="60"/></clipPath>
      </defs>
      ${cfg.light_entity && cfg.show_spot !== false ? LAMP_DEFS : ""}
      <line x1="2" y1="58" x2="138" y2="58" class="gate-ground"/>
      <g clip-path="url(#gate-clip)">
        <g class="gate-leaf" style="transform:translateX(${slideX(norm, cfg)}px)">
          <g class="leaf-line">${shapes}</g>
          <g class="leaf-fill">${shapes}</g>
          ${extra}
          ${wheel(40)}
          ${wheel(100)}
        </g>
      </g>
      ${SCENE_CLOSE}
      ${norm === "pedestrian" && cfg.show_runner !== false ? gateRunner(cfg.slide_direction === "right" ? 42 : 98, 34, 1.15) : ""}
      ${norm === "open" && cfg.show_car !== false ? gateCar(70, 36, 1.7) : ""}
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
      ${cfg.light_entity && cfg.show_spot !== false ? gateLight(cfg, lampOn) : ""}
    </svg>`;
}

// Open pose mirrors the leaves past their hinges (negative scaleX). The
// leaves are drawn ON TOP of the posts so the folded-back leaf stays visible.
const SWING_POSE = {
  closed: ["", ""],
  open: ["scaleX(-0.65) skewY(9deg)", "scaleX(-0.65) skewY(-9deg)"],
  opening: ["scaleX(0.35) skewY(7deg)", "scaleX(0.35) skewY(-7deg)"],
  closing: ["scaleX(0.35) skewY(7deg)", "scaleX(0.35) skewY(-7deg)"],
  moving: ["scaleX(0.35) skewY(7deg)", "scaleX(0.35) skewY(-7deg)"],
  pedestrian: ["", "scaleX(-0.65) skewY(-9deg)"],
  unlocked: ["", ""],
  unknown: ["", ""],
};

function swingLeaf(side, transform, cfg) {
  // Styles: "bell" (chapeau de gendarme, rail curves up toward the middle),
  // "bars" (concave, the original design), "slats" (horizontal slats),
  // "semi" (solid lower panel + thin bars), "solid" (convex panel with
  // laser-cut perforations).
  const style = normStyle(cfg, "swing");
  const x0 = side === "l" ? 13 : 71;
  let shapes;
  let extra = "";
  if (style === "slats") {
    let slats = "";
    for (let i = 0; i < 4; i++) {
      slats += `<rect class="slat" x="${x0}" y="${14 + i * 9.5}" width="56" height="5.5" rx="1.5"/>`;
    }
    shapes = `
      ${slats}
      <rect x="${x0}" y="14" width="3" height="34" rx="1.5"/>
      <rect x="${x0 + 53}" y="14" width="3" height="34" rx="1.5"/>`;
  } else if (style === "semi") {
    let bars = "";
    for (let i = 0; i < 7; i++) {
      bars += `<rect class="slat" x="${x0 + 3 + i * 7.6}" y="13" width="3.2" height="18" rx="1.6"/>`;
    }
    shapes = `
      <rect x="${x0}" y="12" width="56" height="3.4" rx="1.7"/>
      <rect x="${x0}" y="30" width="56" height="19" rx="2"/>
      ${bars}`;
  } else if (style === "solid") {
    shapes = side === "l"
      ? `
      <path d="M13 49 L13 20 Q 45 11, 69 12.5 L69 49 Z"/>`
      : `
      <path d="M127 49 L127 20 Q 95 11, 71 12.5 L71 49 Z"/>`;
    const cells = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 7; c++) {
        const cx = side === "l" ? 21 + c * 7.4 : 119 - c * 7.4;
        cells.push([r, c, cx, 23 + r * 8]);
      }
    }
    extra = laserDots(cells);
  } else {
    const bell = style === "bell";
    const xs = side === "l" ? [16, 26.5, 37, 47.5, 58] : [120, 109.5, 99, 88.5, 78];
    const bars = xs
      .map((x, i) => {
        const y = bell ? 19 - i * 1.5 : 15.5 + i * 1.6;
        return `<rect x="${x}" y="${y}" width="4" height="${47 - y}" rx="2"/>`;
      })
      .join("");
    const rail = bell
      ? (side === "l" ? "M14 21 Q 48 10, 68 11.5" : "M126 21 Q 92 10, 72 11.5")
      : (side === "l" ? "M14 16 Q 44 12.5, 68 21" : "M126 16 Q 96 12.5, 72 21");
    const bottom = side === "l"
      ? '<rect x="13" y="44" width="56" height="5" rx="2.5"/>'
      : '<rect x="71" y="44" width="56" height="5" rx="2.5"/>';
    shapes = `
      <path d="${rail}" class="leaf-rail"/>
      ${bottom}
      ${bars}`;
  }
  return `
    <g class="leaf-${side}" style="transform:${transform || "none"}">
      <g class="leaf-line">${shapes}</g>
      <g class="leaf-fill">${shapes}</g>
      ${extra}
    </g>`;
}

function swingSvg(norm, cfg, lampOn) {
  const [tl, tr] = SWING_POSE[norm] || ["", ""];
  return `
    <svg viewBox="-28 0 196 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${cfg.light_entity && cfg.show_spot !== false ? LAMP_DEFS : ""}
      <line x1="-26" y1="58" x2="166" y2="58" class="gate-ground"/>
      ${SCENE_CLOSE}
      ${swingLeaf("l", tl, cfg)}
      ${swingLeaf("r", tr, cfg)}
      ${norm === "pedestrian" && cfg.show_runner !== false ? gateRunner(97, 32, 1.55) : ""}
      ${norm === "open" && cfg.show_car !== false ? gateCar(70, 33, 1.9) : ""}
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
      ${cfg.light_entity && cfg.show_spot !== false ? gateLight(cfg, lampOn) : ""}
    </svg>`;
}

// Door / wicket: a classic house entrance door -- solid narrow panel with two
// inset moldings and a knob, in a jamb-and-lintel frame. Display-only (no
// command buttons); the open pose folds the leaf back, the opening stays in
// the card background color (JD-approved v3).
const DOOR_POSE = {
  closed: "", unknown: "", unlocked: "",
  open: "scaleX(-0.72) skewY(10deg)",
  pedestrian: "scaleX(-0.72) skewY(10deg)",
  opening: "scaleX(0.4) skewY(8deg)",
  closing: "scaleX(0.4) skewY(8deg)",
  moving: "scaleX(0.4) skewY(8deg)",
};

function doorSvg(norm, cfg, lampOn) {
  const panel = '<rect x="54" y="11" width="32" height="46" rx="1.5"/>';
  const details = `
      <g class="door-detail">
        <rect x="59" y="17" width="22" height="15" rx="1.5"/>
        <rect x="59" y="37" width="22" height="15" rx="1.5"/>
      </g>
      <circle cx="81.5" cy="34" r="2.3" class="door-knob"/>`;
  const pose = DOOR_POSE[norm] || "";
  return `
    <svg viewBox="0 0 140 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${cfg.light_entity && cfg.show_spot !== false ? LAMP_DEFS : ""}
      <line x1="30" y1="58" x2="110" y2="58" class="gate-ground"/>
      <g class="gate-post-g">
        <rect x="48" y="9" width="5" height="49" rx="2"/>
        <rect x="87" y="9" width="5" height="49" rx="2"/>
        <rect x="46" y="4" width="48" height="6" rx="2"/>
      </g>
      <g class="door-leaf" style="transform:${pose || "none"}">
        <g class="leaf-line">${panel}</g>
        <g class="leaf-fill">${panel}</g>
        ${details}
      </g>
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
      ${cfg.light_entity && cfg.show_spot !== false ? gateLight(cfg, lampOn) : ""}
    </svg>`;
}

// Roller garage door: rounded box on top, side guides, ribbed horizontal
// slats and a finishing bar with a handle. Closed shows 5 slats, moving 2
// with a direction arrow, open just the bar under the box (JD-approved v2).
// Breeze blowing through the venting slot. Outline of the "weather-windy"
// glyph from Material Design Icons (Pictogrammers, pictogrammers.com), free to
// use; its three strokes are extended to the left by EXT so the draught reaches
// into the opening. Local box is 24 wide, the middle stroke sits at y = 13.
const BREEZE_EXT = 16;
const BREEZE_SCALE = 0.6;

function breezeShape(e) {
  return `<path d="M${4 - e},10A1,1 0 0,1 ${3 - e},9A1,1 0 0,1 ${4 - e},8H12A2,2 0 0,0 14,6A2,2 0 0,0 12,4C11.45,4 10.95,4.22 10.59,4.59C10.2,5 9.56,5 9.17,4.59C8.78,4.2 8.78,3.56 9.17,3.17C9.9,2.45 10.9,2 12,2A4,4 0 0,1 16,6A4,4 0 0,1 12,10H${4 - e}M19,12A1,1 0 0,0 20,11A1,1 0 0,0 19,10C18.72,10 18.47,10.11 18.29,10.29C17.9,10.68 17.27,10.68 16.88,10.29C16.5,9.9 16.5,9.27 16.88,8.88C17.42,8.34 18.17,8 19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14H${5 - e}A1,1 0 0,1 ${4 - e},13A1,1 0 0,1 ${5 - e},12H19M18,18H${4 - e}A1,1 0 0,1 ${3 - e},17A1,1 0 0,1 ${4 - e},16H18A3,3 0 0,1 21,19A3,3 0 0,1 18,22C17.17,22 16.42,21.66 15.88,21.12C15.5,20.73 15.5,20.1 15.88,19.71C16.27,19.32 16.9,19.32 17.29,19.71C17.47,19.89 17.72,20 18,20A1,1 0 0,0 19,19A1,1 0 0,0 18,18Z"/>`;
}

// (cx, cy) is the middle of the breeze: with the strokes extended the glyph
// spans (3 - EXT) to 22, so its own middle sits at (25 - EXT) / 2.
function gateBreeze(cx, cy) {
  const shape = breezeShape(BREEZE_EXT);
  return `
  <g transform="translate(${cx} ${cy}) scale(${BREEZE_SCALE}) translate(${-(25 - BREEZE_EXT) / 2} -13)">
    <g class="gate-breeze-halo">${shape}</g>
    <g class="gate-breeze">${shape}</g>
  </g>`;
}

// Cat walking through the floor gap, one continuous outline so the halo traces
// the silhouette instead of cutting it into pieces.
const CAT_SHAPES = `
    <path d="M4.4 7.6 Q1.2 7.0 1.8 2.2 L3.6 2.7 Q3.2 5.8 5.3 6.2
             Q7.2 4.6 11.0 4.6 Q13.8 4.6 15.0 5.4 L15.3 2.6 L17.1 4.9
             L18.7 4.7 L19.5 2.3 L20.3 5.2 Q21.7 6.2 21.1 8.0
             Q20.3 9.6 17.9 9.4 L16.7 9.2 L16.7 12.4 L14.9 12.4 L14.9 9.8
             L9.3 9.8 L9.3 12.4 L7.5 12.4 L7.5 9.4 Q5.1 9.1 4.4 7.6 Z"/>`;

function gateCat(cx, cy, s) {
  return `
  <g transform="translate(${cx - 11 * s} ${cy - 7.5 * s}) scale(${s})">
    <g class="gate-cat-halo">${CAT_SHAPES}</g>
    <g class="gate-cat">${CAT_SHAPES}</g>
  </g>`;
}


// Bracket-mounted spotlight on the post. The body and its beam share one
// rotated frame, computed from the anchor towards AIM, so the light always
// leaves the glass along the axis of the fitting -- turn the spot and the
// beam follows. AIM sits low on the leaf: a spot aimed at the middle of the
// gate reads as a floodlight, aimed at the foot it reads as a driveway light.
const LAMP_AIM = { x: 70, y: 46 };
const LAMP_REACH = 1.05;   // beam length, as a factor of the anchor-to-aim distance
const LAMP_SPREAD = 32;    // half-width of the beam at its far end (~56 degrees)
function lampAnchor(cfg) {
  const left = cfg.light_position === "left";
  if (cfg.gate_type === "garage") return { x: left ? 16 : 124, y: 13 };
  return { x: left ? 11 : 129, y: 15 };
}

// A door has no post to bolt a bracket onto: the luminaire is a flat box
// recessed in the lintel, and its beam falls straight down to the floor.
function doorLight(cfg, on) {
  const x = 70, y = 6.4;
  return `
    <g class="lamp${on ? " on" : ""}">
      ${on ? `<path class="lamp-cone-v" d="M${x - 4} ${y + 1.4} L${x + 4} ${y + 1.4} L${x + 19} 46 L${x - 19} 46 Z"/>` : ""}
      <rect class="lamp-body" x="${x - 5}" y="${y - 3.4}" width="10" height="4.2" rx="1.4"/>
      <line class="lamp-glass" x1="${x - 3.6}" y1="${y + 1.2}" x2="${x + 3.6}" y2="${y + 1.2}"/>
    </g>`;
}

function gateLight(cfg, on) {
  if (cfg.gate_type === "door") return doorLight(cfg, on);
  const p = lampAnchor(cfg);
  const a = (Math.atan2(LAMP_AIM.y - p.y, LAMP_AIM.x - p.x) * 180) / Math.PI;
  const reach = Math.hypot(LAMP_AIM.x - p.x, LAMP_AIM.y - p.y) * LAMP_REACH;
  return `
    <g class="lamp${on ? " on" : ""}" transform="translate(${p.x} ${p.y}) rotate(${a.toFixed(1)})">
      ${on ? `<path class="lamp-cone" d="M9.4 -3 L${reach.toFixed(1)} -32 L${reach.toFixed(1)} 32 L9.4 3 Z"/>` : ""}
      <line class="lamp-arm" x1="-2" y1="0" x2="4.2" y2="0"/>
      <path class="lamp-body" d="M3.8 -2.4 L9.4 -3.4 L9.4 3.4 L3.8 2.4 Z"/>
      <line class="lamp-glass" x1="9.6" y1="-3.2" x2="9.6" y2="3.2"/>
    </g>`;
}

const LAMP_DEFS = `
      <defs>
        <linearGradient id="lamp-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="var(--lamp-color)" stop-opacity=".5"/>
          <stop offset="100%" stop-color="var(--lamp-color)" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="lamp-beam-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--lamp-color)" stop-opacity=".5"/>
          <stop offset="100%" stop-color="var(--lamp-color)" stop-opacity="0"/>
        </linearGradient>
      </defs>`;

function garageSvg(norm, cfg, lampOn) {
  const closedLike = norm === "closed" || norm === "unknown" || norm === "unlocked";
  // Venting rolls one slat away and keeps the gap under the box; the part-open
  // position rolls two and lifts the whole curtain off the ground.
  const venting = norm === "vent";
  const partial = norm === "partial";
  const n = venting ? 4 : partial ? 3
    : closedLike ? 5 : (norm === "opening" || norm === "closing" || norm === "moving" ? 2 : 0);
  const y0 = venting ? 19 + 6.6 : 19;
  const barY = y0 + n * 6.6;
  let curtain = "";
  let ribs = "";
  for (let i = 0; i < n; i++) {
    const y = y0 + i * 6.6;
    curtain += `<rect class="slat" x="19" y="${y}" width="102" height="5" rx="1.6"/>`;
    ribs += `<line class="garage-rib" x1="19" y1="${y + 2.5}" x2="121" y2="${y + 2.5}"/>`;
  }
  const shapes = `
    <rect x="12" y="5" width="116" height="12" rx="4"/>
    <rect x="13" y="17" width="4" height="41" rx="2"/>
    <rect x="123" y="17" width="4" height="41" rx="2"/>
    ${curtain}
    <rect x="19" y="${barY}" width="102" height="4" rx="2"/>
    <rect x="63" y="${barY + 3.2}" width="14" height="2.6" rx="1.3"/>`;
  const arrow =
    norm === "opening" ? '<path class="garage-arrow" d="M70 52 L70 42 M65.5 46.5 L70 42 L74.5 46.5"/>' :
    norm === "closing" ? '<path class="garage-arrow" d="M70 42 L70 52 M65.5 47.5 L70 52 L74.5 47.5"/>' :
    norm === "moving" ? '<path class="garage-arrow" d="M70 41 L70 53 M66 44.5 L70 41 L74 44.5 M66 49.5 L70 53 L74 49.5"/>' : "";
  return `
    <svg viewBox="0 0 140 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${cfg.light_entity && cfg.show_spot !== false ? LAMP_DEFS : ""}
      <line x1="2" y1="58" x2="138" y2="58" class="gate-ground"/>
      <g class="leaf-line">${shapes}</g>
      <g class="leaf-fill">${shapes}</g>
      ${ribs}
      ${arrow}
      ${venting && cfg.show_breeze !== false ? gateBreeze(70, 21.3) : ""}
      ${partial && cfg.show_cat !== false ? gateCat(92, 50.6, 0.95) : ""}
      ${norm === "open" && cfg.show_car !== false ? gateCar(70, 41, 1.5) : ""}
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
      ${cfg.light_entity && cfg.show_spot !== false ? gateLight(cfg, lampOn) : ""}
    </svg>`;
}

function gateSvg(norm, cfg, lampOn) {
  if (cfg.gate_type === "swing") return swingSvg(norm, cfg, lampOn);
  if (cfg.gate_type === "door") return doorSvg(norm, cfg, lampOn);
  if (cfg.gate_type === "garage") return garageSvg(norm, cfg, lampOn);
  return slidingSvg(norm, cfg, lampOn);
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

class GateCard extends HTMLElement {
  static getStubConfig(hass) {
    const covers = Object.keys(hass.states).filter((e) => e.startsWith("cover."));
    const guess =
      covers.find((e) => {
        const st = hass.states[e];
        return (st.attributes.device_class === "gate") || /gate|portail|porton|cancello|tor\b/i.test(e);
      }) || covers[0];
    return { type: "custom:ha-gate-card", entity: guess || "" };
  }

  setConfig(config) {
    if (!config || (!config.entity && !config.open_entity && !config.close_entity && !config.state_entity)) {
      throw new Error("ha-gate-card: 'entity' (cover) is required (or open_entity/close_entity overrides)");
    }
    this._config = config;
    this._pending = null;
    this._signature = null;
    if (!this._root) {
      this.attachShadow({ mode: "open" });
      this._root = this.shadowRoot;
    }
  }

  getCardSize() {
    return 3;
  }

  static getConfigElement() {
    return document.createElement("ha-gate-card-editor");
  }

  set hass(hass) {
    this._hass = hass;
    this._render();
  }

  _clearPending() {
    clearTimeout(this._pendingTimer);
    this._pending = null;
  }

  _do(action) {
    const cfg = this._config;
    const override = cfg[action + "_entity"];
    if (override) {
      const domain = domainOf(override);
      if (domain === "button" || domain === "input_button") {
        this._hass.callService(domain, "press", { entity_id: override });
      } else if (domain === "script") {
        this._hass.callService("script", "turn_on", { entity_id: override });
      } else if (["switch", "input_boolean"].includes(domain)) {
        this._hass.callService(domain, "toggle", { entity_id: override });
      } else if (domain === "lock") {
        this._hass.callService("lock", action === "close" ? "lock" : "open", { entity_id: override });
      } else {
        this._hass.callService("homeassistant", "toggle", { entity_id: override });
      }
    } else if (domainOf(cfg.entity) === "lock") {
      // Locks (Nuki and friends): Open unlocks the bolt, Close locks it. The
      // physical unlatch (lock.open) stays opt-in via a lock set as open_entity.
      this._hass.callService("lock", action === "close" ? "lock" : "unlock", { entity_id: cfg.entity });
    } else {
      this._hass.callService("cover", action + "_cover", { entity_id: cfg.entity });
    }
  }

  _onAction(action) {
    // Toggling a light is harmless and instantly undone: it skips the
    // confirmation, which only guards the impulse commands.
    if (action === "light" || this._config.confirm === false) {
      this._do(action);
      return;
    }
    if (this._pending === action) {
      this._clearPending();
      this._do(action);
    } else {
      this._clearPending();
      this._pending = action;
      this._pendingTimer = setTimeout(() => {
        this._pending = null;
        this._signature = null;
        this._render();
      }, 4000);
    }
    this._signature = null;
    this._render();
  }

  _render() {
    const hass = this._hass;
    const cfg = this._config;
    if (!hass || !cfg) return;

    const stateEntity = cfg.state_entity || cfg.entity;
    const st = stateObj(hass, stateEntity);
    let norm = normalizeState(st ? st.state : null, cfg.state_map);
    // A physical door contact refines the stable states: closed contact turns
    // a lock-open state into "closed, unlocked"; an open contact over a locked
    // bolt is theoretically impossible -> unknown.
    if (cfg.contact_entity && hass.states[cfg.contact_entity] && ["open", "closed", "unlocked"].includes(norm)) {
      const rawContact = String(hass.states[cfg.contact_entity].state).trim().toLowerCase();
      const contactNorm = ["on", "true"].includes(rawContact) ? "open"
        : ["off", "false"].includes(rawContact) ? "closed"
        : normalizeState(rawContact, null);
      if (contactNorm === "open") norm = norm === "closed" ? "unknown" : "open";
      else if (contactNorm === "closed" && norm === "open") norm = "unlocked";
    }
    const color = STATE_COLORS[norm];
    let leafColor = color;
    let leafLine = color;
    if (cfg.gate_color && cfg.gate_color !== "state") {
      const gc = GATE_COLORS[cfg.gate_color];
      leafColor = gc ? gc.fill : cfg.gate_color;
      leafLine = gc ? gc.line : cfg.gate_color;
    }
    const moving = MOVING.includes(norm);
    const name = cfg.name || (st && st.attributes.friendly_name) || "Gate";
    const since = !moving && st ? formatSince(st.last_changed) : null;
    const lampState = cfg.light_entity && hass.states[cfg.light_entity];
    const lampOn = !!lampState && ["on", "playing", "home", "open"].includes(String(lampState.state).toLowerCase());
    const actions = actionsFor(norm, cfg);
    const dirClass = cfg.slide_direction === "right" ? " dir-r" : " dir-l";

    let batt = null;
    if (cfg.battery_entity && hass.states[cfg.battery_entity]) {
      const v = Number(hass.states[cfg.battery_entity].state);
      if (!Number.isNaN(v)) batt = Math.round(v);
    }
    const signature = JSON.stringify([norm, name, since, this._pending, lang(hass), cfg.compact, cfg.gate_type, cfg.gate_style, cfg.gate_color, cfg.slide_direction, !!cfg.pedestrian_entity, !!cfg.vent_entity, !!cfg.partial_entity, cfg.show_key, cfg.show_runner, cfg.show_car, cfg.show_breeze, cfg.show_cat, cfg.card_tap, cfg.show_state, batt, !!cfg.light_entity, cfg.show_spot, cfg.show_light_button, cfg.light_position, lampOn]);
    if (signature === this._signature) return;
    this._signature = signature;

    const buttons = actions
      .map((a) => {
        const pending = this._pending === a;
        const type = cfg.gate_type;
        const icon =
          a === "open" ? (type === "garage" ? "mdi:garage-open" : type === "door" ? "mdi:door-open" : "mdi:gate-open")
          : a === "close" ? (type === "garage" ? "mdi:garage" : type === "door" ? "mdi:door-closed" : "mdi:gate")
          : a === "unlock" ? "mdi:lock-open"
          : a === "light" ? (lampOn ? "mdi:lightbulb-on" : "mdi:lightbulb-outline")
          : a === "vent" ? "mdi:weather-windy"
          : a === "partial" ? "mdi:paw"
          : a === "pedestrian" ? "mdi:walk" : "mdi:stop";
        const label = pending ? t(hass, "confirm_tap") : t(hass, a + "_btn");
        return `<button data-action="${a}" class="${pending ? "pending" : ""}">
          <ha-icon icon="${pending ? "mdi:check-bold" : icon}"></ha-icon><span>${label}</span>
        </button>`;
      })
      .join("");

    this._root.innerHTML = `
      <style>
:host { --gate-color: ${color}; --leaf-color: ${leafColor}; --leaf-line: ${leafLine}; }
ha-card { position:relative; container-type:inline-size; display:flex; flex-direction:column; gap:12px; padding:16px; }
ha-card.compact { flex-direction:row; align-items:center; gap:16px; padding:8px 16px; }
ha-card.tappable { cursor:pointer; }
.illu { width:200px; max-width:70%; margin:0 auto; color:var(--leaf-color); }
.illu svg { display:block; width:100%; }
.gate-leaf, .leaf-l, .leaf-r { transition:transform .9s ease; }
.leaf-line rect { fill:var(--leaf-line); stroke:var(--leaf-line); stroke-width:3.2; stroke-linejoin:round; vector-effect:non-scaling-stroke; }
.leaf-line path { fill:var(--leaf-line); stroke:var(--leaf-line); stroke-width:3.2; stroke-linejoin:round; vector-effect:non-scaling-stroke; }
.leaf-fill path { fill:var(--leaf-color); }
.leaf-line .slat { stroke-width:2.2; }
.gate-hole { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
.leaf-line .leaf-rail { fill:none; stroke:var(--leaf-line); stroke-width:8.4; stroke-linecap:round; vector-effect:non-scaling-stroke; }
.leaf-fill rect { fill:var(--leaf-color); }
.leaf-fill .leaf-rail { fill:none; stroke:var(--leaf-color); stroke-width:5.6; stroke-linecap:round; vector-effect:non-scaling-stroke; }
.leaf-l, .leaf-r { transform-box:view-box; }
.leaf-l { transform-origin:13px 32px; }
.leaf-r { transform-origin:127px 32px; }
.moving.dir-l .gate-leaf { animation:gate-slide-l 1.8s ease-in-out infinite alternate; }
.moving.dir-r .gate-leaf { animation:gate-slide-r 1.8s ease-in-out infinite alternate; }
@keyframes gate-slide-l { from { transform:translateX(-44px); } to { transform:translateX(-54px); } }
@keyframes gate-slide-r { from { transform:translateX(44px); } to { transform:translateX(54px); } }
.moving .leaf-l { animation:swing-l 1.8s ease-in-out infinite alternate; }
.moving .leaf-r { animation:swing-r 1.8s ease-in-out infinite alternate; }
@keyframes swing-l { from { transform:scaleX(.55) skewY(5deg); } to { transform:scaleX(.15) skewY(9deg); } }
@keyframes swing-r { from { transform:scaleX(.55) skewY(-5deg); } to { transform:scaleX(.15) skewY(-9deg); } }
.gate-wheel { transform-box:fill-box; transform-origin:center; }
.gate-wheel circle { fill:var(--leaf-color); stroke:var(--leaf-line); stroke-width:1.6; vector-effect:non-scaling-stroke; }
.gate-wheel line { stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:1.6; }
.moving .gate-wheel { animation:wheel-spin 1.1s linear infinite; }
@keyframes wheel-spin { to { transform:rotate(360deg); } }
.door-leaf { transform-box:view-box; transform-origin:54px 34px; transition:transform .9s ease; }
.moving .door-leaf { animation:door-swing 1.8s ease-in-out infinite alternate; }
@keyframes door-swing { from { transform:scaleX(.55) skewY(6deg); } to { transform:scaleX(.15) skewY(10deg); } }
.door-detail rect { fill:none; stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:1.8; }
.door-knob { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
.garage-rib { stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:1.4; }
.garage-arrow { fill:none; stroke:var(--gate-color); stroke-width:2.6; stroke-linecap:round; stroke-linejoin:round; }
.moving .garage-arrow { animation:garage-bob 1.2s ease-in-out infinite alternate; }
@keyframes garage-bob { to { transform:translateY(-3px); } }
.gate-runner-halo { fill:none; stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:6.5; stroke-linecap:round; stroke-linejoin:round; }
.gate-runner-halo circle { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
.gate-runner { fill:none; stroke:var(--gate-color); stroke-width:2.6; stroke-linecap:round; stroke-linejoin:round; }
.gate-runner circle { fill:var(--gate-color); }
.gate-car-halo { fill:var(--ha-card-background, var(--card-background-color, #fff)); stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:3; stroke-linejoin:round; }
.gate-car { fill:var(--gate-color); }
.gate-car-hole { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
.gate-breeze-halo { fill:var(--ha-card-background, var(--card-background-color, #fff)); stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:2.4; stroke-linejoin:round; }
.gate-breeze { fill:var(--light-blue-color, #4fc3f7); }
.gate-cat-halo { fill:var(--ha-card-background, var(--card-background-color, #fff)); stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:2.2; stroke-linejoin:round; }
.gate-cat { fill:var(--gate-color); }
.gate-post-g { fill:var(--secondary-text-color); opacity:.75; }
:host { --lamp-color: var(--state-light-active-color, #ffca28); }
.lamp .lamp-body { fill:var(--secondary-text-color); opacity:.9; }
.lamp .lamp-arm { stroke:var(--secondary-text-color); stroke-width:1.6; stroke-linecap:round; opacity:.9; }
.lamp .lamp-glass { stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:2; stroke-linecap:round; }
.lamp.on .lamp-glass { stroke:var(--lamp-color); stroke-width:2.6; }
.lamp .lamp-cone { fill:url(#lamp-beam); }
.lamp .lamp-cone-v { fill:url(#lamp-beam-v); }
.gate-ground { stroke:var(--secondary-text-color); stroke-width:2; stroke-linecap:round; opacity:.5; }
.gate-key-halo { fill:var(--ha-card-background, var(--card-background-color, #fff)); stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:3; stroke-linejoin:round; }
.gate-key { fill:var(--success-color, #4caf50); }
.gate-key-hole { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
.gate-question { fill:var(--gate-color); font:700 20px sans-serif; text-anchor:middle; stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:4; paint-order:stroke; }
.badge { position:relative; flex:none; width:44px; height:44px; border-radius:50%; background:var(--gate-color); color:#fff; display:flex; align-items:center; justify-content:center; }
.badge ha-icon { --mdc-icon-size:26px; }
/* Compact mode has no illustration, so the lit spot shrinks to a pip on the
   badge: it hangs off the state circle instead of taking room in the layout,
   and it is drawn only while the light is on. */
.lamp-dot { position:absolute; right:-3px; bottom:-3px; width:19px; height:19px; border-radius:50%; background:var(--lamp-color); border:2px solid var(--ha-card-background, var(--card-background-color, #fff)); display:flex; align-items:center; justify-content:center; color:#3d2c00; }
.lamp-dot ha-icon { --mdc-icon-size:12px; }
.moving .badge { animation:gate-pulse 1.6s ease-in-out infinite; }
@keyframes gate-pulse { 50% { opacity:.55; } }
.bottom { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; }
ha-card.compact .bottom { flex:1; align-items:center; flex-wrap:wrap; }
.body { min-width:0; flex:1 1 100px; overflow-wrap:anywhere; }
ha-card.compact .name, ha-card.compact .state, ha-card.compact .since { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.name { font-size:15px; font-weight:500; color:var(--primary-text-color); }
.state { font-size:13.5px; font-weight:500; color:var(--gate-color); }
.since { font-size:12px; color:var(--secondary-text-color); }
.corner-batt { position:absolute; top:10px; right:12px; display:flex; align-items:center; gap:4px; font-size:12px; color:var(--secondary-text-color); z-index:2; }
.actions { display:flex; gap:8px; flex-wrap:wrap; justify-content:flex-end; }
button { display:flex; align-items:center; justify-content:center; gap:6px; padding:8px 14px; min-width:96px; max-width:100%; border:none; border-radius:12px; cursor:pointer; font:inherit; font-size:13px; background:var(--secondary-background-color); color:var(--primary-text-color); }
button:hover { filter:brightness(.93); }
button.pending { background:var(--gate-color); color:#fff; }
button ha-icon { --mdc-icon-size:18px; }
button span { overflow:hidden; text-overflow:ellipsis; }
@container (max-width: 290px) {
  /* Without this the full-width actions below cannot move to a second line:
     they stay beside the text, both columns shrink, and the name breaks one
     letter per line. Compact mode wraps already, illustration mode did not. */
  .bottom { flex-wrap:wrap; }
  .actions { width:100%; }
  button { min-width:0; flex:1 1 auto; }
}
button ha-icon[icon^="mdi:gate"] { position:relative; top:-1.1px; }
button ha-icon[icon="mdi:walk"] { position:relative; top:-1.7px; }
.badge ha-icon[icon^="mdi:gate"] { position:relative; top:-1.6px; }
.badge ha-icon[icon="mdi:walk"] { position:relative; top:-2.4px; }
      </style>
      <ha-card class="${moving ? "moving" : ""}${cfg.compact ? " compact" : ""}${dirClass}">
        ${batt !== null && !cfg.compact ? `<div class="corner-batt" title="${escapeHtml(cfg.battery_entity)} : ${batt}%">
          <svg width="26" height="15" viewBox="0 0 24 14">
            <rect x="1" y="2" width="19" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <rect x="21" y="5" width="2.4" height="4" rx="1" fill="currentColor"/>
            <rect x="3" y="4" width="${Math.max(0.8, (15 * Math.min(100, Math.max(0, batt))) / 100).toFixed(1)}" height="6" rx="1" fill="${batt <= 15 ? "var(--error-color, #f44336)" : batt <= 40 ? "var(--warning-color, #ff9800)" : "var(--success-color, #4caf50)"}"/>
          </svg>${batt}%</div>` : ""}
        ${cfg.compact
          ? `<div class="badge"><ha-icon icon="${stateIcon(norm, cfg)}"></ha-icon>${
              lampOn && cfg.light_entity && cfg.show_spot !== false
                ? `<span class="lamp-dot" title="${escapeHtml(cfg.light_entity)}"><ha-icon icon="mdi:lightbulb-on"></ha-icon></span>`
                : ""}</div>`
          : `<div class="illu">${gateSvg(norm, cfg, lampOn)}</div>`}
        <div class="bottom">
          <div class="body">
            <div class="name">${escapeHtml(name)}</div>
            ${cfg.show_state === false ? "" : `<div class="state">${t(hass, norm)}</div>`}
            ${since ? `<div class="since">${t(hass, "since")} ${since}</div>` : ""}
          </div>
          <div class="actions">${buttons}</div>
        </div>
      </ha-card>`;

    this._root.querySelectorAll("button[data-action]").forEach((b) => {
      b.addEventListener("click", (ev) => {
        ev.stopPropagation();
        this._onAction(b.dataset.action);
      });
    });
    if (cfg.card_tap && actions.length === 1) {
      const cardEl = this._root.querySelector("ha-card");
      cardEl.classList.add("tappable");
      cardEl.addEventListener("click", () => this._onAction(actions[0]));
    }
  }
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

const EDITOR_PICKERS = [
  { field: "entity", labelKey: "entity", domains: ["cover", "lock"] },
  { field: "state_entity", labelKey: "state_entity", domains: null },
  { field: "contact_entity", labelKey: "contact_entity", domains: ["binary_sensor", "sensor", "input_boolean"] },
  { field: "battery_entity", labelKey: "battery_entity", domains: ["sensor"] },
  { field: "light_entity", labelKey: "light_entity", domains: ["light", "switch", "input_boolean"] },
];
const EDITOR_OVERRIDES = [
  { field: "open_entity", labelKey: "open_entity" },
  { field: "close_entity", labelKey: "close_entity" },
  { field: "stop_entity", labelKey: "stop_entity" },
  { field: "pedestrian_entity", labelKey: "pedestrian_entity" },
  { field: "vent_entity", labelKey: "vent_entity" },
  { field: "partial_entity", labelKey: "partial_entity" },
];
const OVERRIDE_DOMAINS = ["button", "input_button", "script", "switch", "input_boolean", "lock"];

class GateCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = { ...config };
    this._maybeBuild();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (first) this._maybeBuild();
    else this._refreshPickersHass();
  }

  _maybeBuild() {
    if (!this._hass || !this._config || this._built) return;
    this._built = true;
    this._build();
  }

  _refreshPickersHass() {
    if (!this._root) return;
    this._root.querySelectorAll("ha-entity-picker").forEach((p) => {
      p.hass = this._hass;
    });
  }

  _emit() {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
  }

  _mountPicker(slotEl, field, domains) {
    const picker = document.createElement("ha-entity-picker");
    picker.hass = this._hass;
    picker.value = this._config[field] || "";
    picker.label = t(this._hass, field === "entity" ? "entity" : field);
    if (domains) picker.includeDomains = domains;
    picker.addEventListener("value-changed", (ev) => {
      const value = ev.detail.value;
      this._config = { ...this._config };
      if (value) this._config[field] = value;
      else delete this._config[field];
      this._emit();
    });
    slotEl.appendChild(picker);
  }

  _build() {
    if (!this._root) {
      this.attachShadow({ mode: "open" });
      this._root = this.shadowRoot;
    }
    const hass = this._hass;
    const cfg = this._config;
    this._root.innerHTML = `
      <style>
.form { display:flex; flex-direction:column; gap:14px; padding:4px 0; }
.row label { display:block; font-size:13px; margin-bottom:4px; color:var(--secondary-text-color); }
.row input[type="text"], .row select { width:100%; box-sizing:border-box; padding:8px; border-radius:6px; border:1px solid var(--divider-color); background:var(--card-background-color); color:var(--primary-text-color); font:inherit; }
.row-inline label { display:flex; align-items:center; gap:8px; font-size:13.5px; color:var(--primary-text-color); }
details { border:1px solid var(--divider-color); border-radius:8px; padding:8px 12px; }
summary { cursor:pointer; font-size:13.5px; color:var(--secondary-text-color); }
details .form { padding-top:10px; }
      </style>
      <div class="form">
        <div class="row" data-picker="entity"></div>
        <div class="row" data-picker="state_entity"></div>
        <div class="row" data-picker="contact_entity"></div>
        <div class="row" data-picker="battery_entity"></div>
        <div class="row" data-picker="light_entity"></div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_spot" ${cfg.show_spot !== false ? "checked" : ""}/> ${t(hass, "show_spot")}</label>
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_light_button" ${cfg.show_light_button !== false ? "checked" : ""}/> ${t(hass, "show_light_button")}</label>
        </div>
        ${cfg.gate_type === "door" ? "" : `
        <div class="row">
          <label>${t(hass, "light_position")}</label>
          <select data-field="light_position">
            <option value="right" ${cfg.light_position !== "left" ? "selected" : ""}>${t(hass, "light_pos_right")}</option>
            <option value="left" ${cfg.light_position === "left" ? "selected" : ""}>${t(hass, "light_pos_left")}</option>
          </select>
        </div>`}
        <div class="row">
          <label>${t(hass, "gate_type")}</label>
          <select data-field="gate_type">
            ${[["sliding", "type_sliding"], ["swing", "type_swing"], ["door", "type_door"], ["garage", "type_garage"]]
              .map(([v, k]) => `<option value="${v}" ${(cfg.gate_type || "sliding") === v ? "selected" : ""}>${t(hass, k)}</option>`)
              .join("")}
          </select>
        </div>
        ${["door", "garage"].includes(cfg.gate_type) ? "" : `
        <div class="row">
          <label>${t(hass, "gate_style")}</label>
          <select data-field="gate_style">
            ${(cfg.gate_type === "swing"
              ? [["bell", "style_bell"], ["bars", "style_bars_swing"], ["slats", "style_slats"], ["semi", "style_semi"], ["solid", "style_solid"]]
              : [["slats", "style_slats"], ["bars", "style_bars_sliding"], ["semi", "style_semi"], ["solid", "style_solid"]])
              .map(([v, k]) => `<option value="${v}" ${normStyle(cfg, cfg.gate_type === "swing" ? "swing" : "sliding") === v ? "selected" : ""}>${t(hass, k)}</option>`)
              .join("")}
          </select>
        </div>`}
        ${(cfg.gate_type || "sliding") === "sliding" ? `
        <div class="row">
          <label>${t(hass, "slide_direction")}</label>
          <select data-field="slide_direction">
            <option value="left" ${cfg.slide_direction !== "right" ? "selected" : ""}>${t(hass, "dir_left")}</option>
            <option value="right" ${cfg.slide_direction === "right" ? "selected" : ""}>${t(hass, "dir_right")}</option>
          </select>
        </div>` : ""}
        <div class="row">
          <label>${t(hass, "gate_color")}</label>
          <select data-field="gate_color">
            ${["state", "white", "gray", "anthracite", "black", "green", "burgundy", "blue", "brown"]
              .map((c) => `<option value="${c}" ${(cfg.gate_color || "state") === c ? "selected" : ""}>${t(hass, "color_" + c)}</option>`)
              .join("")}
          </select>
        </div>
        <div class="row">
          <label>${t(hass, "name")}</label>
          <input type="text" data-field="name" value="${escapeHtml(cfg.name || "")}" />
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="compact" ${cfg.compact ? "checked" : ""}/> ${t(hass, "compact")}</label>
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="confirm" ${cfg.confirm !== false ? "checked" : ""}/> ${t(hass, "confirm_opt")}</label>
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_stop" ${cfg.show_stop ? "checked" : ""}/> ${t(hass, "show_stop")}</label>
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_key" ${cfg.show_key !== false ? "checked" : ""}/> ${t(hass, "show_key")}</label>
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_state" ${cfg.show_state !== false ? "checked" : ""}/> ${t(hass, "show_state")}</label>
        </div>
        ${["door", "garage"].includes(cfg.gate_type) ? "" : `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_runner" ${cfg.show_runner !== false ? "checked" : ""}/> ${t(hass, "show_runner")}</label>
        </div>`}
        ${cfg.gate_type === "door" ? "" : `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_car" ${cfg.show_car !== false ? "checked" : ""}/> ${t(hass, "show_car")}</label>
        </div>
        ${cfg.gate_type !== "garage" ? "" : `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_breeze" ${cfg.show_breeze !== false ? "checked" : ""}/> ${t(hass, "show_breeze")}</label>
        </div>
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_cat" ${cfg.show_cat !== false ? "checked" : ""}/> ${t(hass, "show_cat")}</label>
        </div>`}`}
        <div class="row row-inline">
          <label><input type="checkbox" data-field="card_tap" ${cfg.card_tap ? "checked" : ""}/> ${t(hass, "card_tap")}</label>
        </div>
        <details ${EDITOR_OVERRIDES.some((o) => cfg[o.field]) ? "open" : ""}>
          <summary>${t(hass, "section_advanced")}</summary>
          <div class="form">
            ${EDITOR_OVERRIDES
              .filter((o) => {
                // Pedestrian pass is for sliding/swing, the two part-open
                // positions only make sense on a garage door.
                if (o.field === "pedestrian_entity") return !["door", "garage"].includes(cfg.gate_type);
                if (o.field === "vent_entity" || o.field === "partial_entity") return cfg.gate_type === "garage";
                return true;
              })
              .map((o) => `<div class="row" data-picker="${o.field}"></div>`).join("")}
          </div>
        </details>
      </div>`;

    for (const { field, domains } of EDITOR_PICKERS) {
      this._mountPicker(this._root.querySelector(`[data-picker="${field}"]`), field, domains);
    }
    for (const { field } of EDITOR_OVERRIDES) {
      const slot = this._root.querySelector(`[data-picker="${field}"]`);
      if (slot) this._mountPicker(slot, field, OVERRIDE_DOMAINS);
    }

    this._root.querySelector('select[data-field="gate_type"]').addEventListener("change", (ev) => {
      this._config = { ...this._config };
      // sliding is the default -- only store the key when it differs
      if (ev.target.value === "sliding") delete this._config.gate_type;
      else this._config.gate_type = ev.target.value;
      this._emit();
      // rebuild so the style rows match the selected type
      this._built = false;
      this._maybeBuild();
    });
    const styleSel = this._root.querySelector('select[data-field="gate_style"]');
    if (styleSel) styleSel.addEventListener("change", (ev) => {
      this._config = { ...this._config };
      // the per-type default -- only store the key when it differs
      const defStyle = this._config.gate_type === "swing" ? "bell" : "slats";
      if (ev.target.value === defStyle) delete this._config.gate_style;
      else this._config.gate_style = ev.target.value;
      this._emit();
    });
    const posSel = this._root.querySelector('select[data-field="light_position"]');
    if (posSel) posSel.addEventListener("change", (ev) => {
      this._config = { ...this._config };
      // right is the default -- only store the key when it differs
      if (ev.target.value === "left") this._config.light_position = "left";
      else delete this._config.light_position;
      this._emit();
    });
    const dirSel = this._root.querySelector('select[data-field="slide_direction"]');
    if (dirSel) dirSel.addEventListener("change", (ev) => {
      this._config = { ...this._config };
      // left is the default -- only store the key when it differs
      if (ev.target.value === "right") this._config.slide_direction = "right";
      else delete this._config.slide_direction;
      this._emit();
    });
    this._root.querySelector('select[data-field="gate_color"]').addEventListener("change", (ev) => {
      this._config = { ...this._config };
      // state-colored is the default -- only store the key when it differs
      if (ev.target.value !== "state") this._config.gate_color = ev.target.value;
      else delete this._config.gate_color;
      this._emit();
    });
    this._root.querySelector('input[data-field="name"]').addEventListener("change", (ev) => {
      this._config = { ...this._config };
      if (ev.target.value) this._config.name = ev.target.value;
      else delete this._config.name;
      this._emit();
    });
    this._root.querySelectorAll('input[type="checkbox"][data-field]').forEach((cb) => {
      cb.addEventListener("change", () => {
        const field = cb.dataset.field;
        this._config = { ...this._config };
        if (["confirm", "show_key", "show_runner", "show_car", "show_breeze", "show_cat", "show_spot", "show_light_button", "show_state"].includes(field)) {
          // defaults to true -- only store the key when disabled
          if (cb.checked) delete this._config[field];
          else this._config[field] = false;
        } else if (cb.checked) {
          this._config[field] = true;
        } else {
          delete this._config[field];
        }
        this._emit();
      });
    });
  }
}

// ---------------------------------------------------------------------------

customElements.define("ha-gate-card", GateCard);
customElements.define("ha-gate-card-editor", GateCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-gate-card",
  name: "HA Gate Card",
  description: "Gate / portal card: consolidated real state, per-state colors and safe contextual commands.",
  preview: true,
  documentationURL: "https://github.com/ADNPolymerase/ha-gate-card",
});
