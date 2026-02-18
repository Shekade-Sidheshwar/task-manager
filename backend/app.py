# from flask import Flask
# from database import db
# from routes.task_routes import task_bp
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Sidheshwar%40123@localhost/task_manager'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db.init_app(app)
# app.register_blueprint(task_bp)

# with app.app_context():
#     db.create_all()

# if __name__ == "__main__":
#     app.run(debug=True)

import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from database import db
from routes.task_routes import task_bp
# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get values from .env
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

# Configure Database
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

# Initialize DB
db.init_app(app)
app.register_blueprint(task_bp)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)