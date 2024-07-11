from flask import Flask, jsonify, request
from flask_cors import CORS;
from elasticsearch import Elasticsearch
from filter_resumes import FilterResumes


app = Flask(__name__)
CORS(app)
filter_resumes = FilterResumes()

@app.route('/', methods=['GET'])
def index():
    return "Backend is working"

@app.route('/es-test')
def es_test():
    if filter_resumes.es.ping():
        # return jsonify({"status: Elasticsearch is connected"})
        return "status: elastic search is connected"
    else:
        # return jsonify({"status: elasticsearch is not connected"})
        return "status: elasticsearch is not connected"
    

@app.route('/upload', methods=['POST'])
def upload():
    return "upload"

if __name__ == '__main__':
    app.run(debug=True)