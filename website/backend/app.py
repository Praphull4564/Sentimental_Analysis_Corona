"""
Backend API for Sentiment Analysis Website
==========================================
Serves download endpoints for datasets and reports from MongoDB.
No live demo / prediction features — purely for dataset downloads.

Usage:
    python app.py
"""

from flask import Flask, jsonify, Response, send_file
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import io
import csv
import json
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Connection
MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "sentiment_reports")

client = None
db = None


def get_db():
    """Lazy-connect to MongoDB."""
    global client, db
    if db is None:
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=10000)
        db = client[MONGODB_DB]
    return db


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    try:
        database = get_db()
        database.command("ping")
        return jsonify({"status": "healthy", "database": "connected"})
    except Exception as e:
        return jsonify({"status": "unhealthy", "error": str(e)}), 500


@app.route("/api/upload-status", methods=["GET"])
def upload_status():
    """Check if datasets have been uploaded to MongoDB."""
    try:
        database = get_db()
        meta = database["upload_metadata"].find_one({"upload_complete": True})
        if meta:
            meta.pop("_id", None)
            return jsonify({"uploaded": True, "metadata": meta})
        else:
            return jsonify({"uploaded": False})
    except Exception as e:
        return jsonify({"uploaded": False, "error": str(e)}), 500


@app.route("/api/download/dataset/<dataset_name>", methods=["GET"])
def download_dataset(dataset_name):
    """Download a dataset as CSV from MongoDB."""
    allowed = ["cleaned_review", "classified_review", "berts_sentiment", "merged_review", "review"]
    if dataset_name not in allowed:
        return jsonify({"error": f"Invalid dataset. Choose from: {allowed}"}), 400

    try:
        database = get_db()
        collection = database[dataset_name]
        count = collection.estimated_document_count()

        if count == 0:
            return jsonify({"error": f"Dataset '{dataset_name}' not found. Please run upload_to_mongodb.py first."}), 404

        # Stream the CSV to avoid memory issues
        def generate_csv():
            cursor = collection.find({}, {"_id": 0})
            first_doc = collection.find_one({}, {"_id": 0})
            if not first_doc:
                return

            headers = list(first_doc.keys())
            output = io.StringIO()
            writer = csv.DictWriter(output, fieldnames=headers)
            writer.writeheader()
            yield output.getvalue()
            output.truncate(0)
            output.seek(0)

            for doc in cursor:
                writer.writerow(doc)
                yield output.getvalue()
                output.truncate(0)
                output.seek(0)

        return Response(
            generate_csv(),
            mimetype="text/csv",
            headers={
                "Content-Disposition": f"attachment; filename={dataset_name}.csv",
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/download/report", methods=["GET"])
def download_report():
    """Download the PDF report from MongoDB."""
    try:
        database = get_db()
        doc = database["report_files"].find_one({"filename": "report.pdf"})

        if not doc:
            return jsonify({"error": "Report not found. Please run upload_to_mongodb.py first."}), 404

        pdf_data = doc["data"]
        return Response(
            pdf_data,
            mimetype="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=Sentiment_Analysis_Report.pdf",
                "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/datasets", methods=["GET"])
def list_datasets():
    """List available datasets and their row counts."""
    try:
        database = get_db()
        datasets = ["cleaned_review", "classified_review", "berts_sentiment", "merged_review", "review"]
        info = []
        for name in datasets:
            collection = database[name]
            count = collection.estimated_document_count()
            info.append({"name": name, "rows": count, "available": count > 0})

        # Check report
        report_doc = database["report_files"].find_one({"filename": "report.pdf"})
        report_available = report_doc is not None

        return jsonify({
            "datasets": info,
            "report_available": report_available
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("[*] Starting Sentiment Analysis API Server...")
    print("[*] Endpoints:")
    print("   GET  /health                              - Health check")
    print("   GET  /api/upload-status                   - Check upload status")
    print("   GET  /api/datasets                        - List available datasets")
    print("   GET  /api/download/dataset/<name>         - Download dataset CSV")
    print("   GET  /api/download/report                 - Download report PDF")
    print()
    app.run(debug=True, port=5000)
