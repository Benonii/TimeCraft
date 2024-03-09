#!/usr/bin/python
""" Handles creation of a new User """

from models import storage
from models.user import User
from api.v1.actions import app_actions
from flasgger.utils import swag_from


@app_actions.route('/new_user', methods=['POST'], strict_slashes=False)
def new_user():
    """ Creates a new user """
    user_dict = dict()
    name = request.form.get('username')
    # weekly work hours goal
    wwg = request.form.get('weekly-hours')
    work_days = request.form.get('work-days')

    if type(name) is not str and name == "":
        return jsonify({})
    if type(wwg) not int or type(wwg) not float:
        return jsonify({})
    if type(work_days) not int:
        return jsonify({})

    user_dict['name'] = name
    user_dict['weekly_work_hours_goal'] = wwg
    user_dict['number_of_work_days'] = work_days

    new_user = User(**user_dict)
    new_user.save()

    return jsonify({'User ID': new_user.id})
