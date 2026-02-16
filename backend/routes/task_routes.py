from flask import Blueprint, request, jsonify
from models.task_model import Task
from database import db

task_bp = Blueprint("task_bp", __name__)

@task_bp.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()
    new_task = Task(title=data["title"], description=data["description"])
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task added successfully"})
