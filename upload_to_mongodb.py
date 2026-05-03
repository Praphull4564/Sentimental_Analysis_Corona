"""
MongoDB Dataset Upload Script (Minimalist Version)
================================================
Uploads ONLY cleaned_review.csv and report.pdf
"""
import os
import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, timezone

# Load environment variables
env_path = os.path.join(os.path.dirname(__file__), "website", "backend", ".env")
load_dotenv(env_path)

MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DB = os.getenv("MONGODB_DB", "sentiment_reports")

# Configured to only upload what you requested
DATASETS = {
    "cleaned_review": "cleaned_review.csv"
}
REPORT_PATH = "report.pdf"
CHUNK_SIZE = 5000

def main():
    print("\n🚀 Starting Minimalist Upload...")
    
    if not MONGODB_URI:
        print("❌ Error: MONGODB_URI not found in .env")
        return

    try:
        client = MongoClient(MONGODB_URI)
        db = client[MONGODB_DB]

        # Step 1: Cleanup
        print(f"🧹 Purging old data in '{MONGODB_DB}' to free space...")
        for coll in db.list_collection_names():
            db[coll].drop()
        print("✅ Space freed.")

        # Step 2: Upload CSV
        for name, filename in DATASETS.items():
            path = os.path.join(os.path.dirname(__file__), filename)
            if not os.path.exists(path):
                print(f"⚠️ Skipping {filename}: File not found.")
                continue

            print(f"🔄 Uploading {filename} in chunks...")
            coll = db[name]
            total_rows = 0
            
            for chunk in pd.read_csv(path, chunksize=CHUNK_SIZE):
                # Replace NaN with None for MongoDB compatibility
                records = chunk.where(pd.notnull(chunk), None).to_dict("records")
                coll.insert_many(records)
                total_rows += len(records)
            print(f"✅ Success: Uploaded {total_rows} rows to collection '{name}'.")

        # Step 3: Upload PDF
        if os.path.exists(REPORT_PATH):
            print(f"🔄 Uploading {REPORT_PATH}...")
            with open(REPORT_PATH, "rb") as f:
                db["report_files"].insert_one({
                    "filename": "report.pdf",
                    "data": f.read(),
                    "uploaded_at": datetime.now(timezone.utc).isoformat()
                })
            print(f"✅ Success: Report uploaded to 'report_files'.")
        else:
            print(f"⚠️ Skipping {REPORT_PATH}: File not found.")

        # Step 4: Set status for website
        db["upload_metadata"].update_one(
            {"upload_complete": True},
            {"$set": {
                "last_upload": datetime.now(timezone.utc).isoformat(),
                "available_datasets": list(DATASETS.keys())
            }},
            upsert=True
        )
        print("\n✨ ALL DONE! The website download buttons are now active.")
        
    except Exception as e:
        print(f"\n❌ FATAL ERROR: {e}")
        if "quota" in str(e).lower():
            print("💡 Your MongoDB Atlas cluster is still full. Please delete other databases in your Atlas dashboard.")
    finally:
        client.close()

if __name__ == "__main__":
    main()
