from flask import Flask, jsonify, request
from flask_cors import CORS
from elasticsearch import Elasticsearch
# from filter_resumes import FilterResumes
import fitz
# import json
from transformers import GPT2LMHeadModel, GPT2Tokenizer, pipeline
import torch


app = Flask(__name__)
CORS(app)
# filter_resumes = FilterResumes()

model_name = "gpt2" 
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
generator = pipeline("text-generation", model=model, tokenizer=tokenizer)


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

@app.route('/evaluate', methods={'POST'})
def evaluate():
    data = request.json
    resume = data.get('resume')
    jd = data.get('jd')

    if not resume or not jd:
        return jsonify({"error": "Both resume and job description are required"}), 400

    # Create the prompt for the model
    prompt = (
        f"Given the following resume and job description, evaluate the candidate's suitability "
        f"for the position. Provide a detailed, human-readable response explaining the strengths "
        f"and weaknesses of the candidate with respect to the job requirements.\n\n"
        f"Resume:\n{resume}\n\nJob Description:\n{jd}\n\n"
        f"Human-readable evaluation:"
    )
    # Get the model's evaluation
    result = generator(prompt, max_new_tokens=150, num_return_sequences=1)  # Adjust max_length as needed
    result_texts = [res['generated_text'] for res in result]

    # Ensure the result is a string
    result_str = str(result_texts)

    # Create response object
    return jsonify({
        'evaluation': result_str,
    })


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)