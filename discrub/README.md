# Discrub Export Viewer

This subproject contains styles and scripts that theme Discord export HTML dumps to match the site and add a back link.

## Structure
```
discrub/
├── src/
│   ├── styles/discrub.css
│   └── scripts/discrub.js
├── assets/
│   └── images/discrub.png
├── docs/
└── tests/
```

## Usage
- Link these assets inside an export HTML file’s `<head>`:
  - `<link rel="stylesheet" href="../../discrub/src/styles/discrub.css">`
  - `<script src="../../discrub/src/scripts/discrub.js" defer></script>`

## Contributing
- Keep changes self-contained to `src/`
- Avoid inline styles; prefer CSS
- Test with a large export HTML for regressions
