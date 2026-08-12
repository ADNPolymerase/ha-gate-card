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
  c.setConfig({ entity: 'cover.portail', ...cfg });
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

// ── Unavailable / missing entities must render, not throw ────────────────────

check('cover unavailable → état inconnu, pas de crash',
  label(makeCard('unavailable')), 'Unknown state');
check('entité absente de hass → état inconnu, pas de crash',
  label(makeCard(undefined)), 'Unknown state');
contains('state_entity configurée mais absente → rend quand même',
  makeCard('open', { state_entity: 'sensor.fantome' }), '<div class="state">');

report();
