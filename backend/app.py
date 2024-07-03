from flask import Flask, jsonify, request
from flask_cors import CORS;
from elasticsearch import Elasticsearch
# from filter_resumes import filter_resumes

app = Flask(__name__)
CORS(app)

es = Elasticsearch(
    ['https://localhost:9200'],
    http_auth=('elastic', 'C3t8n2uDYd=K_kIT9TJw'),
    verify_certs=False
)

@app.route('/', methods=['GET'])
def index():
    return "Backend is working"

@app.route('/es-test')
def es_test():
    if es.ping():
        # return jsonify({"status: Elasticsearch is connected"})
        return "status: elastic search is connected"
    else:
        # return jsonify({"status: elasticsearch is not connected"})
        return "status: elasticsearch is not connected"

if __name__ == '__main__':
    app.run(debug=True)