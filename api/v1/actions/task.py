#!/usr/bin/python

""" Handles all commands related to Tasks """

from models.__init__ import storage
from models.task import Task
from models.user import User
from api.v1.actions import app_actions
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from


@app_actions.route('/new_task', methods=['POST'], strict_slashes=False)
def new_task():
    """ Creates a new task """
    user_id = request.form.get('userId')

    task_dict = dict()
    user = storage.get_user(user_id)
    print(type(user))
    task_dict['user_id'] = user_id
    task_dict['task_name'] = request.form.get('taskName')
    task_dict['daily_goal'] = float(request.form.get('dailyGoal'))
    task_dict['weekly_goal'] = task_dict['daily_goal'] *\
                                user.number_of_work_days

    new_task = Task(**task_dict)
    storage.new(new_task)
    storage.save()

    return jsonify({'Task ID': new_task.id})


@app_actions.route('/all_tasks', methods=['GET'], strict_slashes=False)
def all_tasks():
    """ Gets all tasks asscosiated with the user """
    user_id = request.form.get('user_id')
    user = storage.get_user(user_id)
    user_task_names = []

    tasks = storage.get_task()
    for task in tasks:
        if task.user_id == user_id:
            user_task_names.append(task.name)
    
    return jsonify(user_task_names)


@app_actions.route('/ttot', methods=['GET'], strict_slashes=False)
def total_time_on_task():
    """ Gets the total time spent on task """
    task_id = request.form.get('task-id')
    task = storage.get_task(task_id)

    return jsonify(task.total_time_on_task)


@app_actions.route("/delete_task", methods=['DELETE'], strict_slashes=False)
def delete_task():
    """ Deletes a task. """
    task_id = request.form.get("task_id")
    task = storage.get_task(task_id)

    task.delete()

    return jsonify({'status': 'OK'})
