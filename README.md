# Sentimental_Analysis_Corona

Sentimental Analysis Corona is a research project that analyzes public sentiment around COVID-19 related comments using transformer-based models.

## Project Overview

This repository contains a React-based presentation website, a Python Flask backend for MongoDB downloads, and data assets used for sentiment model evaluation.

The project demonstrates how sentiment analysis can uncover positive, negative, and neutral trends in large text datasets, and how those trends can be visualized with charts and summary insights.

## Structure

- `website/` — React frontend and static website assets.
- `website/backend/` — Flask API for dataset and report downloads from MongoDB.
- `ChatGPTDataset/` — Local dataset files for analysis and testing.
- `upload_to_mongodb.py` — Upload script to move cleaned CSV data into MongoDB.
- Notebooks and data files for model analysis and reporting.

## How it works

- The frontend shows sentiment distribution, model performance, and insights from BERT and RoBERTa analysis.
- The backend connects to MongoDB to serve download endpoints for datasets and the project PDF report.
- The download section requires the backend API to be reachable from the deployed frontend.

## Live Demo

- Frontend live at: https://sentimental-analysis-corona.vercel.app/

## Important Notes

- The frontend alone is static and can be hosted on Vercel.
- Dataset download functionality requires a separate backend deployment and a configured backend URL.
- Local data files and `venv/` are excluded from GitHub to keep the repository lightweight.

## Local development

1. Install frontend dependencies:

```powershell
cd website
npm install
```

2. Start the frontend:

```powershell
npm start
```

3. Run the backend:

```powershell
cd website/backend
pip install -r requirements.txt
python app.py
```

4. Configure MongoDB access by adding `MONGODB_URI` to `website/backend/.env`.

## Development notes

- The frontend uses `REACT_APP_API_BASE_URL` to connect to the backend API.
- When deploying the frontend, set `REACT_APP_API_BASE_URL` to your live backend URL.
- If the deployed site shows "datasets not yet uploaded," it usually means the backend API is not reachable from the frontend.
