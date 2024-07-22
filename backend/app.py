from flask import Flask, jsonify, request
from flask_cors import CORS
from elasticsearch import Elasticsearch
# from filter_resumes import FilterResumes
import fitz
import json


app = Flask(__name__)
CORS(app)
# filter_resumes = FilterResumes()

@app.route('/', methods=['GET'])
def index():
    return "Backend is working"

# @app.route('/es-test')
# def es_test():
#     if filter_resumes.es.ping():
#         # return jsonify({"status: Elasticsearch is connected"})
#         return "status: elastic search is connected"
#     else:
#         # return jsonify({"status: elasticsearch is not connected"})
#         return "status: elasticsearch is not connected"
    

@app.route('/upload', methods=['POST'])
def upload():
    if 'resumes' not in request.files or 'jobDescription' not in request.form:
        return jsonify({'error': 'No file or job description provided'}), 400
    
    resume = request.files['resumes']
    job_description = request.form['jobDescription']
    
    pdf_document = fitz.open(stream=resume.read(), filetype="pdf")
    text = ""
    for page_num in range(len(pdf_document)):
        page = pdf_document.load_page(page_num)
        text += page.get_text()
    
    return jsonify({
        'resume': text,
        'jd': job_description
    })

if __name__ == '__main__':
    app.run(debug=True)