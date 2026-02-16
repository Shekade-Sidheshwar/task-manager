from flask import Flask
from database import db
from routes.task_routes import task_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Sidheshwar%40123@localhost/task_manager'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
app.register_blueprint(task_bp)

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
