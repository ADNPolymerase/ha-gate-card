const CARD_VERSION = "0.9.1";

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
    open_btn: "Open", close_btn: "Close", stop_btn: "Stop", confirm_tap: "Confirm?",
    entity: "Gate cover entity (required)",
    state_entity: "Consolidated state entity (optional)",
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
    show_key: "Show the key symbol when closed", show_runner: "Show the pedestrian pictogram",
  },
  fr: {
    closed: "Ferm\u00e9", open: "Ouvert",
    opening: "Ouverture en cours\u2026", closing: "Fermeture en cours\u2026",
    unknown: "\u00c9tat inconnu", since: "depuis",
    pedestrian: "Pi\u00e9ton", moving: "En mouvement\u2026",
    open_btn: "Ouvrir", close_btn: "Fermer", stop_btn: "Stop", confirm_tap: "Confirmer ?",
    entity: "Entit\u00e9 cover du portail (obligatoire)",
    state_entity: "Entit\u00e9 d'\u00e9tat consolid\u00e9 (optionnel)",
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
    show_key: "Afficher la cl\u00e9 quand c'est ferm\u00e9", show_runner: "Afficher le pictogramme pi\u00e9ton",
  },
  ru: {
    closed: "\u0417\u0430\u043a\u0440\u044b\u0442\u043e", open: "\u041e\u0442\u043a\u0440\u044b\u0442\u043e", opening: "\u041e\u0442\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f\u2026", closing: "\u0417\u0430\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f\u2026",
    unknown: "\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u043e\u0435 \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u0435", since: "\u0441",
    pedestrian: "\u041f\u0435\u0448\u0435\u0445\u043e\u0434\u043d\u044b\u0439 \u043f\u0440\u043e\u0445\u043e\u0434", moving: "\u0412 \u0434\u0432\u0438\u0436\u0435\u043d\u0438\u0438\u2026",
    open_btn: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c", close_btn: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c", stop_btn: "\u0421\u0442\u043e\u043f", confirm_tap: "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044c?",
    entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c cover \u0432\u043e\u0440\u043e\u0442 (\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
    state_entity: "\u0421\u0443\u0449\u043d\u043e\u0441\u0442\u044c \u0441\u0432\u043e\u0434\u043d\u043e\u0433\u043e \u0441\u043e\u0441\u0442\u043e\u044f\u043d\u0438\u044f (\u043d\u0435\u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e)",
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
    show_key: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043a\u043b\u044e\u0447, \u043a\u043e\u0433\u0434\u0430 \u0437\u0430\u043a\u0440\u044b\u0442\u043e", show_runner: "\u041f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0442\u044c \u043f\u0438\u043a\u0442\u043e\u0433\u0440\u0430\u043c\u043c\u0443 \u043f\u0435\u0448\u0435\u0445\u043e\u0434\u0430",
  },
  de: {
    closed: "Geschlossen", open: "Offen", opening: "\u00d6ffnet\u2026", closing: "Schlie\u00dft\u2026",
    unknown: "Unbekannter Zustand", since: "seit",
    pedestrian: "Personendurchgang", moving: "In Bewegung\u2026",
    open_btn: "\u00d6ffnen", close_btn: "Schlie\u00dfen", stop_btn: "Stopp", confirm_tap: "Best\u00e4tigen?",
    entity: "Tor-Cover-Entit\u00e4t (erforderlich)",
    state_entity: "Konsolidierte Status-Entit\u00e4t (optional)",
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
    show_key: "Schl\u00fcsselsymbol anzeigen, wenn geschlossen", show_runner: "Fu\u00dfg\u00e4nger-Piktogramm anzeigen",
  },
  es: {
    closed: "Cerrado", open: "Abierto", opening: "Abriendo\u2026", closing: "Cerrando\u2026",
    unknown: "Estado desconocido", since: "desde",
    pedestrian: "Peatonal", moving: "En movimiento\u2026",
    open_btn: "Abrir", close_btn: "Cerrar", stop_btn: "Parar", confirm_tap: "\u00bfConfirmar?",
    entity: "Entidad cover del port\u00f3n (obligatoria)",
    state_entity: "Entidad de estado consolidado (opcional)",
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
    show_key: "Mostrar la llave cuando est\u00e1 cerrado", show_runner: "Mostrar el pictograma peatonal",
  },
  it: {
    closed: "Chiuso", open: "Aperto", opening: "Apertura\u2026", closing: "Chiusura\u2026",
    unknown: "Stato sconosciuto", since: "dalle",
    pedestrian: "Pedonale", moving: "In movimento\u2026",
    open_btn: "Apri", close_btn: "Chiudi", stop_btn: "Stop", confirm_tap: "Confermare?",
    entity: "Entit\u00e0 cover del cancello (obbligatoria)",
    state_entity: "Entit\u00e0 di stato consolidato (opzionale)",
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
    show_key: "Mostra la chiave quando \u00e8 chiuso", show_runner: "Mostra il pittogramma pedonale",
  },
  nl: {
    closed: "Gesloten", open: "Open", opening: "Opent\u2026", closing: "Sluit\u2026",
    unknown: "Onbekende status", since: "sinds",
    pedestrian: "Voetgangersstand", moving: "In beweging\u2026",
    open_btn: "Openen", close_btn: "Sluiten", stop_btn: "Stop", confirm_tap: "Bevestigen?",
    entity: "Poort cover-entiteit (verplicht)",
    state_entity: "Geconsolideerde status-entiteit (optioneel)",
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
    show_key: "Sleutel tonen wanneer gesloten", show_runner: "Voetgangerspictogram tonen",
  },
  pt: {
    closed: "Fechado", open: "Aberto", opening: "A abrir\u2026", closing: "A fechar\u2026",
    unknown: "Estado desconhecido", since: "desde",
    pedestrian: "Pedonal", moving: "Em movimento\u2026",
    open_btn: "Abrir", close_btn: "Fechar", stop_btn: "Parar", confirm_tap: "Confirmar?",
    entity: "Entidade cover do port\u00e3o (obrigat\u00f3ria)",
    state_entity: "Entidade de estado consolidado (opcional)",
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
    show_key: "Mostrar a chave quando fechado", show_runner: "Mostrar o pictograma pedonal",
  },
  sv: {
    closed: "St\u00e4ngd", open: "\u00d6ppen", opening: "\u00d6ppnar\u2026", closing: "St\u00e4nger\u2026",
    unknown: "Ok\u00e4nt l\u00e4ge", since: "sedan",
    pedestrian: "G\u00e5ngpassage", moving: "I r\u00f6relse\u2026",
    open_btn: "\u00d6ppna", close_btn: "St\u00e4ng", stop_btn: "Stopp", confirm_tap: "Bekr\u00e4fta?",
    entity: "Grindens cover-entitet (obligatorisk)",
    state_entity: "Konsoliderad status-entitet (valfri)",
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
    show_key: "Visa nyckeln n\u00e4r st\u00e4ngd", show_runner: "Visa g\u00e5ngpiktogrammet",
  },
  no: {
    closed: "Lukket", open: "\u00c5pen", opening: "\u00c5pner\u2026", closing: "Lukker\u2026",
    unknown: "Ukjent tilstand", since: "siden",
    pedestrian: "Gangpassasje", moving: "I bevegelse\u2026",
    open_btn: "\u00c5pne", close_btn: "Lukk", stop_btn: "Stopp", confirm_tap: "Bekreft?",
    entity: "Portens cover-entitet (p\u00e5krevd)",
    state_entity: "Konsolidert status-entitet (valgfri)",
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
    show_key: "Vis n\u00f8kkelen n\u00e5r lukket", show_runner: "Vis gangpiktogrammet",
  },
  da: {
    closed: "Lukket", open: "\u00c5ben", opening: "\u00c5bner\u2026", closing: "Lukker\u2026",
    unknown: "Ukendt tilstand", since: "siden",
    pedestrian: "Gangpassage", moving: "I bev\u00e6gelse\u2026",
    open_btn: "\u00c5bn", close_btn: "Luk", stop_btn: "Stop", confirm_tap: "Bekr\u00e6ft?",
    entity: "Portens cover-entitet (p\u00e5kr\u00e6vet)",
    state_entity: "Konsolideret status-entitet (valgfri)",
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
    show_key: "Vis n\u00f8glen n\u00e5r lukket", show_runner: "Vis gangpiktogrammet",
  },
  pl: {
    closed: "Zamkni\u0119ta", open: "Otwarta", opening: "Otwieranie\u2026", closing: "Zamykanie\u2026",
    unknown: "Stan nieznany", since: "od",
    pedestrian: "Furtka", moving: "W ruchu\u2026",
    open_btn: "Otw\u00f3rz", close_btn: "Zamknij", stop_btn: "Stop", confirm_tap: "Potwierdzi\u0107?",
    entity: "Encja cover bramy (wymagana)",
    state_entity: "Encja stanu skonsolidowanego (opcjonalna)",
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
    show_key: "Poka\u017c klucz, gdy zamkni\u0119ta", show_runner: "Poka\u017c piktogram pieszego",
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
  opening: ["opening", "ouverture", "offnet", "abriendo", "apertura", "opent", "abrindo", "a abrir", "oppnar", "apner", "abner", "otwieranie"],
  closing: ["closing", "fermeture", "schliesst", "cerrando", "chiusura", "sluit", "fechando", "a fechar", "stanger", "lukker", "zamykanie"],
  pedestrian: ["pieton", "pedestrian", "peaton", "pedonal", "voetganger", "fussgang", "durchgang", "gangpass", "ganglage", "gangport", "furtka"],
  moving: ["moving", "mouvement", "in motion", "bewegung", "movimiento", "movimento", "beweging", "rorelse", "bevegelse", "bevaegelse", "bev\u00e6gelse", "ruch"],
  closed: ["closed", "ferme", "geschlossen", "cerrado", "chiuso", "gesloten", "fechado", "stangd", "lukket", "zamkni"],
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

function normalizeState(raw, stateMap) {
  if (raw === undefined || raw === null) return "unknown";
  const s = String(raw).trim();
  if (["unknown", "unavailable", "none", "inconnu", ""].includes(s.toLowerCase())) return "unknown";
  if (stateMap && Object.prototype.hasOwnProperty.call(stateMap, s)) return stateMap[s];
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
  unknown: "var(--error-color, #f44336)",
};

const STATE_ICONS = {
  closed: "mdi:gate",
  open: "mdi:gate-open",
  opening: "mdi:gate-arrow-right",
  closing: "mdi:gate-arrow-left",
  moving: "mdi:gate-arrow-right",
  pedestrian: "mdi:walk",
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

const MOVING = ["opening", "closing", "moving"];

// Which buttons make sense for each state. While the gate is moving no
// command is shown by default: on impulse-driven gates (RF remotes, AirSend,
// dry-contact motors) an extra impulse stops or reverses the leaf, so an
// accidental tap mid-travel is exactly what we want to avoid. `show_stop`
// opts back in for motors with a real, dedicated stop channel.
function actionsFor(norm, cfg) {
  // Doors (wickets) are display-only: JD-approved v0.9 behavior.
  if (cfg.gate_type === "door") return [];
  const stop = cfg.show_stop ? ["stop"] : [];
  // Pedestrian pass only exists on sliding and swing gates.
  const ped = cfg.pedestrian_entity && cfg.gate_type !== "garage";
  switch (norm) {
    case "closed": return ped ? ["pedestrian", "open"] : ["open"];
    case "open": return ["close"];
    case "pedestrian": return ["close"];
    case "opening":
    case "closing":
    case "moving": return stop;
    default: return ["open", "close"];
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

function slidingSvg(norm, cfg) {
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
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
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

function swingSvg(norm, cfg) {
  const [tl, tr] = SWING_POSE[norm] || ["", ""];
  return `
    <svg viewBox="-28 0 196 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="-26" y1="58" x2="166" y2="58" class="gate-ground"/>
      ${SCENE_CLOSE}
      ${swingLeaf("l", tl, cfg)}
      ${swingLeaf("r", tr, cfg)}
      ${norm === "pedestrian" && cfg.show_runner !== false ? gateRunner(97, 32, 1.55) : ""}
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
    </svg>`;
}

// Door / wicket: a classic house entrance door -- solid narrow panel with two
// inset moldings and a knob, in a jamb-and-lintel frame. Display-only (no
// command buttons); the open pose folds the leaf back, the opening stays in
// the card background color (JD-approved v3).
const DOOR_POSE = {
  closed: "", unknown: "",
  open: "scaleX(-0.72) skewY(10deg)",
  pedestrian: "scaleX(-0.72) skewY(10deg)",
  opening: "scaleX(0.4) skewY(8deg)",
  closing: "scaleX(0.4) skewY(8deg)",
  moving: "scaleX(0.4) skewY(8deg)",
};

function doorSvg(norm, cfg) {
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
    </svg>`;
}

// Roller garage door: rounded box on top, side guides, ribbed horizontal
// slats and a finishing bar with a handle. Closed shows 5 slats, moving 2
// with a direction arrow, open just the bar under the box (JD-approved v2).
function garageSvg(norm, cfg) {
  const closedLike = norm === "closed" || norm === "unknown";
  const n = closedLike ? 5 : (norm === "opening" || norm === "closing" || norm === "moving" ? 2 : 0);
  const barY = 19 + n * 6.6;
  let curtain = "";
  let ribs = "";
  for (let i = 0; i < n; i++) {
    const y = 19 + i * 6.6;
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
      <line x1="2" y1="58" x2="138" y2="58" class="gate-ground"/>
      <g class="leaf-line">${shapes}</g>
      <g class="leaf-fill">${shapes}</g>
      ${ribs}
      ${arrow}
      ${norm === "closed" && cfg.show_key !== false ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
    </svg>`;
}

function gateSvg(norm, cfg) {
  if (cfg.gate_type === "swing") return swingSvg(norm, cfg);
  if (cfg.gate_type === "door") return doorSvg(norm, cfg);
  if (cfg.gate_type === "garage") return garageSvg(norm, cfg);
  return slidingSvg(norm, cfg);
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
      } else {
        this._hass.callService("homeassistant", "toggle", { entity_id: override });
      }
    } else {
      this._hass.callService("cover", action + "_cover", { entity_id: cfg.entity });
    }
  }

  _onAction(action) {
    if (this._config.confirm === false) {
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
    const norm = normalizeState(st ? st.state : null, cfg.state_map);
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
    const actions = actionsFor(norm, cfg);
    const dirClass = cfg.slide_direction === "right" ? " dir-r" : " dir-l";

    const signature = JSON.stringify([norm, name, since, this._pending, lang(hass), cfg.compact, cfg.gate_type, cfg.gate_style, cfg.gate_color, cfg.slide_direction, !!cfg.pedestrian_entity, cfg.show_key, cfg.show_runner]);
    if (signature === this._signature) return;
    this._signature = signature;

    const buttons = actions
      .map((a) => {
        const pending = this._pending === a;
        const icon = a === "open" ? "mdi:gate-open" : a === "close" ? "mdi:gate" : a === "pedestrian" ? "mdi:walk" : "mdi:stop";
        const label = pending ? t(hass, "confirm_tap") : t(hass, a + "_btn");
        return `<button data-action="${a}" class="${pending ? "pending" : ""}">
          <ha-icon icon="${pending ? "mdi:check-bold" : icon}"></ha-icon><span>${label}</span>
        </button>`;
      })
      .join("");

    this._root.innerHTML = `
      <style>
:host { --gate-color: ${color}; --leaf-color: ${leafColor}; --leaf-line: ${leafLine}; }
ha-card { display:flex; flex-direction:column; gap:12px; padding:16px; }
ha-card.compact { flex-direction:row; align-items:center; gap:16px; }
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
.gate-post-g { fill:var(--secondary-text-color); opacity:.75; }
.gate-ground { stroke:var(--secondary-text-color); stroke-width:2; stroke-linecap:round; opacity:.5; }
.gate-key-halo { fill:var(--ha-card-background, var(--card-background-color, #fff)); stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:3; stroke-linejoin:round; }
.gate-key { fill:var(--success-color, #4caf50); }
.gate-key-hole { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
.gate-question { fill:var(--gate-color); font:700 20px sans-serif; text-anchor:middle; stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:4; paint-order:stroke; }
.badge { flex:none; width:44px; height:44px; border-radius:50%; background:var(--gate-color); color:#fff; display:flex; align-items:center; justify-content:center; }
.badge ha-icon { --mdc-icon-size:26px; }
.moving .badge { animation:gate-pulse 1.6s ease-in-out infinite; }
@keyframes gate-pulse { 50% { opacity:.55; } }
.bottom { display:flex; align-items:flex-end; justify-content:space-between; gap:12px; }
ha-card.compact .bottom { flex:1; align-items:center; }
.body { min-width:0; }
.name { font-size:15px; font-weight:500; color:var(--primary-text-color); }
.state { font-size:13.5px; font-weight:500; color:var(--gate-color); }
.since { font-size:12px; color:var(--secondary-text-color); }
.actions { display:flex; gap:8px; }
button { display:flex; align-items:center; justify-content:center; gap:6px; padding:8px 14px; min-width:96px; border:none; border-radius:12px; cursor:pointer; font:inherit; font-size:13px; background:var(--secondary-background-color); color:var(--primary-text-color); }
button:hover { filter:brightness(.93); }
button.pending { background:var(--gate-color); color:#fff; }
button ha-icon { --mdc-icon-size:18px; }
      </style>
      <ha-card class="${moving ? "moving" : ""}${cfg.compact ? " compact" : ""}${dirClass}">
        ${cfg.compact
          ? `<div class="badge"><ha-icon icon="${STATE_ICONS[norm]}"></ha-icon></div>`
          : `<div class="illu">${gateSvg(norm, cfg)}</div>`}
        <div class="bottom">
          <div class="body">
            <div class="name">${name}</div>
            <div class="state">${t(hass, norm)}</div>
            ${since ? `<div class="since">${t(hass, "since")} ${since}</div>` : ""}
          </div>
          <div class="actions">${buttons}</div>
        </div>
      </ha-card>`;

    this._root.querySelectorAll("button[data-action]").forEach((b) => {
      b.addEventListener("click", () => this._onAction(b.dataset.action));
    });
  }
}

// ---------------------------------------------------------------------------
// Editor
// ---------------------------------------------------------------------------

const EDITOR_PICKERS = [
  { field: "entity", labelKey: "entity", domains: ["cover"] },
  { field: "state_entity", labelKey: "state_entity", domains: null },
];
const EDITOR_OVERRIDES = [
  { field: "open_entity", labelKey: "open_entity" },
  { field: "close_entity", labelKey: "close_entity" },
  { field: "stop_entity", labelKey: "stop_entity" },
  { field: "pedestrian_entity", labelKey: "pedestrian_entity" },
];
const OVERRIDE_DOMAINS = ["button", "input_button", "script", "switch", "input_boolean"];

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
          <input type="text" data-field="name" value="${cfg.name || ""}" />
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
        ${["door", "garage"].includes(cfg.gate_type) ? "" : `
        <div class="row row-inline">
          <label><input type="checkbox" data-field="show_runner" ${cfg.show_runner !== false ? "checked" : ""}/> ${t(hass, "show_runner")}</label>
        </div>`}
        <details ${EDITOR_OVERRIDES.some((o) => cfg[o.field]) ? "open" : ""}>
          <summary>${t(hass, "section_advanced")}</summary>
          <div class="form">
            ${EDITOR_OVERRIDES
              .filter((o) => o.field !== "pedestrian_entity" || !["door", "garage"].includes(cfg.gate_type))
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
        if (["confirm", "show_key", "show_runner"].includes(field)) {
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
