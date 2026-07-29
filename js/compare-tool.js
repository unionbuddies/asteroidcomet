/* Build-Your-Own Size Comparison — pick a space object and an everyday object,
   see them drawn to scale side by side with a plain-language readout. */
(function () {
  const mount = document.getElementById('compareTool');
  if (!mount) return;

  // --- Space objects: size = mean diameter (asteroids) or nucleus diameter (comets), in metres ---
  const SPACE = [
    { id: 'itokawa', name: 'Itokawa', size: 330, type: 'asteroid' },
    { id: 'bennu', name: 'Bennu', size: 490, type: 'asteroid' },
    { id: 'ryugu', name: 'Ryugu', size: 900, type: 'asteroid' },
    { id: 'eros', name: 'Eros', size: 16800, type: 'asteroid' },
    { id: 'vesta', name: 'Vesta', size: 525000, type: 'asteroid' },
    { id: 'ceres', name: 'Ceres', size: 940000, type: 'asteroid' },
    { id: '67p', name: 'Comet 67P (nucleus)', size: 4000, type: 'comet' },
    { id: 'halley', name: "Halley's Comet (nucleus)", size: 11000, type: 'comet' },
    { id: 'halebopp', name: 'Hale–Bopp (nucleus)', size: 60000, type: 'comet' },
  ];

  // --- Everyday reference objects: size = height or longest dimension, in metres ---
  const REF = [
    { id: 'human', name: 'Adult human', size: 1.8, sil: 'human', cat: 'People', aName: 'an adult human', plural: 'people' },
    { id: 'car', name: 'Car', size: 4.5, sil: 'car', cat: 'Vehicles', aName: 'a car', plural: 'cars' },
    { id: 'bus', name: 'School bus', size: 12, sil: 'bus', cat: 'Vehicles', aName: 'a school bus', plural: 'school buses' },
    { id: 'giraffe', name: 'Giraffe', size: 5.5, sil: 'giraffe', cat: 'Nature', aName: 'a giraffe', plural: 'giraffes' },
    { id: 'tree', name: 'Oak tree', size: 25, sil: 'tree', cat: 'Nature', aName: 'an oak tree', plural: 'oak trees' },
    { id: 'whale', name: 'Blue whale', size: 30, sil: 'whale', cat: 'Nature', aName: 'a blue whale', plural: 'blue whales' },
    { id: 'house', name: 'Two-storey house', size: 9, sil: 'house', cat: 'Buildings', aName: 'a two-storey house', plural: 'houses' },
    { id: 'liberty', name: 'Statue of Liberty', size: 93, sil: 'liberty', cat: 'Buildings', aName: 'the Statue of Liberty', plural: 'Statues of Liberty' },
    { id: 'eiffel', name: 'Eiffel Tower', size: 330, sil: 'eiffel', cat: 'Buildings', aName: 'the Eiffel Tower', plural: 'Eiffel Towers' },
    { id: 'burj', name: 'Burj Khalifa', size: 828, sil: 'burj', cat: 'Buildings', aName: 'the Burj Khalifa', plural: 'Burj Khalifas' },
  ];

  // --- Everyday-object silhouettes: viewBox sets the aspect ratio; fill is set via CSS ---
  const SIL = {
    human: { vb: '0 0 40 100', inner: `
      <circle cx="20" cy="11" r="8"/><rect x="12" y="20" width="16" height="34" rx="7"/>
      <rect x="5" y="23" width="6" height="26" rx="3"/><rect x="29" y="23" width="6" height="26" rx="3"/>
      <rect x="13" y="52" width="6" height="44" rx="3"/><rect x="21" y="52" width="6" height="44" rx="3"/>` },
    car: { vb: '0 0 96 50', inner: `
      <path d="M10 32 L22 16 H58 L72 32 H86 V40 H10 Z"/>
      <circle cx="28" cy="41" r="8"/><circle cx="68" cy="41" r="8"/>` },
    bus: { vb: '0 0 100 46', inner: `
      <rect x="4" y="6" width="92" height="30" rx="5"/>
      <circle cx="26" cy="40" r="7"/><circle cx="74" cy="40" r="7"/>` },
    giraffe: { vb: '0 0 64 100', inner: `
      <rect x="20" y="54" width="30" height="20" rx="6"/><rect x="40" y="14" width="10" height="42" rx="4"/>
      <path d="M46 8 h14 v9 h-8 z"/>
      <rect x="22" y="72" width="5" height="24" rx="2"/><rect x="30" y="72" width="5" height="24" rx="2"/>
      <rect x="40" y="72" width="5" height="24" rx="2"/><rect x="46" y="72" width="5" height="24" rx="2"/>` },
    tree: { vb: '0 0 80 100', inner: `
      <rect x="35" y="58" width="10" height="40" rx="2"/>
      <circle cx="40" cy="38" r="24"/><circle cx="23" cy="50" r="15"/><circle cx="57" cy="50" r="15"/>` },
    whale: { vb: '0 0 100 40', inner: `
      <ellipse cx="44" cy="22" rx="40" ry="15"/><path d="M80 22 L98 8 L98 36 Z"/>
      <circle cx="16" cy="18" r="2.4" fill="rgba(0,0,0,0.4)"/>` },
    house: { vb: '0 0 100 82', inner: `
      <path d="M6 42 L50 6 L94 42 Z"/><rect x="16" y="42" width="68" height="40"/>` },
    liberty: { vb: '0 0 44 100', inner: `
      <rect x="11" y="86" width="22" height="12"/><rect x="16" y="40" width="12" height="48" rx="3"/>
      <circle cx="22" cy="30" r="7"/><path d="M15 24 l2 -6 l2 6 l2 -6 l2 6 l2 -6 l2 6 z"/>
      <rect x="26" y="6" width="4" height="22" rx="2" transform="rotate(9 28 17)"/><circle cx="31" cy="7" r="4"/>` },
    eiffel: { vb: '0 0 64 100', inner: `
      <rect x="29" y="4" width="6" height="16"/>
      <polygon points="10,96 26,50 38,50 54,96 44,96 32,66 20,96"/>
      <rect x="18" y="48" width="28" height="5"/><rect x="12" y="72" width="40" height="4"/>` },
    burj: { vb: '0 0 30 100', inner: `
      <polygon points="15,3 18,40 22,70 26,96 4,96 8,70 12,40"/>` },
  };

  const BLOB = `<path d="M52 5 C72 4 93 20 95 43 C97 65 83 93 56 96 C33 99 8 85 6 59 C4 38 20 6 52 5 Z" fill="url(#cmpBlob)"/>
    <circle cx="40" cy="42" r="9" fill="rgba(0,0,0,0.30)"/><circle cx="63" cy="58" r="6" fill="rgba(0,0,0,0.26)"/>
    <circle cx="49" cy="72" r="4.5" fill="rgba(0,0,0,0.22)"/><circle cx="70" cy="34" r="3.5" fill="rgba(0,0,0,0.2)"/>`;

  const BIG_PX = 240;
  const MIN_PX = 13;

  function fmtSize(m) {
    if (m < 10) return `${(Math.round(m * 10) / 10).toString().replace(/\.0$/, '')} m`;
    if (m < 1000) return `${Math.round(m).toLocaleString()} m`;
    return `${(m / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} km`;
  }
  function fmtMult(r) {
    if (r >= 100) return Math.round(r).toLocaleString() + '×';
    if (r >= 10) return (Math.round(r * 10) / 10).toString().replace(/\.0$/, '') + '×';
    return (Math.round(r * 10) / 10).toString() + '×';
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function arOf(vb) { const p = vb.split(/\s+/).map(Number); return p[2] / p[3]; }

  function silSVG(ref, px) {
    const s = SIL[ref.sil];
    const w = px * arOf(s.vb);
    return `<svg class="cmp-sil" viewBox="${s.vb}" style="height:${px}px;width:${w}px">${s.inner}</svg>`;
  }
  function spaceSVG(obj, px) {
    const tail = obj.type === 'comet'
      ? `<span class="cmp-tail" style="width:${Math.max(46, px * 1.25)}px;height:${Math.max(4, px * 0.13)}px"></span>`
      : '';
    return `<div class="cmp-space-viz ${obj.type === 'comet' ? 'is-comet' : ''}" style="width:${px}px;height:${px}px">
        ${tail}
        <svg class="cmp-blob" viewBox="0 0 100 100" style="width:${px}px;height:${px}px">
          <defs><radialGradient id="cmpBlob" cx="38%" cy="34%">
            <stop offset="0%" stop-color="#8f8f96"/><stop offset="60%" stop-color="#45454b"/><stop offset="100%" stop-color="#26262b"/>
          </radialGradient></defs>${BLOB}
        </svg>
      </div>`;
  }

  function buildSelect(id, items, groupKey, selectedId) {
    const groups = [];
    items.forEach((it) => {
      let g = groups.find((x) => x.key === it[groupKey]);
      if (!g) { g = { key: it[groupKey], items: [] }; groups.push(g); }
      g.items.push(it);
    });
    const opts = groups.map((g) =>
      `<optgroup label="${g.key}">` +
      g.items.map((it) =>
        `<option value="${it.id}"${it.id === selectedId ? ' selected' : ''}>${it.name} · ${fmtSize(it.size)}</option>`
      ).join('') + `</optgroup>`
    ).join('');
    return `<select class="compare-select" id="${id}">${opts}</select>`;
  }

  function describe(space, ref) {
    const ratio = space.size / ref.size;
    let headline, note = '';

    if (ratio > 0.95 && ratio < 1.05) {
      headline = `<strong>${space.name}</strong> is about the same size as ${ref.aName}.`;
    } else if (ratio >= 1) {
      headline = `<strong>${space.name}</strong> is about <strong>${fmtMult(ratio)}</strong> the size of ${ref.aName}.`;
    } else {
      headline = `${cap(ref.aName)} is about <strong>${fmtMult(1 / ratio)}</strong> the size of <strong>${space.name}</strong>.`;
    }

    if (ratio >= 2) {
      note = `Stack about <strong>${Math.round(ratio).toLocaleString()}</strong> ${ref.plural} end to end and you'd finally match ${space.name}.`;
    } else if (ratio <= 0.5) {
      note = `${space.name} would fit comfortably in the shadow of ${ref.aName}.`;
    }
    return { headline, note };
  }

  function render() {
    const space = SPACE.find((s) => s.id === spaceSel.value);
    const ref = REF.find((r) => r.id === refSel.value);
    const big = Math.max(space.size, ref.size);

    let spacePx = BIG_PX * (space.size / big);
    let refPx = BIG_PX * (ref.size / big);
    let floored = false;
    if (spacePx < MIN_PX) { spacePx = MIN_PX; floored = true; }
    if (refPx < MIN_PX) { refPx = MIN_PX; floored = true; }

    stage.innerHTML = `
      <div class="cmp-col">
        <div class="cmp-viz" style="height:${BIG_PX}px">${spaceSVG(space, spacePx)}</div>
        <div class="compare-cap"><b>${space.name}</b><br>${fmtSize(space.size)}</div>
      </div>
      <div class="cmp-col">
        <div class="cmp-viz" style="height:${BIG_PX}px">${silSVG(ref, refPx)}</div>
        <div class="compare-cap"><b>${ref.name}</b><br>${fmtSize(ref.size)}</div>
      </div>`;

    const { headline, note } = describe(space, ref);
    headlineEl.innerHTML = headline;
    let noteHTML = note;
    if (floored) {
      noteHTML += (noteHTML ? ' ' : '') +
        `<span class="cmp-scale-note">The smaller object is shown enlarged — it's too tiny to draw truly to scale here.</span>`;
    }
    noteEl.innerHTML = noteHTML;
  }

  // --- Build UI ---
  const defaultSpace = mount.dataset.defaultSpace || 'bennu';
  mount.innerHTML = `
    <div class="compare-controls">
      <div class="compare-field">
        <label for="cmpSpace">Space object</label>
        ${buildSelect('cmpSpace', SPACE, 'type', defaultSpace)}
      </div>
      <div class="compare-field">
        <label for="cmpRef">Compare it to</label>
        ${buildSelect('cmpRef', REF, 'cat', 'human')}
      </div>
    </div>
    <div class="compare-stage" id="cmpStage"></div>
    <p class="compare-headline" id="cmpHeadline"></p>
    <p class="compare-note" id="cmpNote"></p>`;

  const spaceSel = document.getElementById('cmpSpace');
  const refSel = document.getElementById('cmpRef');
  const stage = document.getElementById('cmpStage');
  const headlineEl = document.getElementById('cmpHeadline');
  const noteEl = document.getElementById('cmpNote');

  spaceSel.addEventListener('change', render);
  refSel.addEventListener('change', render);
  render();
})();
