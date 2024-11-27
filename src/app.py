import pandas as pd
from flask import Flask, request, jsonify
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import numpy as np
import joblib
from flask_cors import CORS


app = Flask(__name__)
CORS(app) 


def load_data():

    df = pd.read_csv('../public/f2.csv')  
    print(f"Columns in the dataset: {df.columns}")

 
    X = df[['Temparature', 'Humidity', 'Moisture', 'Soil_Type', 'Crop_Type',
            'Nitrogen', 'Potassium', 'Phosphorous']]  
    y = df['Fertilizer']  

   
    numeric_features = ['Temparature', 'Humidity', 'Moisture', 'Nitrogen', 'Potassium', 'Phosphorous']
    categorical_features = ['Soil_Type', 'Crop_Type']

  
    numeric_transformer = Pipeline(steps=[ 
        ('imputer', SimpleImputer(strategy='mean')),
        ('scaler', StandardScaler())
    ])


    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='most_frequent')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

 
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ]
    )


    X_transformed = preprocessor.fit_transform(X)

    return X_transformed, y

# Hyperparameter tuning and model training
def train_and_evaluate_model():
    # Load data
    X, y = load_data()

  
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Initialize the Decision Tree Classifier with max_depth to prevent overfitting
    model = DecisionTreeClassifier(random_state=42, max_depth=5)  # Limiting the depth of the tree

    # Use Stratified K-Folds Cross-Validation to deal with imbalanced classes
    stratified_kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    # Perform cross-validation
    cv_scores = cross_val_score(model, X_train, y_train, cv=stratified_kfold, scoring='accuracy')

 
    print(f"Cross-Validation Accuracy: {cv_scores.mean() * 100:.2f}%")

    model.fit(X_train, y_train)


    y_pred = model.predict(X_test)

 
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Accuracy: {accuracy * 100:.2f}%")

 
    joblib.dump(model, 'fertilizer_model.pkl')  

    return model


@app.route('/predict', methods=['POST'])
def predict():
    try:
       
        data = request.get_json()  
        print(f"Received data: {data}")

      
        features = np.array([[
            data['Temparature'], data['Humidity'], data['Moisture'],
            data['Soil_Type'], data['Crop_Type'],
            data['Nitrogen'], data['Potassium'], data['Phosphorous']
        ]])

       
        model = joblib.load('fertilizer_model.pkl')

     
        prediction = model.predict(features)

   
        return jsonify({'prediction': prediction[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == "__main__":

    app.run(debug=True)