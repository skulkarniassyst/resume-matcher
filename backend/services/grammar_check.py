from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

model_name = "prithivida/grammar_error_correcter_v1"
grammar_tokenizer = AutoTokenizer.from_pretrained(model_name)
grammar_model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

def correct_input_transformers(input_text):
    inputs = grammar_tokenizer(input_text, return_tensors="pt", padding=True)
    outputs = grammar_model.generate(**inputs)
    corrected_text = grammar_tokenizer.decode(outputs[0], skip_special_tokens=True)
    return corrected_text
