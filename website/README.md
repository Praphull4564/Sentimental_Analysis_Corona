# Corona sentiment analysis — website

This folder is the **exhibition front end** for **Sentimental Analysis Corona**: a static React site that explains the Corona/COVID-19 sentiment work and shows **BERT vs RoBERTa** (and narrative drawn from your analysis) through charts and pages.

See the **[repository root README](../README.md)** for notebooks (`corona_*.ipynb`), `merge.py`, and optional MongoDB upload.

## What this site explains

The app presents the Corona sentiment-analysis storyline for visitors:

- **Research topic:** sentiment in public/discourse-oriented text associated with the **Corona / COVID-19** period, including comparisons across modeling approaches explored in notebooks (lexicon/emotion/transformer pipelines).
- **Models highlighted in the UI:** **BERT** and **RoBERTa** as representative transformer classifiers (metrics and distributions in **`Results`** / **`Comparison`** are defined in JS — refresh them when your notebook results change).

## Behaviour and routes

| Route | Purpose |
|--------|---------|
| `/` | Hero, headline stats, high-level pipeline overview, links into deeper pages. |
| `/methodology` | Timeline: Corona-oriented data sourcing, preprocessing, model setup, evaluation. |
| `/results` | Tabbed dashboards: sentiment distribution, performance lines/bars (including wave-style domain breakdown aligned with Corona splits). |
| `/comparison` | Deeper **BERT vs RoBERTa** comparison charts and prose. |

**Stack:** React 18, React Router, CRA, Chart.js (`react-chartjs-2`), GSAP (`@gsap/react`). **Axios** is available if you add an API later.

## Folder layout

```
website/
├── public/index.html
├── src/
│   ├── App.js              # Navbar, footer, routing, GSAP/global UI
│   ├── pages/              # Home, Methodology, Results, ModelComparison (+ CSS each)
│   └── index.js, *.css
├── package.json
└── README.md
```

## Local run

```powershell
cd website
npm install
npm start
```

`npm run build` outputs `website/build/` for Vercel, Netlify, GitHub Pages (`npm run deploy` / gh-pages is configured in `package.json`).

## Editing content

Match the site to your real analyses by updating **`src/pages/Results.js`**, **`ModelComparison.js`**, **`Home.js`**, **`Methodology.js`**, and labels in **`App.js`** (navbar/footer).
