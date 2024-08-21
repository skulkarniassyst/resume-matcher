from flask import Flask
from flask_cors import CORS
from routes import upload_bp, evaluate_bp

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    # Register Blueprints
    app.register_blueprint(upload_bp)
    app.register_blueprint(evaluate_bp)
    
    return app

if __name__ == '__main__':
    from utils.logger import configure_logging
    configure_logging()

    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
