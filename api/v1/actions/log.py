#!/usr/bin/python
""" Handles creation of a new User """

from models import storage
from models.user import User
from models.task import Task
from models.dailylog import DailyLog
from api.v1.actions import app_actions
from flasgger.utils import swag_from
from flask import jsonify, request, abort
from datetime import datetime


@app_actions.route('/new_log', methods=['POST'], strict_slashes=False)
def new_log():
    """ Creates a new log """

    # Empty Dictionary
    log_dict = dict()

    # Save all the form data in variables
    task_id = request.form.get('taskId')
    print(task_id)
    log_dict['task_id'] = task_id
    task = storage.get_task(task_id)
    if task is None:
        print("No task with that ID")
        return jsonify({})

    user = storage.get_user(task.user_id)
    tot = float(request.form.get('timeOnTask'))
    tw = float(request.form.get('timeWasted'))

    # Calculate the month, day and year of the day the log is being made
    month = datetime.today().strftime("%B")
    day = datetime.today().strftime("%-d")
    year = datetime.today().strftime("%Y")

    # Store all the above data in the dictionary
    log_dict['month'] = month
    log_dict['day'] = day
    log_dict['year'] = year
    log_dict['date'] = f"{month}.{day}.{year}"
    log_dict['day_of_week'] = datetime.today().weekday()
    log_dict['time_on_task'] = tot
    log_dict['time_wasted'] = tw

    # Update metrics that need to be changed on User and Task objects
    task.total_time_on_task += tot
    user.total_productive_time += tot
    user.total_wasted_time += tw

    # Creates a new log object and saves it
    new_log = DailyLog(**log_dict)
    storage.new(new_log)
    storage.save()

    return jsonify({'log_date': new_log.date})
