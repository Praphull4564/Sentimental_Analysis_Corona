import pandas as pd
import os
from glob import glob

def merge_twitter_csv_files(input_path: str, output_file: str) -> None:
    
    expected_columns = [
        'id', 'text', 'created_at', 'retweet_count', 'favorite_count', 
        'source', 'length', 'user_id', 'user_screen_name', 'user_name',
        'user_created_at', 'user_description', 'user_followers_count',
        'user_friends_count', 'user_location', 'user_statuses_count',
        'user_verified', 'user_url', 'number_of_QuestionMarks', 'user_has_url'
    ]
    
    # Get list of all CSV files
    csv_files = glob(os.path.join(input_path, "*.csv"))
    
    if not csv_files:
        raise ValueError(f"No CSV files found in {input_path}")
    
    print(f"Found {len(csv_files)} CSV files to merge")
    
    # Initialize list to store dataframes
    dfs = []
    
    # Read each CSV file
    for file in csv_files:
        try:
            # Read CSV
            df = pd.read_csv(file)
            
            # Add missing columns with null values
            for col in expected_columns:
                if col not in df.columns:
                    df[col] = None
                    print(f"Added missing column '{col}' in file: {os.path.basename(file)}")
            
            # Reorder columns to match expected_columns
            df = df.reindex(columns=expected_columns)
            
            # Add source file information
            df['source_file'] = os.path.basename(file)
            
            dfs.append(df)
            print(f"Successfully processed: {os.path.basename(file)}")
            print(f"Number of rows: {len(df)}")
            
        except Exception as e:
            print(f"Error processing {os.path.basename(file)}: {str(e)}")
    
    if not dfs:
        raise ValueError("No data frames were created. Check if files are valid CSV files.")
    
    # Merge all dataframes
    merged_df = pd.concat(dfs, ignore_index=True)
    
    # Convert specific columns to appropriate types
    type_conversions = {
        'id': 'Int64',  # Using Int64 to handle nullable integers
        'retweet_count': 'Int64',
        'favorite_count': 'Int64',
        'length': 'Int64',
        'user_id': 'Int64',
        'user_followers_count': 'Int64',
        'user_friends_count': 'Int64',
        'user_statuses_count': 'Int64',
        'user_verified': 'boolean',
        'user_has_url': 'boolean',
        'number_of_QuestionMarks': 'Int64'
    }
    
    for col, dtype in type_conversions.items():
        try:
            merged_df[col] = merged_df[col].astype(dtype)
        except Exception as e:
            print(f"Warning: Could not convert {col} to {dtype}: {str(e)}")
    
    # Save merged dataframe
    merged_df.to_csv(output_file, index=False)
    
    # Print summary
    print("\nMerge Summary:")
    print(f"Total input files: {len(csv_files)}")
    print(f"Total rows in merged file: {len(merged_df)}")
    print(f"Columns in merged file: {len(merged_df.columns)}")
    print(f"\nMerged CSV file saved as: {output_file}")
    
    # Print sample of missing values
    missing_values = merged_df.isnull().sum()
    if missing_values.any():
        print("\nMissing values per column:")
        for col, count in missing_values[missing_values > 0].items():
            print(f"{col}: {count} missing values")

if __name__ == "__main__":
    try:
        # merge_twitter_csv_files(
        #     input_path="D:\ProjectExhibition1\ProjectExb\CoronaTweets W1",  
        #     output_file="Corona_Wave1.csv"
        # )
        merge_twitter_csv_files(
            input_path="D:\ProjectExhibition1\ProjectExb",  
            output_file="Corona.csv"
        )
        # merge_twitter_csv_files(
        #     input_path="D:\ProjectExhibition1\ProjectExb\CoronaTweets W2",  
        #     output_file="Corona_Wave2.csv"
        # )



    except Exception as e:
        print(f"Error: {str(e)}")

        