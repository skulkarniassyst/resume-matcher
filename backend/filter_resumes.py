# from sentence_transformers import SentenceTransformer
# from elasticsearch import Elasticsearch
# import spacy



# class FilterResumes:
#     def __init__(self):
#         self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
#         self.es = Elasticsearch(['https://localhost:9200'],
#         basic_auth=['elastic', 'C3t8n2uDYd=K_kIT9TJw'],
#         verify_certs=False
#         )
#         self.nlp = spacy.load("en_core_web_sm")


#     def parse_resumes(self, pdf_file_path):
#         pass

#     def extract_entities(self, text):
#         doc = self.nlp(text)
#         entities = {ent.label_: ent.text for ent in doc.ents}
#         return entities
    
#     def embed_text(self, texts):
#         embeddings = self.model.encode(texts)
#         return embeddings
    
#     def store_embeddings(self, resume_embeddings, resumes):
#         for i, embedding in enumerate(resume_embeddings):
#             self.es.index(index='resume', id=i, body={
                
#             })
