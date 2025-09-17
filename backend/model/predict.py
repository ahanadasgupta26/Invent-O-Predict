import joblib
import pandas as pd
import os
from .pipeline import build_pipeline

def predict_stockout(input_file):
    # Load model
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "demand_forecast_model.pkl")
    model = joblib.load(MODEL_PATH)

    # Process dataset
    final_df = build_pipeline(input_file)

    features = [
        'net_stock', 'total_quantity', 'active_days', 'avg_daily_sales',
        'month', 'dayofweek', 'quarter',
        'avg_sales_per_month', 'category_encoded', 'reorder_threshold'
    ]

    X_new = final_df[features].fillna(0)
    predicted_days = model.predict(X_new).astype(int)

    pred_df = pd.DataFrame({
        "Product_id": final_df["product_id"],
        "Product_name": final_df.get("product_name", "Unknown"),
        "Category": final_df.get("category", "Unknown"),
        "Days_left_to_stockout": predicted_days,
        "Predicted_stockout_date": final_df["last_inventory_date"] + pd.to_timedelta(predicted_days, unit="D")
    })

    return pred_df