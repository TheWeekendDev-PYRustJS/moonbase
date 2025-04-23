from flask import Flask, request, jsonify
from flask_cors import CORS
import csv
import os

app = Flask(__name__)
CORS(app)


# Function to write data to CSV file
def write_to_csv(formData):
    file_exists = os.path.isfile('/contacts.csv')

    with open('./contacts.csv', mode='a', newline='') as database:
        writer = csv.writer(database)

        # Write headers only if the file is new
        if not file_exists:
            writer.writerow(["Name", "Email", "Message"])

        writer.writerow([formData['name'], formData['email'], formData['message']])


@app.route('/Contact', methods=['POST'])
def submit_form():
    try:
        formData = request.get_json()

        # Validate required fields
        if not all(key in formData for key in ["name", "email", "message"]):
            return jsonify({"error": "Missing required fields"}), 400

        write_to_csv(formData)
        return jsonify({"message": "Success"}), 200

    except Exception as e:
        print(f"Error: {e}")  # Log the error for debugging
        return jsonify({"error": "Failed to save data"}), 500


if __name__ == '__main__':
    app.run(port=5001, debug=True)
