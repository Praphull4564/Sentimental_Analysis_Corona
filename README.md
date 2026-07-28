# Sentimental Analysis Corona

Research project that studies **sentiment around the COVID-19 (Corona) pandemic** in large text collections. The work combines **Jupyter notebooks** (classical lexicon methods, emotion models, and **BERT**-style transformers across different waves/time slices) with a **`website/`** exhibition front end where methodology, charts, and model comparisons can be browsed without opening notebooks.



---

## What this project is

- **Goal:** Measure and compare **positive, negative, and neutral** (and related emotion-style) signals in corpus text tied to Corona discourse — for example baseline **VADER** runs, richer **emotion** notebooks, and **BERT** experiments on wave-specific splits (`corona_Bert_Wave1.ipynb`, `corona_Bert_Wave2.ipynb`, etc.).
- **Why it matters:** Public reaction during a health crisis shows up in language; scalable sentiment models help summarize trends and contrast simpler baselines against contextual transformers.

---

## Repository layout

| Item | Role |
|------|------|
| **`website/`** | React (CRA) showcase: Home, Methodology, Results, Model Comparison — charts (Chart.js), page motion (GSAP). Details: **[website/README.md](website/README.md)**. |
| **`*.ipynb`** | Core analysis: VADER (`corona_vader.ipynb`, wave notebooks), emotion (`corona_emo.ipynb`, `coronaw1_emo.ipynb`, `coronaw2_emo.ipynb`), BERT paths (`corona_Bert.ipynb`, `corona_Bert_Wave1.ipynb`, `corona_Bert_Wave2.ipynb`). |
| **`merge.py`** | Merges multiple **Twitter-format** CSV exports from one folder into a single file for downstream cleaning (fixed column schema expected). |
| **`upload_to_mongodb.py`** | Optional: uploads **`cleaned_review.csv`** and **`report.pdf`** from the repo root into **MongoDB Atlas** (see `website/backend/.env` → `MONGODB_URI`; create the file if you use uploads). |

Data files (CSVs, PDFs) may live outside Git; add them locally where scripts and notebooks expect them.

---

## Run the showcase site locally

Requirements: Node.js 14+ and npm.

```powershell
cd website
npm install
npm start
```

Build: `npm run build` → `website/build/` for static hosting.

---

## Run notebooks and Python tooling

Use Python 3 + Jupyter with the packages each notebook imports (`pandas`, etc.).

1. Open the Corona notebooks from the repo root.
2. **`merge.py`:** inspect and run with paths that match your raw CSV layout.
3. **`upload_to_mongodb.py`:** set `MONGODB_URI`, place `cleaned_review.csv` / `report.pdf` at the repo root when running.

---

## Documentation

- **`README.md` (this file)** — project purpose and repo map.
- **[`website/README.md`](website/README.md)** — front-end routes, tech stack, deployment notes.

Educational / demonstration use; align on-page numbers and copy in `website/src/pages/` with your actual notebook outputs when presenting results.
