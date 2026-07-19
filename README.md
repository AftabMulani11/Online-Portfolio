# Aftab Mulani — Online Portfolio

Personal portfolio website — **Cloud & DevOps Engineer**.

🔗 **Live:** [aftabmulani11.github.io/Online-Portfolio](https://aftabmulani11.github.io/Online-Portfolio/)

## Features

- Responsive single-page portfolio
- Skills, projects, and experience sections
- Downloadable ATS-friendly résumé (LaTeX source included)

## Tech

- HTML / vanilla JavaScript / Three.js background
- Tailwind CSS (built to `dist/app.css`)
- LaTeX résumé source, compiled via `tools/build_resume.sh`

## Run locally

```bash
npm install
npm run build:css   # build the stylesheet
npm run serve       # serve the site at http://localhost:4321
```

`npm run watch` rebuilds the CSS on change while developing.
