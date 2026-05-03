# Sentimental_Analysis_Corona

Sentimental Analysis Corona is a research project that analyzes public sentiment around COVID-19 related comments using transformer-based models.

## Project Overview

This repository contains a React-based presentation website and data assets used for sentiment model evaluation.

The project demonstrates how sentiment analysis can uncover positive, negative, and neutral trends in large text datasets, and how those trends can be visualized with charts and summary insights.

## Structure

- `website/` — React frontend and static website assets.
- `ChatGPTDataset/` — Local dataset files for analysis and testing.
- `upload_to_mongodb.py` — Upload script to move cleaned CSV data into MongoDB.
- Notebooks and data files for model analysis and reporting.

## How it works

- The frontend shows sentiment distribution, model performance, and insights from BERT and RoBERTa analysis.
The download section provides direct links to datasets and the project PDF report hosted on Google Drive.

## Live Demo

- Frontend live at: https://sentimental-analysis-corona.vercel.app/

## Important Notes

The frontend is static and can be hosted on Vercel.
Dataset download functionality uses direct Google Drive links.

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

3. Configure MongoDB access by adding `MONGODB_URI` to `website/backend/.env`.

## Development notes

The frontend uses direct Google Drive links for downloads.
