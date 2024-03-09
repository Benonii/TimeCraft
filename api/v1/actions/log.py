#!/usr/bin/python
""" Handles creation of a new User """

from models import storage
from models.user import User
from models.dailylog import DailyLog
from api.v1.actions import app_actions
from flasgger.utils import swag_from


@app_actions.route('/new_log', methods=['POST'], strict_slashes=False)
def new_log():
    """ Creates a new log """
    log_dict = dict()
    log_dict['task_id'] = request.form.get('task-id')
    task = storage.get_task(task_id)
    user = storage.get_user(task.user_id)
    tot = request.form.get('time-on-task')
    tw = request.form.get('time-wasted')

    log_dict['month'] = request.form.get('month')
    log_dict['day'] = request.form.get('day')
    log_dict['year'] = request.form.get('year')
    log_dict['date'] = request.form.get('log-date')
    log_dict['day_of_week'] = request.form.get('Dow')
    log_dict['time_on_task'] = tot
    log_dict['time_wasted'] = tw

    task.total_time_on_task += tot
    user.total_productive_time += tot
    user.total_wasted_time += tw

    new_log = Log(**log_dict)
    new_log.save()

    return jsonify({'Log Date': new_log.date})
