from flask import Blueprint, request, jsonify
import logging
from services.question_answer import get_answer
from services.grammar_check import correct_input_transformers

evaluate_bp = Blueprint('evaluate', __name__)

@evaluate_bp.route('/evaluate', methods=['POST'])
def ask_question():
    try:
        data = request.json
        question = data['question']
        context = data['context']

        # Preprocess the question only if it's detected as needing correction
        processed_question = correct_input_transformers(question)

        # Log the processed question to debug
        logging.debug(f"Received question: {question}")
        logging.debug(f"Received processed question: {processed_question}")
        
        # Generate a response
        answer = get_answer(processed_question, context)
        logging.debug(f"Received answer: {answer}")

        if len(answer) < 3 or "[CLS]" in answer:
            answer = "I couldn't find a confident answer. Could you provide more details?"

        return jsonify({"answer": answer})
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        return jsonify({"error": "An error occurred while processing the request."}), 500
