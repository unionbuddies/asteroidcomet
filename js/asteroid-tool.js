/* Interactive Asteroid Size Comparison Tool */
(function () {
  const slider = document.getElementById('sizeSlider');
  const readout = document.getElementById('sizeReadout');
  const track = document.getElementById('scaleTrack');
  const description = document.getElementById('toolDescription');
  const presetWrap = document.getElementById('presetButtons');
  if (!slider || !track) return;

  // Reference objects for comparison (diameter/height in meters)
  const REFS = [
    { name: 'A Person', size: 1.8 },
    { name: 'A School Bus', size: 12 },
    { name: 'A Football Field', size: 110 },
    { name: 'Empire State Building', size: 443 },
    { name: 'Mount Everest', size: 8849 },
    { name: 'Earth', size: 12742000 },
  ];

  // Real asteroids for quick presets (diameter in meters)
  const PRESETS = [
    { name: 'Itokawa', size: 350 },
    { name: 'Bennu', size: 490 },
    { name: 'Eros', size: 16800 },
    { name: 'Vesta', size: 525000 },
    { name: 'Ceres', size: 940000 },
  ];

  const MIN_D = 5;        // 5 meters
  const MAX_D = 1000000;  // 1,000 km (just above Ceres)
  const TRACK_MIN = 1;         // 1 meter
  const TRACK_MAX = 16000000;  // 16,000 km (just above Earth)

  function diameterFromSlider(val) {
    const t = val / 1000;
    return MIN_D * Math.pow(MAX_D / MIN_D, t);
  }
  function sliderFromDiameter(d) {
    return Math.round(1000 * Math.log(d / MIN_D) / Math.log(MAX_D / MIN_D));
  }
  function pctOnTrack(size) {
    const clamped = Math.max(TRACK_MIN, Math.min(TRACK_MAX, size));
    return (Math.log10(clamped) - Math.log10(TRACK_MIN)) / (Math.log10(TRACK_MAX) - Math.log10(TRACK_MIN)) * 100;
  }

  function formatSize(m) {
    if (m < 1000) return `${Math.round(m).toLocaleString()} m`;
    return `${(m / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} km`;
  }

  function buildTicks() {
    REFS.forEach((ref, i) => {
      const tick = document.createElement('div');
      tick.className = 'scale-tick' + (i % 2 === 1 ? ' tick-row-2' : '');
      tick.style.left = pctOnTrack(ref.size) + '%';
      tick.innerHTML = `<span class="tick-label">${ref.name}<br>${formatSize(ref.size)}</span>`;
      track.appendChild(tick);
    });

    const marker = document.createElement('div');
    marker.className = 'scale-marker';
    marker.id = 'scaleMarker';
    marker.innerHTML = `<div class="marker-label" id="markerLabel"></div><div class="rock-icon rock"></div>`;
    track.appendChild(marker);
  }

  function buildPresets() {
    PRESETS.forEach((preset) => {
      const btn = document.createElement('button');
      btn.className = 'preset-btn';
      btn.type = 'button';
      btn.textContent = `${preset.name} (${formatSize(preset.size)})`;
      btn.addEventListener('click', () => {
        slider.value = sliderFromDiameter(preset.size);
        update();
      });
      presetWrap.appendChild(btn);
    });
  }

  function nearestPreset(diameter) {
    for (const p of PRESETS) {
      const ratio = diameter / p.size;
      if (ratio > 0.9 && ratio < 1.1) return p;
    }
    return null;
  }

  function describe(diameter) {
    const sorted = [...REFS].sort((a, b) => a.size - b.size);
    let lower = null, upper = null;
    for (const ref of sorted) {
      if (ref.size <= diameter) lower = ref;
      if (ref.size > diameter && !upper) upper = ref;
    }

    let text;
    if (!lower) {
      const ratio = sorted[0].size / diameter;
      text = `This asteroid is smaller than ${sorted[0].name} — about <strong>${ratio.toFixed(1)}×</strong> smaller.`;
    } else if (!upper) {
      const ratio = diameter / lower.size;
      text = `This asteroid dwarfs ${lower.name} — about <strong>${ratio.toFixed(1)}×</strong> its size.`;
    } else {
      const ratio = diameter / lower.size;
      text = `Bigger than <strong>${lower.name}</strong> (${formatSize(lower.size)}) but smaller than <strong>${upper.name}</strong> (${formatSize(upper.size)}) — about <strong>${ratio.toFixed(1)}×</strong> the size of ${lower.name}.`;
    }

    const match = nearestPreset(diameter);
    if (match) {
      text += ` That's about the size of <strong>${match.name}</strong>, a real asteroid studied by scientists.`;
    }
    return text;
  }

  function update() {
    const diameter = diameterFromSlider(Number(slider.value));
    readout.textContent = formatSize(diameter);

    const marker = document.getElementById('scaleMarker');
    const label = document.getElementById('markerLabel');
    if (marker) marker.style.left = pctOnTrack(diameter) + '%';
    if (label) label.textContent = formatSize(diameter);

    description.innerHTML = describe(diameter);

    // update active preset highlight
    presetWrap.querySelectorAll('.preset-btn').forEach((btn, i) => {
      const ratio = diameter / PRESETS[i].size;
      btn.classList.toggle('active', ratio > 0.9 && ratio < 1.1);
    });
  }

  buildTicks();
  buildPresets();
  slider.addEventListener('input', update);
  update();
})();
