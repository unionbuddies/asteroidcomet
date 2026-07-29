/* Interactive Comet Simulator — distance from Sun vs. coma/tail size */
(function () {
  const slider = document.getElementById('distanceSlider');
  const readout = document.getElementById('distanceReadout');
  const description = document.getElementById('cometDescription');
  const body = document.getElementById('cometBody');
  const coma = document.getElementById('cometComa');
  const tailIon = document.getElementById('tailIon');
  const tailDust = document.getElementById('tailDust');
  if (!slider || !body) return;

  const MIN_AU = 0.3;
  const MAX_AU = 30;
  const ACTIVITY_THRESHOLD_AU = 5; // beyond this, effectively inactive
  const STAGE_LEFT_PCT = 17;
  const STAGE_RIGHT_PCT = 92;

  function distanceFromSlider(val) {
    const t = val / 1000;
    return MIN_AU * Math.pow(MAX_AU / MIN_AU, t);
  }

  function pctOnStage(distance) {
    const t = (Math.log10(distance) - Math.log10(MIN_AU)) / (Math.log10(MAX_AU) - Math.log10(MIN_AU));
    return STAGE_LEFT_PCT + t * (STAGE_RIGHT_PCT - STAGE_LEFT_PCT);
  }

  function formatDistance(au) {
    if (au < 1) return `${au.toFixed(2)} AU`;
    if (au < 10) return `${au.toFixed(1)} AU`;
    return `${Math.round(au)} AU`;
  }

  function describe(au, intensity) {
    if (au > ACTIVITY_THRESHOLD_AU) {
      return `At <strong>${formatDistance(au)}</strong> from the Sun, this comet is too far from the Sun's heat to sublimate. It's just a dark, frozen nucleus — no coma, no tail, almost invisible.`;
    }
    if (intensity < 0.35) {
      return `At <strong>${formatDistance(au)}</strong>, the Sun's warmth is just starting to vaporize surface ice. A faint coma begins to form.`;
    }
    if (intensity < 0.75) {
      return `At <strong>${formatDistance(au)}</strong>, the comet is actively sublimating — a glowing coma and two tails are clearly visible, both pointing away from the Sun.`;
    }
    return `At <strong>${formatDistance(au)}</strong>, the comet is near its closest approach (perihelion). Intense solar heating drives dramatic sublimation, producing its brightest coma and longest tails.`;
  }

  function update() {
    const au = distanceFromSlider(Number(slider.value));
    readout.textContent = formatDistance(au);

    const pct = pctOnStage(au);
    body.style.left = pct + '%';
    tailIon.style.left = pct + '%';
    tailDust.style.left = pct + '%';

    const intensity = Math.max(0, Math.min(1, 1 - au / ACTIVITY_THRESHOLD_AU));

    const comaSize = 14 + intensity * 90;
    coma.style.width = comaSize + 'px';
    coma.style.height = comaSize + 'px';
    coma.style.opacity = 0.25 + intensity * 0.75;

    const ionLength = intensity * 260;
    tailIon.style.width = ionLength + 'px';
    tailIon.style.opacity = intensity > 0.02 ? 0.3 + intensity * 0.7 : 0;
    tailIon.style.transform = 'translateY(-50%)';

    const dustLength = intensity * 200;
    tailDust.style.width = dustLength + 'px';
    tailDust.style.opacity = intensity > 0.02 ? 0.25 + intensity * 0.65 : 0;
    tailDust.style.transform = `translateY(-50%) rotate(-13deg)`;

    description.innerHTML = describe(au, intensity);
  }

  slider.addEventListener('input', update);
  update();
})();
