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

#list items

@task_bp.route("/tasks/completed", methods=["GET"])
def get_completed_tasks():
    try:
        completed_tasks = Task.query.filter_by(status="Completed").all()

        result = []
        for t in completed_tasks:
            result.append({
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "status": t.status
            })

        return jsonify({
            "success": True,
            "data": result
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500

