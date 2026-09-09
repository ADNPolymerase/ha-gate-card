/**
 * ha-gate-card — behaviour tests.  Run with:  node test/run.mjs
 *
 * Deliberately small: this card has almost no arithmetic. The only real logic
 * is the raw-state → normalized state table (label + color), which separates
 * the command entity (cover) from the displayed state — so that is what gets
 * covered, plus the two silent failure modes: an editor whose config-changed
 * carries no detail.config, and a render crash on unavailable entities.
 */
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadCard, markup, check, contains, report } from './harness.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const registry = await loadCard(join(HERE, '..', 'dist', 'ha-gate-card.js'));
const Card   = registry.get('ha-gate-card');
const Editor = registry.get('ha-gate-card-editor');

/** Markup of a card whose state entity reports `st`. */
function makeCard(st, cfg = {}) {
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
  c.hass = {
    language: 'en',
    states: st === undefined ? {} : {
      'cover.portail': { state: st, attributes: {}, last_changed: '2026-08-12T10:00:00Z' },
    },
    callService() {},
  };
  return markup(c);
}

const label = html => (String(html).match(/<div class="state">([^<]*)</) || [])[1];
const color = html => (String(html).match(/--gate-color: ([^;]*);/) || [])[1];

// ── Editor contract ──────────────────────────────────────────────────────────
// CustomEvent.detail is a readonly accessor: assigning it after construction
// silently drops the payload and every edit made in the editor is discarded.

const ed = new Editor();
ed.setConfig({ entity: 'cover.portail' });
ed._emit();
const ev = ed.events.at(-1);
check("l'éditeur émet config-changed", ev?.type, 'config-changed');
check('config-changed porte bien detail.config',
  ev?.detail?.config?.entity, 'cover.portail');

// HA calls setConfig again after every config-changed the editor emits. If
// that echo rebuilt the form, freshly created ha-entity-picker could fire an
// empty value-changed and silently erase a configured entity (the
// ha-dosing-tank-card v0.7.2 bug). The form must be built exactly once:
// a sentinel written over the DOM has to survive the echo.

const ed2 = new Editor();
ed2.setConfig({ entity: 'cover.portail', state_entity: 'sensor.etat' });
ed2.hass = { language: 'en', states: {} };          // first build
ed2._root.innerHTML = 'SENTINELLE';
ed2.setConfig({ entity: 'cover.portail', state_entity: 'sensor.etat' });  // écho HA
check("l'écho setConfig ne reconstruit pas le formulaire (pickers préservés)",
  markup(ed2), 'SENTINELLE');

// ── State table: raw state → color + label ───────────────────────────────────

check('closed → vert',        color(makeCard('closed')), 'var(--success-color, #4caf50)');
check('closed → libellé',     label(makeCard('closed')), 'Closed');
check('open → orange',        color(makeCard('open')),   'var(--warning-color, #ff9800)');
check('opening → bleu',       color(makeCard('opening')), 'var(--info-color, #2196f3)');
check('« Fermé » accentué → vert (normalisation)',
  color(makeCard('Fermé')), 'var(--success-color, #4caf50)');
check('unlocked → orange, dessiné fermé',
  color(makeCard('unlocked')), 'var(--warning-color, #ff9800)');
check('unlocked → libellé',   label(makeCard('unlocked')), 'Unlocked');
check('state_map prioritaire sur les mots-clés',
  label(makeCard('n33', { state_map: { n33: 'pedestrian' } })), 'Pedestrian pass');
check('état inconnu → rouge', color(makeCard('blorp')), 'var(--error-color, #f44336)');
check('état inconnu → libellé', label(makeCard('blorp')), 'Unknown state');

// ── Escaping ─────────────────────────────────────────────────────────────────
// friendly_name is device-supplied freeform text: it must never reach
// innerHTML (or an attribute) unescaped.

const evil = makeCard('closed', { name: 'Portail "<script>alert(1)</script>"' });
contains('nom échappé dans le markup', evil, '&quot;&lt;script&gt;');
check("nom : rien d'injecté", /<script>alert/.test(evil), false);

check('state_map vers une valeur inconnue → couleur inconnu (pas undefined)',
  color(makeCard('weird', { state_map: { weird: 'blorp' } })),
  'var(--error-color, #f44336)');

// ── Garage part-open positions ───────────────────────────────────────────────
// Keyword order matters: "Ouverture partielle" contains "ouverture", the
// keyword for `opening`, so `partial` has to be matched first.

check('« Ouverture partielle » → partiel, pas ouverture en cours',
  label(makeCard('Ouverture partielle', { gate_type: 'garage' })), 'Part-open');
check('« Ouverture en cours » reste une ouverture',
  label(makeCard('Ouverture en cours', { gate_type: 'garage' })), 'Opening\u2026');
check('« ventilation » → aération',
  label(makeCard('ventilation', { gate_type: 'garage' })), 'Venting');
check('aération → orange', color(makeCard('aeration', { gate_type: 'garage' })),
  'var(--warning-color, #ff9800)');

const btns = (st, cfg) => {
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', gate_type: 'garage', ...cfg }));
  c.hass = { language: 'en',
    states: { 'cover.portail': { state: st, attributes: {}, last_changed: '2026-09-09T10:00:00Z' } },
    callService() {} };
  return [...String(markup(c)).matchAll(/data-action="([^"]+)"/g)].map(m => m[1]).join(',');
};

check('fermé + les 2 options → Aérer, Partiel, Ouvrir',
  btns('closed', { vent_entity: 's.a', partial_entity: 's.b' }), 'vent,partial,open');
check('fermé + aération seule', btns('closed', { vent_entity: 's.a' }), 'vent,open');
check('fermé + partiel seul', btns('closed', { partial_entity: 's.b' }), 'partial,open');
check('fermé sans option → inchangé', btns('closed', {}), 'open');
check('en aération → Fermer seul', btns('aeration', { vent_entity: 's.a' }), 'close');
check('en ouverture partielle → Fermer seul', btns('partial', { partial_entity: 's.b' }), 'close');
check('les options ne font rien hors garage',
  btns('closed', { gate_type: 'sliding', vent_entity: 's.a', partial_entity: 's.b' }), 'open');

// The stylesheet always carries the .gate-breeze / .gate-cat rules, so look for
// the class attribute on a drawn node, not for the bare name.
const drawn = (html, cls) => new RegExp('class="' + cls + '"').test(String(html));

check('brise dessinée en aération',
  drawn(makeCard('aeration', { gate_type: 'garage' }), 'gate-breeze'), true);
check('show_breeze:false masque la brise',
  drawn(makeCard('aeration', { gate_type: 'garage', show_breeze: false }), 'gate-breeze'), false);
check('chat dessiné en ouverture partielle',
  drawn(makeCard('partial', { gate_type: 'garage' }), 'gate-cat'), true);
check('show_cat:false masque le chat',
  drawn(makeCard('partial', { gate_type: 'garage', show_cat: false }), 'gate-cat'), false);
check('pas de brise quand le garage est simplement fermé',
  drawn(makeCard('closed', { gate_type: 'garage' }), 'gate-breeze'), false);

// ── Unavailable / missing entities must render, not throw ────────────────────

check('cover unavailable → état inconnu, pas de crash',
  label(makeCard('unavailable')), 'Unknown state');
check('entité absente de hass → état inconnu, pas de crash',
  label(makeCard(undefined)), 'Unknown state');
contains('state_entity configurée mais absente → rend quand même',
  makeCard('open', { state_entity: 'sensor.fantome' }), '<div class="state">');

// -- Light / spotlight -------------------------------------------------------
// The luminaire and its button hang on the same key: configuring light_entity
// turns both on, show_spot turns both off. The button is deliberately kept
// while the gate moves -- switching a light on cannot reverse a leaf.

const lit = (cfg, lamp, st = 'closed') => {
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
  c.hass = { language: 'en',
    states: { 'cover.portail': { state: st, attributes: {}, last_changed: '2026-09-09T10:00:00Z' },
      ...(lamp === undefined ? {} : { 'light.spot': { state: lamp ? 'on' : 'off', attributes: {} } }) },
    callService() {} };
  return String(markup(c));
};
const actions = html => [...html.matchAll(/data-action="([^"]+)"/g)].map(m => m[1]).join(',');
const spot = html => /class="lamp( on)?"/.test(html);
const LE = { light_entity: 'light.spot' };

check('light_entity -> spot dessine', spot(lit(LE, true)), true);
check('light_entity -> bouton Lumiere', actions(lit(LE, true)), 'light,open');
check('lampe allumee -> groupe .lamp.on', /class="lamp on"/.test(lit(LE, true)), true);
check('lampe eteinte -> spot dessine sans halo', /class="lamp"/.test(lit(LE, false)), true);
check('show_spot:false masque le spot ET le bouton',
  spot(lit({ ...LE, show_spot: false }, true)) + '|' + actions(lit({ ...LE, show_spot: false }, true)),
  'false|open');
check('sans light_entity : ni spot ni bouton',
  spot(lit({}, undefined)) + '|' + actions(lit({}, undefined)), 'false|open');
check('le bouton Lumiere reste pendant le mouvement',
  actions(lit(LE, true, 'opening')), 'light');
check('porte : faisceau vertical du linteau, pas de spot sur potence',
  /class="lamp-cone-v"/.test(lit({ ...LE, gate_type: 'door' }, true)), true);
check('light_position deplace le spot a gauche',
  /translate\(11 15\)/.test(lit({ ...LE, light_position: 'left' }, true)), true);


// Lovelace deep-freezes the stored card config before handing it to
// setConfig, and the file is a module (strict mode): writing a scratch value
// back onto it throws and the card vanishes from the dashboard. Every factory
// above freezes its config; this states the rule outright.

check('un config gele ne fait pas planter le rendu (Lovelace le gele)',
  label(makeCard('closed', { light_entity: 'light.spot' })), 'Closed');

report();
