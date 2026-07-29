/* Explore an Asteroid — interactive hotspot experience for fictional asteroid Kepler-7X */
(function () {
  const stage = document.getElementById('exploreStage');
  const hotspots = document.querySelectorAll('.hotspot');
  const dayBtn = document.getElementById('dayBtn');
  const nightBtn = document.getElementById('nightBtn');
  const iconEl = document.getElementById('exploreIcon');
  const titleEl = document.getElementById('exploreTitle');
  const bodyEl = document.getElementById('exploreBody');
  const statNumEl = document.getElementById('exploreStatNum');
  const statLabelEl = document.getElementById('exploreStatLabel');
  if (!stage) return;

  const TOPICS = {
    size: {
      icon: 'ruler',
      title: 'Size',
      body: "Kepler-7X is an irregular, potato-shaped rubble-pile asteroid about <strong>750 meters</strong> along its longest axis — roughly the length of the Golden Gate Bridge's main span. It would take less than 20 minutes to walk a full lap around its equator, if the near-zero gravity would let you keep your feet on the ground.",
      stat: { num: '750 m', label: 'Longest axis' },
    },
    gravity: {
      icon: 'feather',
      title: 'Gravity',
      body: "Surface gravity here is only about <strong>0.0004 g</strong> — roughly 1/2,500th of Earth's. A normal jump wouldn't just carry you higher: you could sail over 100 meters up and take more than a minute to drift back down. Push off too hard and you'd exceed escape velocity — about 0.4 m/s — and leave Kepler-7X forever.",
      stat: { num: '0.0004 g', label: 'Surface gravity' },
    },
    temperature: {
      icon: 'thermometer',
      title: 'Temperature',
      dayBody: "On the sunlit side right now, the surface bakes at around <strong>120°C (248°F)</strong>. With no atmosphere to spread the heat around, direct sunlight and shadow sit right next to each other at wildly different temperatures.",
      nightBody: "On the night side, the surface has plunged to about <strong>-130°C (-200°F)</strong>. Kepler-7X's fast 4.3-hour rotation means this deep freeze — and the blistering heat of day — each last only about two hours.",
      dayStat: { num: '120°C', label: 'Sunlit surface temp' },
      nightStat: { num: '-130°C', label: 'Night-side surface temp' },
    },
    distance: {
      icon: 'globe',
      title: 'Distance from Earth',
      body: "Kepler-7X follows its own elliptical orbit around the Sun, swinging as close as <strong>0.05 AU</strong> (about 7.5 million km) from Earth at its nearest approach, and out to <strong>2.1 AU</strong> (over 300 million km) at its farthest. Even at its closest, it would look like nothing more than a slow-moving star through a telescope.",
      stat: { num: '0.05 – 2.1 AU', label: 'Distance from Earth' },
    },
    surface: {
      icon: 'surface',
      title: 'Surface Conditions',
      body: "The surface is a loose blanket of <strong>regolith</strong> — sand, gravel, and boulders resting atop solid rock, barely held down by gravity this weak. Billions of years of micrometeorite impacts have gently 'gardened' the surface, leaving shallow craters and scattered building-sized boulders.",
      stat: { num: '~4.3 hrs', label: 'Full day/night rotation' },
    },
    standing: {
      icon: 'astronaut',
      title: 'Standing on Kepler-7X',
      dayBody: "In daylight, the Sun blazes with harsh, undiffused light — no atmosphere means no blue sky and no soft shadows, just stark black-and-white contrast. It's completely silent: without air, sound only reaches you through your boots and suit. And you'd move carefully — a normal walking stride could launch you into a slow arc lasting a minute or more.",
      nightBody: "On the night side, the stars are overwhelming — thousands more than visible from Earth, and perfectly steady, since there's no air to make them twinkle. The moment the Sun dips below the horizon, temperatures crash almost instantly, and you'd feel utterly alone under a sky with no atmosphere to soften it.",
      dayStat: { num: '~0.4 m/s', label: 'Escape velocity — don\'t jump too hard' },
      nightStat: { num: '1000s', label: 'More visible stars than on Earth' },
    },
  };

  let currentTopic = 'size';
  let isDay = true;

  function render() {
    const topic = TOPICS[currentTopic];
    iconEl.dataset.icon = topic.icon;
    window.SiteIcons.inject(iconEl.parentElement);
    titleEl.textContent = topic.title;
    bodyEl.innerHTML = isDay && topic.dayBody ? topic.dayBody
      : (!isDay && topic.nightBody ? topic.nightBody : topic.body);

    const stat = isDay && topic.dayStat ? topic.dayStat
      : (!isDay && topic.nightStat ? topic.nightStat : topic.stat);
    statNumEl.textContent = stat.num;
    statLabelEl.textContent = stat.label;

    stage.classList.toggle('day', isDay);
    stage.classList.toggle('night', !isDay);
    dayBtn.classList.toggle('active', isDay);
    nightBtn.classList.toggle('active', !isDay);
  }

  hotspots.forEach((btn) => {
    btn.addEventListener('click', () => {
      hotspots.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentTopic = btn.dataset.topic;
      render();
    });
  });

  dayBtn.addEventListener('click', () => { isDay = true; render(); });
  nightBtn.addEventListener('click', () => { isDay = false; render(); });

  render();
})();
