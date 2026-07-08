const CARD_VERSION = "0.6.0";

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
    open_btn: "Open", close_btn: "Close", stop_btn: "Stop", confirm_tap: "Confirm?",
    entity: "Gate cover entity (required)",
    state_entity: "Consolidated state entity (optional)",
    name: "Name", compact: "Compact mode (icon instead of illustration)",
    confirm_opt: "Ask for confirmation before commands (tap twice)",
    show_stop: "Show a Stop button while moving",
    gate_type: "Gate type", type_sliding: "Sliding", type_swing: "Swing (two leaves)",
    gate_color: "Gate color", color_state: "Follow the state (default)",
    color_white: "White", color_gray: "Light gray", color_anthracite: "Anthracite",
    color_black: "Black", color_green: "Fir green", color_burgundy: "Burgundy",
    color_blue: "Steel blue", color_brown: "Brown",
    section_advanced: "Command overrides (buttons / scripts)",
    open_entity: "Open command entity",
    close_entity: "Close command entity",
    stop_entity: "Stop command entity",
  },
  fr: {
    closed: "Ferm\u00e9", open: "Ouvert", opening: "Ouverture en cours\u2026", closing: "Fermeture en cours\u2026",
    unknown: "\u00c9tat inconnu", since: "depuis",
    open_btn: "Ouvrir", close_btn: "Fermer", stop_btn: "Stop", confirm_tap: "Confirmer ?",
    entity: "Entit\u00e9 cover du portail (obligatoire)",
    state_entity: "Entit\u00e9 d'\u00e9tat consolid\u00e9 (optionnel)",
    name: "Nom", compact: "Mode compact (ic\u00f4ne au lieu de l'illustration)",
    confirm_opt: "Demander confirmation avant les commandes (double appui)",
    show_stop: "Afficher un bouton Stop pendant le mouvement",
    gate_type: "Type de portail", type_sliding: "Coulissant", type_swing: "\u00c0 battants",
    gate_color: "Couleur du portail", color_state: "Selon l'\u00e9tat (d\u00e9faut)",
    color_white: "Blanc", color_gray: "Gris clair", color_anthracite: "Anthracite",
    color_black: "Noir", color_green: "Vert sapin", color_burgundy: "Bordeaux",
    color_blue: "Bleu acier", color_brown: "Marron",
    section_advanced: "Commandes personnalis\u00e9es (boutons / scripts)",
    open_entity: "Entit\u00e9 commande Ouvrir",
    close_entity: "Entit\u00e9 commande Fermer",
    stop_entity: "Entit\u00e9 commande Stop",
  },
  de: {
    closed: "Geschlossen", open: "Offen", opening: "\u00d6ffnet\u2026", closing: "Schlie\u00dft\u2026",
    unknown: "Unbekannter Zustand", since: "seit",
    open_btn: "\u00d6ffnen", close_btn: "Schlie\u00dfen", stop_btn: "Stopp", confirm_tap: "Best\u00e4tigen?",
    entity: "Tor-Cover-Entit\u00e4t (erforderlich)",
    state_entity: "Konsolidierte Status-Entit\u00e4t (optional)",
    name: "Name", compact: "Kompaktmodus (Symbol statt Illustration)",
    confirm_opt: "Vor Befehlen best\u00e4tigen (zweimal tippen)",
    show_stop: "Stopp-Taste w\u00e4hrend der Bewegung anzeigen",
    gate_type: "Tortyp", type_sliding: "Schiebetor", type_swing: "Fl\u00fcgeltor",
    gate_color: "Torfarbe", color_state: "Dem Zustand folgen (Standard)",
    color_white: "Wei\u00df", color_gray: "Hellgrau", color_anthracite: "Anthrazit",
    color_black: "Schwarz", color_green: "Tannengr\u00fcn", color_burgundy: "Bordeauxrot",
    color_blue: "Stahlblau", color_brown: "Braun",
    section_advanced: "Befehls-Overrides (Buttons / Skripte)",
    open_entity: "Entit\u00e4t Befehl \u00d6ffnen",
    close_entity: "Entit\u00e4t Befehl Schlie\u00dfen",
    stop_entity: "Entit\u00e4t Befehl Stopp",
  },
  es: {
    closed: "Cerrado", open: "Abierto", opening: "Abriendo\u2026", closing: "Cerrando\u2026",
    unknown: "Estado desconocido", since: "desde",
    open_btn: "Abrir", close_btn: "Cerrar", stop_btn: "Parar", confirm_tap: "\u00bfConfirmar?",
    entity: "Entidad cover del port\u00f3n (obligatoria)",
    state_entity: "Entidad de estado consolidado (opcional)",
    name: "Nombre", compact: "Modo compacto (icono en lugar de ilustraci\u00f3n)",
    confirm_opt: "Pedir confirmaci\u00f3n antes de los comandos (doble toque)",
    show_stop: "Mostrar bot\u00f3n Parar durante el movimiento",
    gate_type: "Tipo de port\u00f3n", type_sliding: "Corredero", type_swing: "Batiente",
    gate_color: "Color del port\u00f3n", color_state: "Seg\u00fan el estado (predeterminado)",
    color_white: "Blanco", color_gray: "Gris claro", color_anthracite: "Antracita",
    color_black: "Negro", color_green: "Verde abeto", color_burgundy: "Burdeos",
    color_blue: "Azul acero", color_brown: "Marr\u00f3n",
    section_advanced: "Comandos personalizados (botones / scripts)",
    open_entity: "Entidad comando Abrir",
    close_entity: "Entidad comando Cerrar",
    stop_entity: "Entidad comando Parar",
  },
  it: {
    closed: "Chiuso", open: "Aperto", opening: "Apertura\u2026", closing: "Chiusura\u2026",
    unknown: "Stato sconosciuto", since: "dalle",
    open_btn: "Apri", close_btn: "Chiudi", stop_btn: "Stop", confirm_tap: "Confermare?",
    entity: "Entit\u00e0 cover del cancello (obbligatoria)",
    state_entity: "Entit\u00e0 di stato consolidato (opzionale)",
    name: "Nome", compact: "Modalit\u00e0 compatta (icona invece dell'illustrazione)",
    confirm_opt: "Chiedere conferma prima dei comandi (doppio tocco)",
    show_stop: "Mostra il pulsante Stop durante il movimento",
    gate_type: "Tipo di cancello", type_sliding: "Scorrevole", type_swing: "A battente",
    gate_color: "Colore del cancello", color_state: "Segue lo stato (predefinito)",
    color_white: "Bianco", color_gray: "Grigio chiaro", color_anthracite: "Antracite",
    color_black: "Nero", color_green: "Verde abete", color_burgundy: "Bordeaux",
    color_blue: "Blu acciaio", color_brown: "Marrone",
    section_advanced: "Comandi personalizzati (pulsanti / script)",
    open_entity: "Entit\u00e0 comando Apri",
    close_entity: "Entit\u00e0 comando Chiudi",
    stop_entity: "Entit\u00e0 comando Stop",
  },
  nl: {
    closed: "Gesloten", open: "Open", opening: "Opent\u2026", closing: "Sluit\u2026",
    unknown: "Onbekende status", since: "sinds",
    open_btn: "Openen", close_btn: "Sluiten", stop_btn: "Stop", confirm_tap: "Bevestigen?",
    entity: "Poort cover-entiteit (verplicht)",
    state_entity: "Geconsolideerde status-entiteit (optioneel)",
    name: "Naam", compact: "Compacte modus (pictogram i.p.v. illustratie)",
    confirm_opt: "Bevestiging vragen v\u00f3\u00f3r commando's (twee keer tikken)",
    show_stop: "Stopknop tonen tijdens beweging",
    gate_type: "Poorttype", type_sliding: "Schuifpoort", type_swing: "Draaipoort",
    gate_color: "Poortkleur", color_state: "Volgt de status (standaard)",
    color_white: "Wit", color_gray: "Lichtgrijs", color_anthracite: "Antraciet",
    color_black: "Zwart", color_green: "Dennengroen", color_burgundy: "Bordeaux",
    color_blue: "Staalblauw", color_brown: "Bruin",
    section_advanced: "Commando-overrides (knoppen / scripts)",
    open_entity: "Entiteit commando Openen",
    close_entity: "Entiteit commando Sluiten",
    stop_entity: "Entiteit commando Stop",
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
// the cover itself, template sensors...). Order matters: "opening"/"ouverture"
// must be tested before "open"/"ouvert" (prefix collisions), same for
// "closing"/"fermeture" before "closed"/"ferme".
// ---------------------------------------------------------------------------

const STATE_KEYWORDS = {
  opening: ["opening", "ouverture", "offnet", "abriendo", "apertura", "opent", "abrindo"],
  closing: ["closing", "fermeture", "schliesst", "cerrando", "chiusura", "sluit", "fechando"],
  closed: ["closed", "ferme", "geschlossen", "cerrado", "chiuso", "gesloten", "fechado"],
  open: ["open", "ouvert", "offen", "abierto", "aperto", "aberto"],
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
  unknown: "var(--error-color, #f44336)",
};

const STATE_ICONS = {
  closed: "mdi:gate",
  open: "mdi:gate-open",
  opening: "mdi:gate-arrow-right",
  closing: "mdi:gate-arrow-left",
  unknown: "mdi:gate-alert",
};

// Classic gate colors (RAL-inspired) for the fixed-color mode. When
// `gate_color` is set, the illustration keeps this color and only the
// state line stays state-colored.
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

const MOVING = ["opening", "closing"];

// Which buttons make sense for each state. While the gate is moving no
// command is shown by default: on impulse-driven gates (RF remotes, AirSend,
// dry-contact motors) an extra impulse stops or reverses the leaf, so an
// accidental tap mid-travel is exactly what we want to avoid. `show_stop`
// opts back in for motors with a real, dedicated stop channel.
function actionsFor(norm, cfg) {
  const stop = cfg.show_stop ? ["stop"] : [];
  switch (norm) {
    case "closed": return ["open"];
    case "open": return ["close"];
    case "opening":
    case "closing": return stop;
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
// Illustrations -- a gate between two capped posts, drawn in the state color.
// Two variants: "sliding" (single leaf on a rail, wheels spin while moving)
// and "swing" (two leaves pivoting on hinges, faked perspective when open).
// ---------------------------------------------------------------------------

const SCENE_OPEN = `
  <line x1="2" y1="58" x2="138" y2="58" class="gate-ground"/>`;
const SCENE_CLOSE = `
  <g class="gate-post-g">
    <rect x="2" y="10" width="9" height="48" rx="2"/>
    <rect x="0" y="6" width="13" height="6" rx="2"/>
    <rect x="129" y="10" width="9" height="48" rx="2"/>
    <rect x="127" y="6" width="13" height="6" rx="2"/>
  </g>`;

const SLIDE_X = { closed: 0, open: -98, opening: -49, closing: -49, unknown: 0 };

function slidingSvg(norm) {
  const bars = [18, 31.5, 45, 58.5, 72, 85.5, 99, 112.5]
    .map((x) => `<rect x="${x}" y="18" width="4" height="27" rx="2"/>`)
    .join("");
  // Same two-pass trick as the key: the outline layer is a merged
  // silhouette under the fill layer, so light gate colors get an outline
  // around the whole leaf without lines between bars and rails.
  const shapes = `
    <rect x="14" y="14" width="112" height="5" rx="2.5"/>
    <rect x="14" y="41" width="112" height="5" rx="2.5"/>
    ${bars}`;
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
      ${SCENE_OPEN}
      <g clip-path="url(#gate-clip)">
        <g class="gate-leaf" style="transform:translateX(${SLIDE_X[norm] || 0}px)">
          <g class="leaf-line">${shapes}</g>
          <g class="leaf-fill">${shapes}</g>
          ${wheel(40)}
          ${wheel(100)}
        </g>
      </g>
      ${SCENE_CLOSE}
      ${norm === "closed" ? GATE_KEY : ""}
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
  unknown: ["", ""],
};

// Key overlay shown while closed (same spirit as the "?" for unknown):
// a vertical green key -- bow on top, notched blade pointing down. The
// card-background halo is drawn once as a merged silhouette UNDER the key,
// so it only appears between the key and the gate, never inside the key.
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

function swingLeaf(side, transform) {
  // Bars get slightly shorter toward the middle of the gate, following the
  // gently sloping top rail -- the classic double-leaf silhouette.
  const xs = side === "l" ? [16, 26.5, 37, 47.5, 58] : [120, 109.5, 99, 88.5, 78];
  const bars = xs
    .map((x, i) => {
      const y = 15.5 + i * 1.6;
      return `<rect x="${x}" y="${y}" width="4" height="${47 - y}" rx="2"/>`;
    })
    .join("");
  const rail = side === "l" ? "M14 16 Q 44 12.5, 68 21" : "M126 16 Q 96 12.5, 72 21";
  const bottom = side === "l"
    ? '<rect x="13" y="44" width="56" height="5" rx="2.5"/>'
    : '<rect x="71" y="44" width="56" height="5" rx="2.5"/>';
  const shapes = `
      <path d="${rail}" class="leaf-rail"/>
      ${bottom}
      ${bars}`;
  return `
    <g class="leaf-${side}" style="transform:${transform || "none"}">
      <g class="leaf-line">${shapes}</g>
      <g class="leaf-fill">${shapes}</g>
    </g>`;
}

function swingSvg(norm) {
  const [tl, tr] = SWING_POSE[norm] || ["", ""];
  return `
    <svg viewBox="-28 0 196 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="-26" y1="58" x2="166" y2="58" class="gate-ground"/>
      ${SCENE_CLOSE}
      ${swingLeaf("l", tl)}
      ${swingLeaf("r", tr)}
      ${norm === "closed" ? GATE_KEY : ""}
      ${norm === "unknown" ? '<text x="70" y="38" class="gate-question">?</text>' : ""}
    </svg>`;
}

function gateSvg(norm, cfg) {
  return cfg.gate_type === "swing" ? swingSvg(norm) : slidingSvg(norm);
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
    if (!config || (!config.entity && !config.open_entity && !config.close_entity)) {
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
    // Fixed gate color: named palette entry, or any raw CSS color the user
    // typed in YAML. Absent / "state" = illustration follows the state.
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

    const signature = JSON.stringify([norm, name, since, this._pending, lang(hass), cfg.compact, cfg.gate_type, cfg.gate_color]);
    if (signature === this._signature) return;
    this._signature = signature;

    const buttons = actions
      .map((a) => {
        const pending = this._pending === a;
        const icon = a === "open" ? "mdi:gate-open" : a === "close" ? "mdi:gate" : "mdi:stop";
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
        .illu { width:190px; max-width:65%; margin:0 auto; color:var(--leaf-color); }
        .illu svg { display:block; width:100%; }
        .gate-leaf, .leaf-l, .leaf-r { transition:transform .9s ease; }
        .leaf-line rect { fill:var(--leaf-line); stroke:var(--leaf-line); stroke-width:3.2;
          stroke-linejoin:round; vector-effect:non-scaling-stroke; }
        .leaf-line .leaf-rail { fill:none; stroke:var(--leaf-line); stroke-width:8.2;
          stroke-linecap:round; vector-effect:non-scaling-stroke; }
        .leaf-fill rect { fill:var(--leaf-color); }
        .leaf-fill .leaf-rail { fill:none; stroke:var(--leaf-color); stroke-width:5;
          stroke-linecap:round; vector-effect:non-scaling-stroke; }
        .leaf-l, .leaf-r { transform-box:view-box; }
        .leaf-l { transform-origin:13px 32px; }
        .leaf-r { transform-origin:127px 32px; }
        .moving .gate-leaf { animation:gate-slide 1.8s ease-in-out infinite alternate; }
        @keyframes gate-slide { from { transform:translateX(-44px); } to { transform:translateX(-54px); } }
        .moving .leaf-l { animation:swing-l 1.8s ease-in-out infinite alternate; }
        .moving .leaf-r { animation:swing-r 1.8s ease-in-out infinite alternate; }
        @keyframes swing-l { from { transform:scaleX(.55) skewY(5deg); } to { transform:scaleX(.15) skewY(9deg); } }
        @keyframes swing-r { from { transform:scaleX(.55) skewY(-5deg); } to { transform:scaleX(.15) skewY(-9deg); } }
        .gate-wheel { transform-box:fill-box; transform-origin:center; }
        .gate-wheel circle { fill:var(--leaf-color); stroke:var(--leaf-line); stroke-width:1.6;
          vector-effect:non-scaling-stroke; }
        .gate-wheel line { stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:1.6; }
        .moving .gate-wheel { animation:wheel-spin 1.1s linear infinite; }
        @keyframes wheel-spin { to { transform:rotate(360deg); } }
        .gate-post-g { fill:var(--secondary-text-color); opacity:.75; }
        .gate-ground { stroke:var(--secondary-text-color); stroke-width:2; stroke-linecap:round; opacity:.5; }
        .gate-key-halo { fill:var(--ha-card-background, var(--card-background-color, #fff));
          stroke:var(--ha-card-background, var(--card-background-color, #fff));
          stroke-width:3; stroke-linejoin:round; }
        .gate-key { fill:var(--success-color, #4caf50); }
        .gate-key-hole { fill:var(--ha-card-background, var(--card-background-color, #fff)); }
        .gate-question { fill:var(--gate-color); font:700 20px sans-serif; text-anchor:middle;
          stroke:var(--ha-card-background, var(--card-background-color, #fff)); stroke-width:4; paint-order:stroke; }
        .badge { flex:none; width:44px; height:44px; border-radius:50%; background:var(--gate-color);
                 color:#fff; display:flex; align-items:center; justify-content:center; }
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
        button { display:flex; align-items:center; justify-content:center; gap:6px; padding:8px 14px;
                 min-width:96px; border:none; border-radius:12px; cursor:pointer; font:inherit;
                 font-size:13px; background:var(--secondary-background-color);
                 color:var(--primary-text-color); }
        button:hover { filter:brightness(.93); }
        button.pending { background:var(--gate-color); color:#fff; }
        button ha-icon { --mdc-icon-size:18px; }
      </style>
      <ha-card class="${moving ? "moving" : ""}${cfg.compact ? " compact" : ""}">
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
        .row input[type="text"], .row select { width:100%; box-sizing:border-box; padding:8px; border-radius:6px;
          border:1px solid var(--divider-color); background:var(--card-background-color);
          color:var(--primary-text-color); font:inherit; }
        .row-inline label { display:flex; align-items:center; gap:8px; font-size:13.5px;
          color:var(--primary-text-color); }
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
            <option value="sliding" ${cfg.gate_type !== "swing" ? "selected" : ""}>${t(hass, "type_sliding")}</option>
            <option value="swing" ${cfg.gate_type === "swing" ? "selected" : ""}>${t(hass, "type_swing")}</option>
          </select>
        </div>
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
        <details ${EDITOR_OVERRIDES.some((o) => cfg[o.field]) ? "open" : ""}>
          <summary>${t(hass, "section_advanced")}</summary>
          <div class="form">
            ${EDITOR_OVERRIDES.map((o) => `<div class="row" data-picker="${o.field}"></div>`).join("")}
          </div>
        </details>
      </div>`;

    for (const { field, domains } of EDITOR_PICKERS) {
      this._mountPicker(this._root.querySelector(`[data-picker="${field}"]`), field, domains);
    }
    for (const { field } of EDITOR_OVERRIDES) {
      this._mountPicker(this._root.querySelector(`[data-picker="${field}"]`), field, OVERRIDE_DOMAINS);
    }

    this._root.querySelector('select[data-field="gate_type"]').addEventListener("change", (ev) => {
      this._config = { ...this._config };
      // sliding is the default -- only store the key when it differs
      if (ev.target.value === "swing") this._config.gate_type = "swing";
      else delete this._config.gate_type;
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
        if (field === "confirm") {
          // confirm defaults to true -- only store it when disabled
          if (cb.checked) delete this._config.confirm;
          else this._config.confirm = false;
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
