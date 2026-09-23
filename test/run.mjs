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
check('show_light_button:false garde le spot, retire le bouton',
  spot(lit({ ...LE, show_light_button: false }, true)) + '|' + actions(lit({ ...LE, show_light_button: false }, true)),
  'true|open');
check('spot visible sans bouton : la lampe allumee se voit quand meme',
  /class="lamp on"/.test(lit({ ...LE, show_light_button: false }, true)), true);
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

// The card skips its render when a signature of the displayed values is
// unchanged. Anything the markup depends on has to be in that signature, or
// the card freezes on screen while the state moves underneath it. Every other
// test above builds a fresh card, so only a second hass update catches this.

const relit = () => {
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', light_entity: 'light.spot' }));
  const hassAt = on => ({ language: 'en',
    states: { 'cover.portail': { state: 'closed', attributes: {}, last_changed: '2026-09-09T10:00:00Z' },
      'light.spot': { state: on ? 'on' : 'off', attributes: {} } },
    callService() {} });
  c.hass = hassAt(false);
  const off = String(markup(c));
  c.hass = hassAt(true);
  return [off, String(markup(c))];
};
const [darkCard, litCard] = relit();
check('la lampe eteinte ne dessine pas de faisceau', /class="lamp"/.test(darkCard), true);
check('allumer la lampe redessine la card (etat dans la signature de rendu)',
  /class="lamp on"/.test(litCard), true);

// -- Compact mode: the lit spot becomes a pip on the badge -------------------
// Compact drops the illustration, so the only place left to say "the light is
// on" is the state circle. It is drawn from the same key as the spot
// (show_spot), never from the button key, and never while the light is off.

const pip = html => /class="lamp-dot"/.test(html);

check('compact + lampe allumee -> pastille sur la pastille',
  pip(lit({ ...LE, compact: true }, true)), true);
check('compact + lampe eteinte -> pas de pastille',
  pip(lit({ ...LE, compact: true }, false)), false);
check('compact sans light_entity -> pas de pastille',
  pip(lit({ compact: true }, undefined)), false);
check('show_spot:false retire aussi la pastille compacte',
  pip(lit({ ...LE, compact: true, show_spot: false }, true)), false);
check('show_light_button:false garde la pastille (elle n est pas le bouton)',
  pip(lit({ ...LE, compact: true, show_light_button: false }, true)), true);
check('hors compact : pas de pastille, c est le faisceau qui parle',
  pip(lit({ ...LE }, true)), false);

// -- Narrow cards and the written state --------------------------------------
// Below 290px the buttons go full width; without a wrapping .bottom they stay
// beside the text and the name breaks one letter per line (Freeman59, phone
// dashboard in two columns, 176px per card).

contains('les cartes etroites autorisent le retour a la ligne',
  makeCard('closed'), '.bottom { flex-wrap:wrap; }');

check("l'etat en toutes lettres est la par defaut",
  label(makeCard('closed')), 'Closed');
check('show_state:false retire la ligne d etat',
  /<div class="state">/.test(makeCard('closed', { show_state: false })), false);
contains('show_state:false garde le nom',
  makeCard('closed', { show_state: false, name: 'Portail' }), '<div class="name">Portail</div>');
contains("show_state:false garde l'heure, c est tout l interet",
  makeCard('closed', { show_state: false }), '<div class="since">');

// The corner battery overlaps the centred illustration on any card narrower
// than about 364px, so below 380px it leaves the corner for a line of its own.

contains('la batterie quitte le coin sur les cartes etroites',
  makeCard('closed', { battery_entity: 'sensor.b' }),
  '.corner-batt { position:static; align-self:flex-end;');

// -- card_tap without its button ----------------------------------------------
// When the whole card runs the single command the button is redundant for some
// dashboards, kept by default for readability. It must come back while a
// confirmation is pending, or the first tap gives no feedback at all.

const tapCard = (cfg) => {
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
  c.hass = { language: 'en',
    states: { 'cover.portail': { state: 'closed', attributes: {}, last_changed: '2026-09-14T10:00:00Z' } },
    callService() {} };
  return c;
};
const hasButton = c => /data-action="open"/.test(String(markup(c)));

check('card_tap seul : le bouton reste (defaut)', hasButton(tapCard({ card_tap: true })), true);
check('card_tap + show_tap_button:false : plus de bouton',
  hasButton(tapCard({ card_tap: true, show_tap_button: false })), false);
check('show_tap_button:false sans card_tap : le bouton reste, sinon plus de commande',
  hasButton(tapCard({ show_tap_button: false })), true);
const pendingCard = tapCard({ card_tap: true, show_tap_button: false });
pendingCard._onAction('open');
check('confirmation en attente : le bouton revient pour dire Confirmer',
  /class="pending"/.test(String(markup(pendingCard))), true);

// single_line (Freeman59): name, state and time on one wrapping row. Opt-in,
// so a card that asks for nothing keeps its three stacked lines.
check('single_line absent : pas de classe single-line, rien ne change',
  /class="[^"]*single-line/.test(String(makeCard('closed'))), false);
check('single_line:true pose la classe sur ha-card',
  /<ha-card class="[^"]*single-line/.test(String(makeCard('closed', { single_line: true }))), true);
contains('single_line : la regle CSS qui aligne et replie existe',
  makeCard('closed', { single_line: true }), 'ha-card.single-line .body { display:flex; flex-wrap:wrap;');
contains('single_line garde les trois informations',
  makeCard('closed', { single_line: true, name: 'Portail' }), '<div class="since">');
{
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail' }));
  const h = { language: 'en', states: { 'cover.portail': { state: 'closed', attributes: {}, last_changed: '2026-08-12T10:00:00Z' } }, callService() {} };
  c.hass = h;
  c._config = Object.freeze({ ...c._config, single_line: true });
  c.hass = { ...h };
  check('single_line est dans la signature : la carte se redessine',
    /<ha-card class="[^"]*single-line/.test(String(markup(c))), true);
}
{
  // querySelector is an inert stub in the harness: read the editor markup.
  const edHtml = cfg => { const e = new Editor(); e.hass = { language: 'fr', states: {} }; e.setConfig({ entity: 'cover.portail', ...cfg }); return String(markup(e)); };
  check("l'editeur propose la case single_line, decochee par defaut",
    /data-field="single_line" \/>/.test(edHtml({})), true);
  check("l'editeur coche single_line quand l'option est active",
    /data-field="single_line" checked\/>/.test(edHtml({ single_line: true })), true);
}

// show_position (issue #3): cover travel as a percentage next to the state.
function posHass(state, attrs, extra = {}) {
  return { language: 'fr', states: {
    'cover.portail': { state, attributes: attrs, last_changed: '2026-08-12T10:00:00Z' }, ...extra }, callService() {} };
}
function posCard(state, attrs, cfg = {}, extra = {}) {
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
  c.hass = posHass(state, attrs, extra);
  return String(markup(c));
}
const hasPos = html => /class="pos"/.test(html);
check('show_position absent : pas de pourcentage, rien ne change',
  hasPos(posCard('opening', { current_position: 47 })), false);
contains('show_position:moving pendant l ouverture : le pourcentage suit l etat',
  posCard('opening', { current_position: 47 }, { show_position: 'moving' }), '\u00b7 <span class="pos">47');
check('show_position:moving au repos : rien',
  hasPos(posCard('closed', { current_position: 0 }, { show_position: 'moving' })), false);
contains('show_position:true au repos : Ferme 0',
  posCard('closed', { current_position: 0 }, { show_position: true }), '<span class="pos">0');
contains('show_position:"always" accepte comme true',
  posCard('open', { current_position: 100 }, { show_position: 'always' }), '<span class="pos">100');
check('show_state:false + position : le pourcentage reste seul',
  /<div class="state"><span class="pos">47/.test(posCard('opening', { current_position: 47 }, { show_position: 'moving', show_state: false })), true);
check('attribut absent : rien, jamais NaN',
  /class="pos"|NaN/.test(posCard('opening', {}, { show_position: true })), false);
check('attribut null : rien (Number(null) vaudrait 0)',
  hasPos(posCard('opening', { current_position: null }, { show_position: true })), false);
check('attribut texte vide : rien',
  hasPos(posCard('opening', { current_position: '' }, { show_position: true })), false);
contains('valeur hors bornes ramenee a 100',
  posCard('open', { current_position: 130 }, { show_position: true }), '<span class="pos">100');
contains('repli sur state_entity quand la cover n a pas de position',
  posCard('opening', {}, { show_position: true, state_entity: 'sensor.etat' },
    { 'sensor.etat': { state: 'opening', attributes: { current_position: 33 } } }), '<span class="pos">33');
{
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', show_position: 'moving' }));
  c.hass = posHass('opening', { current_position: 10 });
  markup(c);
  c.hass = posHass('opening', { current_position: 60 });
  contains('la position est dans la signature : le pourcentage avance pendant la course',
    markup(c), '<span class="pos">60');
}
{
  const edHtml = cfg => { const e = new Editor(); e.hass = { language: 'fr', states: {} }; e.setConfig({ entity: 'cover.portail', ...cfg }); return String(markup(e)); };
  check("l'editeur propose show_position, Jamais par defaut",
    /<option value="never" selected>/.test(edHtml({})), true);
  check("l'editeur selectionne Pendant le mouvement",
    /<option value="moving" selected>/.test(edHtml({ show_position: 'moving' })), true);
  check("l'editeur selectionne Toujours pour true",
    /<option value="always" selected>/.test(edHtml({ show_position: true })), true);
}

// draw_position (1.6.0): the drawing follows the reported travel.
const slideOf = html => (String(html).match(/class="gate-leaf" style="transform:translateX\(([-\d.]+)px\)"/) || [])[1];
const hasCar = html => /<g class="gate-car">/.test(html);
const garageBar = html => (String(html).match(/<rect x="19" y="([\d.]+)" width="102" height="4"/) || [])[1];
check('draw_position absent : pose fixe pendant la course (49)',
  slideOf(posCard('opening', { current_position: 10 })), '-49');
check('draw_position coulissant a 47 % : le vantail est a 46.1',
  slideOf(posCard('opening', { current_position: 47 }, { draw_position: true })), '-46.1');
check('draw_position coulissant ouvre vers la droite : signe positif',
  slideOf(posCard('closing', { current_position: 47 }, { draw_position: true, slide_direction: 'right' })), '46.1');
check('draw_position sans attribut : pose fixe conservee',
  slideOf(posCard('opening', {}, { draw_position: true })), '-49');
check('arrete a 30 % : dessine a 30 %, pas grand ouvert',
  slideOf(posCard('open', { current_position: 30 }, { draw_position: true })), '-29.4');
check('arrete a 30 % : pas de voiture',
  hasCar(posCard('open', { current_position: 30 }, { draw_position: true })), false);
check('ouvert a 100 % : la voiture reste',
  hasCar(posCard('open', { current_position: 100 }, { draw_position: true })), true);
check('ouvert a 100 % : pose ouverte habituelle',
  slideOf(posCard('open', { current_position: 100 }, { draw_position: true })), '-98');
check('battant a 47 % : angle reel, plus la pose fixe 0.35',
  /class="leaf-l" style="transform:scaleX\(0\.48\) skewY\(6\.13deg\)"/.test(posCard('opening', { current_position: 47 }, { draw_position: true, gate_type: 'swing' })), true);
check('battant arrete a 30 % : pas de voiture',
  hasCar(posCard('open', { current_position: 30 }, { draw_position: true, gate_type: 'swing' })), false);
check('garage a 47 % : la barre du bas remonte a 36.5',
  garageBar(posCard('opening', { current_position: 47 }, { draw_position: true, gate_type: 'garage' })), '36.5');
check('garage fermeture a 15 % : plus de place, pas de fleche',
  /<path class="garage-arrow"/.test(posCard('closing', { current_position: 15 }, { draw_position: true, gate_type: 'garage' })), false);
check('garage fermeture a 53 % : la fleche est sous le tablier',
  /<g transform="translate\(0 [\d.]+\)"><path class="garage-arrow"/.test(posCard('closing', { current_position: 53 }, { draw_position: true, gate_type: 'garage' })), true);
check('garage arrete a 30 % : pas de voiture',
  hasCar(posCard('open', { current_position: 30 }, { draw_position: true, gate_type: 'garage' })), false);
check('porte : draw_position ignore',
  /positioned/.test(posCard('opening', { current_position: 47 }, { draw_position: true, gate_type: 'door' }).replace(/<style>[\s\S]*?<\/style>/, '')), false);
check('position connue : l animation de va-et-vient est coupee',
  /<ha-card class="[^"]*moving[^"]*positioned/.test(posCard('opening', { current_position: 47 }, { draw_position: true })), true);
{
  // draw_position sans show_position : la position doit quand meme faire redessiner.
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', draw_position: true }));
  c.hass = posHass('opening', { current_position: 10 });
  markup(c);
  c.hass = posHass('opening', { current_position: 60 });
  check('draw_position seul : le vantail avance pendant la course',
    slideOf(markup(c)), '-58.8');
}
{
  const edHtml = cfg => { const e = new Editor(); e.hass = { language: 'fr', states: {} }; e.setConfig({ entity: 'cover.portail', ...cfg }); return String(markup(e)); };
  check("l'editeur propose draw_position, decochee par defaut",
    /data-field="draw_position" \/>/.test(edHtml({})), true);
  check("l'editeur coche draw_position",
    /data-field="draw_position" checked\/>/.test(edHtml({ draw_position: true })), true);
  check("l'editeur masque draw_position pour une porte",
    /data-field="draw_position"/.test(edHtml({ gate_type: 'door' })), false);
}

// Hungarian (issue #4): labels and state keywords.
{
  const huCard = (raw, cfg = {}) => {
    const c = new Card();
    c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
    c.hass = { language: 'hu', states: { 'cover.portail': { state: raw, attributes: {}, last_changed: '2026-08-12T10:00:00Z' } }, callService() {} };
    return String(markup(c));
  };
  check('hongrois : ferme se dit Zarva', label(huCard('closed')), 'Zárva');
  const norm = raw => label(makeCard(raw));
  check('hongrois reconnu : Zarva = ferme', norm('Zárva'), 'Closed');
  check('hongrois reconnu : Nyitva = ouvert', norm('Nyitva'), 'Open');
  check('hongrois reconnu : Nyitas = ouverture', norm('Nyitás…'), 'Opening…');
  check('hongrois reconnu : Zaras = fermeture', norm('Zárás…'), 'Closing…');
  check('hongrois reconnu : Felig nyitva = partiel, pas ouvert', norm('Félig nyitva'), label(makeCard('partial')));
  check('hongrois reconnu : Feloldva = deverrouille', norm('Feloldva'), label(makeCard('unlocked')));
  check('hongrois reconnu : Gyalogos = pieton', norm('Gyalogos bejáró'), label(makeCard('pedestrian')));
  check('hongrois reconnu : Szelloztetes = aeration', norm('Szellőztetés'), label(makeCard('venting')));
  check('hongrois reconnu : Reszlegesen nyitva = partiel, pas ouvert', norm('R\u00e9szlegesen nyitva'), label(makeCard('partial')));
  check('hongrois : le libelle partiel est Reszlegesen nyitva', label(huCard('partial')), 'R\u00e9szlegesen nyitva');
  check('les mots hongrois ne cassent pas les autres langues : Ferme', norm('Fermé'), 'Closed');
}

// single_leaf (issue #4): one full-width swing leaf, hinged left or right.
{
  const sw = (state, cfg = {}, attrs = {}) => posCard(state, attrs, { gate_type: 'swing', ...cfg });
  const leaves = html => (html.match(/<g class="leaf-[lr]"/g) || []).length;
  const leafStyle = (html, side) => (html.match(new RegExp(`<g class="leaf-${side}" style="transform:([^"]*)"`)) || [])[1];
  const bars = html => (html.match(/width="4" height=/g) || []).length / 2;
  check('deux vantaux par defaut', leaves(sw('closed')), 2);
  check('single_leaf:left : un seul vantail', leaves(sw('closed', { single_leaf: 'left' })), 1);
  check('single_leaf:left pivote sur le poteau gauche', leafStyle(sw('closed', { single_leaf: 'left' }), 'l'), 'none');
  check('single_leaf:right pivote sur le poteau droit', leafStyle(sw('closed', { single_leaf: 'right' }), 'r'), 'none');
  check('ouvert a gauche : replie a -0.3, penche vers le haut',
    leafStyle(sw('open', { single_leaf: 'left' }), 'l'), 'scaleX(-0.3) skewY(9deg)');
  check('ouvert a droite : meme pose, inclinaison miroir',
    leafStyle(sw('open', { single_leaf: 'right' }), 'r'), 'scaleX(-0.3) skewY(-9deg)');
  check('ferme : vantail plein, 10 barreaux', bars(sw('closed', { single_leaf: 'left' })), 10);
  check('replie : vantail allege, 5 barreaux', bars(sw('open', { single_leaf: 'left' })), 5);
  check('draw_position a 40 % : angle reel du vantail unique',
    leafStyle(sw('opening', { single_leaf: 'left', draw_position: true }, { current_position: 40 }), 'l'), 'scaleX(0.73) skewY(4.77deg)');
  check('pieton : le pictogramme passe du cote libre',
    sw('pedestrian', { single_leaf: 'left', pedestrian_entity: 'cover.p' }) !== sw('pedestrian', { single_leaf: 'right', pedestrian_entity: 'cover.p' }), true);
  check('single_leaf:double ecrit a la main : deux vantaux', leaves(sw('closed', { single_leaf: 'double' })), 2);
  check('single_leaf:true invalide : deux vantaux', leaves(sw('closed', { single_leaf: true })), 2);
  check('single_leaf ignore hors battant', leaves(posCard('closed', {}, { gate_type: 'sliding', single_leaf: 'left' })), 0);
  const c = new Card();
  c.setConfig(Object.freeze({ entity: 'cover.portail', gate_type: 'swing' }));
  c.hass = posHass('closed', {});
  markup(c);
  c._config = Object.freeze({ ...c._config, single_leaf: 'right' });
  c.hass = posHass('closed', {});
  check('single_leaf est dans la signature : la carte se redessine', leaves(String(markup(c))), 1);
  const edHtml = cfg => { const e = new Editor(); e.hass = { language: 'fr', states: {} }; e.setConfig({ entity: 'cover.portail', ...cfg }); return String(markup(e)); };
  check("l'editeur propose Vantaux sur un battant, deux par defaut",
    /<option value="double" selected>/.test(edHtml({ gate_type: 'swing' })), true);
  check("l'editeur selectionne la charniere droite",
    /<option value="right" selected>Un vantail/.test(edHtml({ gate_type: 'swing', single_leaf: 'right' })), true);
  check("l'editeur masque Vantaux hors battant",
    /data-field="single_leaf"/.test(edHtml({ gate_type: 'sliding' })), false);
}

// Hungarian word order (issue #5): the time comes before "óta".
{
  const sinceOf = (language) => {
    const c = new Card();
    c.setConfig(Object.freeze({ entity: 'cover.portail' }));
    c.hass = { language, states: { 'cover.portail': { state: 'closed', attributes: {}, last_changed: '2026-08-12T10:00:00Z' } }, callService() {} };
    return (String(markup(c)).match(/<div class="since">([^<]*)</) || [])[1];
  };
  check('hongrois : l heure vient avant ota', /^\d.* \u00f3ta$/.test(sinceOf('hu')), true);
  check('francais : depuis reste devant l heure', /^depuis \d/.test(sinceOf('fr')), true);
  check('anglais : since reste devant l heure', /^since \d/.test(sinceOf('en')), true);
}

// language (1.8.0): the card can be forced to another language than HA.
{
  const langCard = (haLang, cfg = {}, st = 'closed') => {
    const c = new Card();
    c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
    c.hass = { language: haLang, states: { 'cover.portail': { state: st, attributes: { current_position: 47 }, last_changed: '2026-08-12T10:00:00Z' } }, callService() {} };
    return c;
  };
  check('sans option : la carte suit la langue de HA', label(String(markup(langCard('en')))), 'Closed');
  check('language:fr sur un HA anglais : la carte parle francais', label(String(markup(langCard('en', { language: 'fr' })))), 'Fermé');
  check('language:hu : ordre hongrois de l heure respecte',
    / óta$/.test((String(markup(langCard('en', { language: 'hu' }))).match(/<div class="since">([^<]*)</) || [])[1]), true);
  check('language:fr : le pourcentage suit aussi la langue forcee (47 % avec espace insecable)',
    /<span class="pos">47[\u00a0\u202f]%/.test(String(markup(langCard('en', { language: 'fr', show_position: true })))), true);
  check('code de langue inconnu : on garde celle de HA, pas l anglais',
    label(String(markup(langCard('fr', { language: 'xx' })))), 'Fermé');
  {
    const c = langCard('en');
    markup(c);
    c._config = Object.freeze({ ...c._config, language: 'de' });
    c.hass = { ...c._hass };
    check('language est dans la signature : la carte se redessine', label(String(markup(c))), 'Geschlossen');
  }
  const edHtml = cfg => { const e = new Editor(); e.hass = { language: 'fr', states: {} }; e.setConfig({ entity: 'cover.portail', ...cfg }); return String(markup(e)); };
  check("l'editeur propose la langue, Comme Home Assistant par defaut", /<option value="" selected>Comme Home Assistant/.test(edHtml({})), true);
  check("l'editeur selectionne la langue forcee", /<option value="hu" selected>Magyar/.test(edHtml({ language: 'hu' })), true);
  check("l'editeur reste dans la langue de l'utilisateur", /Langue de la carte/.test(edHtml({ language: 'hu' })), true);
}

// Locks (1.9.0): a door with no handle. The lock either pulls the bolt back or
// releases the latch and opens for real, and the card must never offer to lock
// a door that is standing open.
{
  const lockCard = (cfg = {}, lock = 'locked', contact) => {
    const c = new Card();
    c.setConfig(Object.freeze({ gate_type: 'door', entity: 'lock.porte', ...cfg }));
    const states = { 'lock.porte': { state: lock, attributes: {}, last_changed: '2026-08-12T10:00:00Z' } };
    if (contact !== undefined) states['binary_sensor.porte'] = { state: contact, attributes: {}, last_changed: '2026-08-12T10:00:00Z' };
    c.hass = { language: 'fr', states, callService() {} };
    return c;
  };
  const acts = (...a) => [...String(markup(lockCard(...a))).matchAll(/data-action="([a-z]+)"/g)].map(m => m[1]).join(',');
  const tappable = (...a) => /class="[^"]*tappable/.test(String(markup(lockCard(...a))));

  // The legacy shape: the same lock named twice was the only way to unlatch.
  const legacy = { open_entity: 'lock.porte', contact_entity: 'binary_sensor.porte' };
  check('serrure : porte ouverte au capteur, aucune commande', acts(legacy, 'unlocked', 'on'), '');
  check('serrure : verrou degage, aucune commande', acts({}, 'open'), '');
  check('portail cover ouvert : Fermer reste propose, le retrait ne vise que les serrures',
    /data-action="close"/.test(makeCard('open')), true);
  check('serrure simple deverrouillee : Ouvrir ne ferait rien, il disparait', acts({}, 'unlocked'), 'close');
  check('serrure qui degage, deverrouillee : Ouvrir ouvre vraiment, il reste', acts(legacy, 'unlocked', 'off'), 'open,close');
  check('doublon historique : plus de bouton Deverrouiller par defaut', acts(legacy, 'locked', 'off'), 'open');
  check('bouton Deverrouiller sur demande', acts({ ...legacy, show_unlock_button: true }, 'locked', 'off'), 'unlock,open');
  check('lock_open_action remplace le doublon', acts({ lock_open_action: 'open' }, 'unlocked'), 'open,close');

  // Which service each button really calls.
  const callsFor = (cfg, action, lock = 'unlocked') => {
    const seen = [];
    const c = new Card();
    c.setConfig(Object.freeze({ gate_type: 'door', entity: 'lock.porte', confirm: false, ...cfg }));
    c.hass = { language: 'fr', states: { 'lock.porte': { state: lock, attributes: {}, last_changed: '2026-08-12T10:00:00Z' } },
      callService(d, s) { seen.push(d + '.' + s); } };
    c._onAction(action);
    return seen.join(',');
  };
  check('serrure simple : Ouvrir deverrouille', callsFor({}, 'open'), 'lock.unlock');
  check('lock_open_action:open : Ouvrir degage', callsFor({ lock_open_action: 'open' }, 'open'), 'lock.open');
  check('Deverrouiller degage jamais, il deverrouille', callsFor({ lock_open_action: 'open' }, 'unlock'), 'lock.unlock');
  check('Fermer verrouille', callsFor({ lock_open_action: 'open' }, 'close'), 'lock.lock');

  // The whole-card tap can now name its command instead of needing a single one.
  check('toucher auto : inactif quand deux commandes existent', tappable({ ...legacy, card_tap: true }, 'unlocked', 'off'), false);
  check('toucher auto : actif quand il n en reste qu une', tappable({ ...legacy, card_tap: true }, 'locked', 'off'), true);
  check('toucher Fermer : actif verrou ouvert', tappable({ ...legacy, card_tap: 'close' }, 'unlocked', 'off'), true);
  check('toucher Fermer : inerte porte verrouillee, pas d ouverture par megarde',
    tappable({ ...legacy, card_tap: 'close' }, 'locked', 'off'), false);
  check('toucher Fermer : inerte porte ouverte', tappable({ ...legacy, card_tap: 'close' }, 'unlocked', 'on'), false);
  check('sans reglage : la carte n est jamais cliquable', tappable(legacy, 'locked', 'off'), false);
  check('toucher nomme : les boutons restent, on n en cache aucun',
    acts({ ...legacy, card_tap: 'close', show_tap_button: false }, 'unlocked', 'off'), 'open,close');

  // Confirmation: guarding only what lets someone in.
  const taps = (confirm, action) => {
    const seen = [];
    const c = new Card();
    c.setConfig(Object.freeze({ gate_type: 'door', entity: 'lock.porte', lock_open_action: 'open', confirm }));
    c.hass = { language: 'fr', states: { 'lock.porte': { state: 'unlocked', attributes: {}, last_changed: '2026-08-12T10:00:00Z' } },
      callService(d, s) { seen.push(d + '.' + s); } };
    c._onAction(action);
    return seen.length;
  };
  check('confirm par defaut : Fermer demande deux appuis', taps(undefined, 'close'), 0);
  check('confirm:open : Fermer part au premier appui', taps('open', 'close'), 1);
  check('confirm:open : Ouvrir attend le second appui', taps('open', 'open'), 0);
  check('confirm:false : rien ne demande confirmation', taps(false, 'open'), 1);

  // The clock follows a pinned language, and only a pinned one.
  const sinceOf = (cfg) => {
    const c = new Card();
    c.setConfig(Object.freeze({ entity: 'cover.portail', ...cfg }));
    c.hass = { language: 'fr', states: { 'cover.portail': { state: 'closed', attributes: {}, last_changed: '2026-08-12T10:00:00Z' } }, callService() {} };
    return (String(markup(c)).match(/<div class="since">([^<]*)</) || [])[1];
  };
  check('language:en : l heure passe en 12 h', / (AM|PM)$/.test(sinceOf({ language: 'en' })), true);
  check('language:fr : l heure reste en 24 h', / (AM|PM)$/.test(sinceOf({ language: 'fr' })), false);

  const edHtml = cfg => { const e = new Editor(); e.hass = { language: 'fr', states: {} }; e.setConfig({ entity: 'lock.porte', ...cfg }); return String(markup(e)); };
  check("l'editeur : toucher sur Non par defaut", /<option value="no" selected>/.test(edHtml({})), true);
  check("l'editeur : toucher sur Toujours Fermer", /<option value="close" selected>Toujours Fermer/.test(edHtml({ card_tap: 'close' })), true);
  check("l'editeur : l ancien card_tap true tombe sur la commande unique",
    /<option value="auto" selected>/.test(edHtml({ card_tap: true })), true);
  check("l'editeur : confirmation sur Toujours par defaut", /<option value="always" selected>/.test(edHtml({})), true);
  check("l'editeur : confirmation a l ouverture seulement", /<option value="open" selected>À l'ouverture/.test(edHtml({ confirm: 'open' })), true);
  check("l'editeur : confirmation jamais quand confirm vaut false", /<option value="never" selected>/.test(edHtml({ confirm: false })), true);
  check("l'editeur : Ouvrir sur une serrure, deverrouiller par defaut",
    /<option value="unlock" selected>/.test(edHtml({})), true);
  check("l'editeur : Ouvrir sur une serrure, degagement", /<option value="open" selected>Ouvrir la porte/.test(edHtml({ lock_open_action: 'open' })), true);
  check("l'editeur : bouton Deverrouiller decoche par defaut",
    /data-field="show_unlock_button" checked/.test(edHtml({})), false);
  check("l'editeur : bouton Deverrouiller coche", /data-field="show_unlock_button" checked/.test(edHtml({ show_unlock_button: true })), true);
}

report();
