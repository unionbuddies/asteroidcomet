/* Thin-line SVG icon set — injected into any element with [data-icon] */
(function () {
  const S = (paths) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

  const ICONS = {
    // --- asteroid composition types ---
    rock: S(`<path d="M10.5 2.6 3.2 8.1l1.6 9 8.9 4.3 7.1-6.4-1.4-9.2z"/>
             <circle cx="9" cy="10" r="1.6"/><circle cx="14.6" cy="15.4" r="1.1"/>
             <circle cx="15.2" cy="8.2" r=".8"/>`),
    mountain: S(`<path d="M2 19h20L14.5 6l-3.6 6.2-2.2-2.6z"/><path d="M11.4 12 8.7 9.6"/>`),
    gear: S(`<path d="M12 2.7 20 7.35v9.3L12 21.3 4 16.65v-9.3z"/>
             <circle cx="12" cy="12" r="3.4"/>`),

    // --- missions & instruments ---
    satellite: S(`<rect x="9.4" y="9.4" width="5.2" height="5.2" rx="1" transform="rotate(45 12 12)"/>
                  <path d="M6.6 6.6 3.2 10 6.6 13.4"/>
                  <path d="M17.4 10.6 20.8 14 17.4 17.4"/>
                  <path d="M9.6 14.4 6.6 17.4M14.4 9.6l3-3"/>`),
    telescope: S(`<path d="M3.6 13.2 14.9 6.4l2.6 4.3-11.3 6.8z"/><path d="M17.5 10.7l2.6-1.6-2.6-4.3-2.6 1.6"/>
                  <path d="M9 16.5 7.4 21M13.6 14 16 21"/>`),
    radar: S(`<path d="M4.4 13.6A8.4 8.4 0 0 1 13.6 4.4z"/>
              <path d="M9 9.1 12.4 20.4"/><path d="M9.4 20.4h6.2"/>
              <path d="M16.2 5.4a4.2 4.2 0 0 1 2.4 2.4M18.4 2.6a7.4 7.4 0 0 1 3 3"/>`),
    rocket: S(`<path d="M12 2.8c2.7 2.3 4.2 5.6 4.2 9.1 0 2.4-.7 4.6-1.9 6.4H9.7A11.9 11.9 0 0 1 7.8 12c0-3.5 1.5-6.8 4.2-9.2z"/>
               <circle cx="12" cy="10.4" r="1.7"/>
               <path d="M9.7 18.3 7.4 20.9M14.3 18.3l2.3 2.6"/>
               <path d="M7.8 13.4 5.2 15.6l.6 3.1M16.2 13.4l2.6 2.2-.6 3.1"/>`),
    orbit: S(`<circle cx="12" cy="12" r="2.4"/>
              <ellipse cx="12" cy="12" rx="9.3" ry="4.4" transform="rotate(-24 12 12)"/>
              <circle cx="19.4" cy="8.6" r="1.5"/>`),
    radiation: S(`<circle cx="12" cy="12" r="9.2"/><circle cx="12" cy="12" r="2.1"/>
                  <path d="M12 9.9V4.1M10.2 13.1 5.2 16M13.8 13.1l5 2.9"/>`),

    // --- explore-an-asteroid topics ---
    ruler: S(`<path d="M3.4 14.2 14.2 3.4l6.4 6.4L9.8 20.6z"/>
              <path d="M7.6 10 9.8 12.2M10.4 7.2l2.2 2.2M13.2 4.4l2.2 2.2"/>`),
    feather: S(`<path d="M20.2 5.1a5.3 5.3 0 0 0-7.5 0L5.4 12.4v5.6h5.6l7.3-7.3a5.3 5.3 0 0 0 1.9-5.6z"/>
                <path d="M18.4 8.2 4.1 22.5M14.9 9.4H9.6M16.6 12.9h-5.3"/>`),
    thermometer: S(`<path d="M13.9 13.9V5a2 2 0 1 0-4 0v8.9a4 2 0 1 0 4 0z"/>
                    <path d="M11.9 8.6v6.9M16.6 6.4h2.9M16.6 9.9h2.2"/>`),
    globe: S(`<circle cx="12" cy="12" r="9.2"/><path d="M2.8 12h18.4"/>
              <path d="M12 2.8c2.6 2.5 4 5.8 4 9.2s-1.4 6.7-4 9.2c-2.6-2.5-4-5.8-4-9.2s1.4-6.7 4-9.2z"/>`),
    surface: S(`<path d="M2.4 18.4h19.2"/><path d="M4.6 18.4a3.4 3.4 0 0 1 6.8 0"/>
                <path d="M12.6 18.4a2.4 2.4 0 0 1 4.8 0"/>
                <circle cx="6.4" cy="9.4" r="1.2"/><circle cx="15.6" cy="7.6" r="1.6"/>
                <circle cx="11" cy="12.4" r=".9"/>`),
    astronaut: S(`<circle cx="12" cy="7.4" r="4.4"/><path d="M9.2 6.6a2.9 2.9 0 0 1 3.4-1.7"/>
                  <path d="M8.1 11.2 6.4 21h11.2l-1.7-9.8"/>
                  <path d="M6.4 14.4 3.4 16M17.6 14.4l3 1.6"/>`),

    // --- day / night ---
    sun: S(`<circle cx="12" cy="12" r="4.2"/>
            <path d="M12 1.9v2.6M12 19.5v2.6M1.9 12h2.6M19.5 12h2.6M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/>`),
    moon: S(`<path d="M20.4 14.6A8.9 8.9 0 1 1 9.4 3.6a7 7 0 0 0 11 11z"/>`),

    // --- home module cards ---
    asteroidBelt: S(`<circle cx="12" cy="12" r="2.6"/>
                     <path d="M12 3.1a8.9 8.9 0 0 1 0 17.8"/>
                     <path d="M12 5.9a6.1 6.1 0 0 1 0 12.2"/>
                     <circle cx="7.2" cy="6.2" r=".9"/><circle cx="4.6" cy="11.4" r="1.1"/>
                     <circle cx="6.8" cy="17" r=".8"/>`),
    comet: S(`<circle cx="17" cy="7" r="3.6"/>
              <path d="M14.5 9.5 3.4 20.6"/>
              <path d="M13.4 6.2 8.6 4.4"/>
              <path d="M17.8 10.6l1.8 4.8"/>`),
    shield: S(`<path d="M12 2.6 4.4 5.7v6c0 4.4 3.1 8.4 7.6 9.7 4.5-1.3 7.6-5.3 7.6-9.7v-6z"/>
               <path d="M9.2 11.9 11.4 14l3.9-4.1"/>`),
    flag: S(`<path d="M6.2 21V3.4M6.2 4.2h11.2l-2.4 4.1 2.4 4.1H6.2"/>`),
  };

  function inject(root) {
    (root || document).querySelectorAll('[data-icon]').forEach((el) => {
      const svg = ICONS[el.dataset.icon];
      if (svg) el.innerHTML = svg;
    });
  }

  window.SiteIcons = { ICONS, inject };
  inject(document);
})();
