from flask import Blueprint, request, jsonify
import fitz

upload_bp = Blueprint('upload', __name__)

@upload_bp.route('/upload', methods=['POST'])
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
