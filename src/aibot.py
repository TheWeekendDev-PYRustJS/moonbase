# Corrected Flask integration and model loading
import os
import json
import random
import nltk
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from flask import Flask, request, jsonify
from flask_cors import CORS

nltk.download('punkt')
nltk.download('wordnet')

app = Flask(__name__)
CORS(app)


# Define your PyTorch model
class ChatbotModel(nn.Module):
    def __init__(self, input_size, output_size):
        super(ChatbotModel, self).__init__()
        self.fc1 = nn.Linear(input_size, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, output_size)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.5)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x


# Chatbot assistant logic
class ChatbotAssistant:
    def __init__(self, intents_path):
        self.model = None
        self.intents_path = intents_path
        self.documents = []
        self.vocabulary = []
        self.intents = []
        self.intents_responses = {}
        self.X = None
        self.y = None
        self.parse_intents()
        self.prepare_data()

    @staticmethod
    def tokenize_and_lemmatize(text):
        lemmatizer = nltk.WordNetLemmatizer()
        words = nltk.word_tokenize(text)
        return [lemmatizer.lemmatize(word.lower()) for word in words]

    def bag_of_words(self, words):
        return np.array([1 if word in words else 0 for word in self.vocabulary])

    def parse_intents(self):
        with open(self.intents_path, 'r') as f:
            intents_data = json.load(f)

        for intent in intents_data['intents']:
            self.intents.append(intent['tag'])
            self.intents_responses[intent['tag']] = intent['responses']
            for pattern in intent['patterns']:
                pattern_words = self.tokenize_and_lemmatize(pattern)
                self.vocabulary.extend(pattern_words)
                self.documents.append((pattern_words, intent['tag']))

        self.vocabulary = sorted(set(self.vocabulary))

    def prepare_data(self):
        bags, indices = [], []
        for document in self.documents:
            bag = self.bag_of_words(document[0])
            intent_idx = self.intents.index(document[1])
            bags.append(bag)
            indices.append(intent_idx)
        self.X = np.array(bags)
        self.y = np.array(indices)

    def load_model(self, model_path, dimension_path):
        with open(dimension_path, 'r') as f:
            dims = json.load(f)
        self.model = ChatbotModel(dims['input_size'], dims['output_size'])
        self.model.load_state_dict(torch.load(model_path))
        self.model.eval()

    def process_message(self, input_message):
        words = self.tokenize_and_lemmatize(input_message)
        bag = self.bag_of_words(words)
        bag_tensor = torch.tensor([bag], dtype=torch.float32)
        with torch.no_grad():
            predictions = self.model(bag_tensor)
        predicted_intent = self.intents[torch.argmax(predictions).item()]
        responses = self.intents_responses.get(predicted_intent, ["Sorry, I don't understand."])
        return random.choice(responses)


# Initialize globally
assistant = ChatbotAssistant('intents.json')
assistant.load_model('chatbot_model.pth', 'dimensions.json')


@app.route('/Tour', methods=['POST'])
def chatbot_reply():
    data = request.get_json()
    user_message = data.get("message")
    if not user_message:
        return jsonify({"reply": "I didn't catch that, can you try again?"}), 400

    reply = assistant.process_message(user_message)
    return jsonify({"reply": reply}), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)














