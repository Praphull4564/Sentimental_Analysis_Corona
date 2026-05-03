# Sentimental_Analysis_Corona

This project collects and analyzes public sentiment on coronavirus-related comments.

## Project structure

- `website/` - React frontend for the sentiment analysis showcase.
- `website/backend/` - Python backend for API support.
- `ChatGPTDataset/` - local dataset files used for analysis.
- `venv/` - local Python virtual environment (ignored by Git).

## Notes

- Large dataset files are intentionally excluded from Git using `.gitignore`.
- Do not commit `venv/` or dataset CSV files to GitHub.

## How to run the frontend locally

```powershell
cd website
npm install
npm start
```

## How to build for deployment

```powershell
cd website
npm run build
```

## Deploying to Vercel

1. Sign in at https://vercel.com with GitHub.
2. Import this repository.
3. Set the root directory to `website`.
4. Use build command: `npm run build`.
5. Use output directory: `build`.

## Important

- The frontend can be deployed on Vercel.
- The Python backend is not deployed automatically with Vercel and requires a separate Python hosting service if needed.
