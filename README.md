# Asteroids & Comets

An interactive educational website about asteroids, comets, and planetary defense — built as a black-and-white space exploration experience with an animated starfield, SVG diagrams, and hands-on simulations.

## Sections

| Page | Contents |
|------|----------|
| `index.html` | Landing page with animated starfield hero and module navigation |
| `asteroids.html` | What asteroids are, their origins, the asteroid belt, composition types, Bennu & Vesta — plus an **interactive size comparison tool** |
| `comets.html` | Composition, why comets have tails, orbits, Halley's Comet — plus an **interactive comet simulator** |
| `near-earth.html` | Near-Earth Objects, how scientists track them, the Torino Scale, deflection methods, and NASA's DART mission |
| `explore.html` | **Interactive exploration** of Kepler-7X, a fictional asteroid — size, gravity, temperature, distance, surface conditions, and day/night comparison |

## Interactive features

- **Asteroid size comparison** — logarithmic slider scaling an asteroid from 5 m to 1,000 km against a person, school bus, football field, Empire State Building, Mount Everest, and Earth, with real-asteroid presets (Itokawa, Bennu, Eros, Vesta, Ceres).
- **Comet simulator** — move a comet from 0.3 to 30 AU and watch its coma and both tails grow, shrink, and vanish as solar heating changes. Tails always point away from the Sun.
- **Explore an asteroid** — six clickable surface hotspots, plus a day/night toggle that changes temperature readings, surface descriptions, and the lighting on the asteroid.

## Running locally

No build step or dependencies — it's plain HTML, CSS, and JavaScript. Because the pages load shared assets, serve them over HTTP rather than opening the files directly:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Any static server works equally well (`npx serve`, `php -S localhost:8000`, etc.).

## Project structure

```
.
├── index.html          # Landing page
├── asteroids.html      # Module 01
├── comets.html         # Module 02
├── near-earth.html     # Module 03
├── explore.html        # Module 04
├── css/
│   └── style.css       # Design system + all component styles
└── js/
    ├── icons.js        # Inline SVG icon set, injected via [data-icon]
    ├── stars.js        # Animated starfield canvas + shooting stars
    ├── main.js         # Nav, active-link highlighting, scroll reveal
    ├── asteroid-tool.js    # Size comparison tool
    ├── comet-simulator.js  # Comet simulator
    └── explore.js          # Kepler-7X hotspot experience
```

## Notes on the science

Figures are drawn from publicly available NASA / JPL / ESA science: asteroid counts and classifications, Bennu (~490 m) and Vesta (~525 km) dimensions, Halley's ~76-year period, and DART's ~32–33 minute orbital shift of Dimorphos in September 2022.

**Kepler-7X is fictional** — invented for the exploration module, but its properties are modeled on real rubble-pile near-Earth asteroids like Bennu and Itokawa.

This is an educational project and is not affiliated with or endorsed by NASA.
