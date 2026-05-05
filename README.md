# SentimentAI (`website/`)

This folder is the **SentimentAI** React app: the public-facing site for this repository’s sentiment-analysis work (**BERT vs RoBERTa**, charts, methodology).

**New here?** Read the **[repository root README](../README.md)** first — it explains how notebooks, scripts, and this site fit together.

## What the project is about

You study **context-based sentiment classification** using transformer models. The narrative on the site matches the research story in the UI:

- **Data:** Text from **Reddit** (discussion around ChatGPT / AI themes) plus **ChatGPT**-style conversational text, summarized on the Methodology page as **50,000+** records with positive, negative, and neutral labels.
- **Models:** **BERT-base-uncased** and **RoBERTa-base**, compared on accuracy, precision, recall, F1, and domain-style breakdowns (Reddit vs ChatGPT slices in the charts).
- **Goal:** Communicate **how** the pipeline was built (collection → preprocessing → training → metrics) and **what** each model achieves, without requiring readers to open notebooks.

Charts and numeric summaries in **Results** and **Comparison** are wired in React (Chart.js); update those values when your analysis changes.

## What the site does

**SentimentAI** is a static marketing-style research site:

- **React Router** for four main views; **scroll-to-top** on navigation.
- **GSAP** (with ScrollTrigger where used) for hero, section reveals, navbar, tab transitions on Results, and a cursor-follow glow effect.
- **Glassmorphism / gradient** visuals, responsive **navbar + hamburger** menu, and **interactive cards** that react to pointer position.

There is **no** separate “live demo” page in the current app; the footer references a broader stack (e.g. Python, Flask, MongoDB) that applies to backend or data workflows described in the [repository README](../README.md), not shipped as runnable server code inside `website/` in this checkout.

### Pages

| Route | Purpose |
|--------|----------|
| `/` (**Home**) | Hero, headline stats (e.g. 50K+ reviews, dual models, 95%+ framing), architecture overview tiles, CTAs into Results / Methodology / Comparison. |
| `/methodology` | Timeline-style walkthrough: data sources, preprocessing (cleaning, tokenization, normalization, duplicates, labeling), model cards for BERT and RoBERTa, training/evaluation narrative. |
| `/results` | Tabbed dashboards: sentiment distribution (**Bar** chart for BERT), performance metrics (**Line** chart BERT vs RoBERTa), domain comparison (**Bar**), plus download-style actions if you link outward (e.g. Drive / reports). |
| `/comparison` | Deeper **BERT vs RoBERTa** story: charts, narrative differences, strengths/limits. |

## Tech stack

- **React 18**, **React Router v6**, **react-scripts** (CRA)
- **Chart.js** + **react-chartjs-2**
- **GSAP** + **@gsap/react**
- **Axios** (available if you add API calls later)

## Project structure (`website/`)

```
website/
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── index.css
│   ├── App.js          # Router, navbar, footer, GSAP/global UI
│   ├── App.css
│   └── pages/
│       ├── Home.js           + Home.css
│       ├── Methodology.js    + Methodology.css
│       ├── Results.js        + Results.css
│       └── ModelComparison.js + ModelComparison.css
├── package.json
└── README.md
```

Main styles lean on **`App.css`** plus per-page CSS. Branding in the shell is **SentimentAI** (see `App.js`).

## Local development

**Requirements:** Node.js 14+ (18+ recommended), npm.

```powershell
cd website
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

**Production build:**

```powershell
npm run build
```

Output is in `build/` for any static host (Netlify, Vercel, S3, etc.).

## Deployment

- **GitHub Pages:** `package.json` includes `predeploy` / `deploy` using **gh-pages** (`npm run deploy` after configuring `homepage` and remote as needed).
- **Vercel / others:** Deploy the `website` folder as a React app, or upload the `build/` output; the [root README](../README.md) currently points to a Vercel URL for the live frontend.
## Live Demo

- Frontend live at: https://sentimental-analysis-corona.vercel.app/
## Customization checklist

- **Copy & narrative:** `src/pages/Home.js`, `Methodology.js`, `ModelComparison.js`
- **Numbers & charts:** `src/pages/Results.js`, `src/pages/ModelComparison.js`
- **Nav / footer labels:** `src/App.js`
- **Global look:** `src/App.css`, page-specific `*.css` files

## Beyond this folder

The parent repo holds **Jupyter notebooks** (e.g. Corona / BERT / VADER / Emotion workflows) and **`upload_to_mongodb.py`** for loading cleaned CSVs and reports into MongoDB (optional; uses `website/backend/.env` with `MONGODB_URI` when that path exists). Those pieces support the analysis; **this React app is the curated storyboard** for reviewers and demo audiences.
