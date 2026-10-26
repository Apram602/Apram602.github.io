# Aprampal Singh — Portfolio (source files)

A static portfolio website. No build step, no backend, no dependencies to
install. Open it in any browser — or host the folder as-is on any static
host (for example GitHub Pages).

## How to run it

Double-click `index.html`, or serve the folder from a terminal:

```
cd portfolio-website-code
python3 -m http.server 8000
```

then open http://localhost:8000 in a browser.

## Project structure

```
portfolio-website-code/
├── index.html              Page content: hero, projects, experience, skills, contact
├── css/
│   └── style.css           All styling, including the black-and-red theme,
│                           the PORTFOLIO pop-up animation, and scroll effects
├── js/
│   └── main.js             Project filter, scroll animations, hero parallax,
│                           and the stats count-up
├── assets/
│   ├── hero-itachi-base.webp   Hero artwork with the crows cut out
│   │                           (transparent background, blends into the page)
│   ├── crow-1.webp         Animated crow sprite
│   ├── crow-2.webp         Animated crow sprite
│   ├── crow-3.webp         Animated crow sprite
│   └── crow-4.webp         Animated crow sprite
└── README.md               This file
```

## How to edit it

- **Change text, projects, or links:** edit `index.html`.
- **Change colours, fonts, or animations:** edit `css/style.css`.
- **Change interactive behaviour:** edit `js/main.js`.
- **Swap the hero image:** replace the files in `assets/` with your own
  images of the same names, or update the `src` values in `index.html`.

## Notes

- Fonts load from Google Fonts, so the page needs an internet connection to
  look exactly as designed. Everything else works offline.
- The GitHub and LinkedIn buttons link to the real profiles; the featured
  project links to the public medical-web-app repository.
- This is a snapshot of the portfolio as it stands. Edits made here do not
  change the hosted version automatically — re-upload the changed files to
  update the live site.
