#!/usr/bin/python
""" Handles creation of a new User """

from models import storage
from models.user import User
from api.v1.actions import app_actions
from flasgger.utils import swag_from
from flask import jsonify, request, abort


@app_actions.route('/new_user', methods=['POST'], strict_slashes=False)
def new_user():
    """ Creates a new user """
    user_dict = dict()
    name = request.form.get('username')
    # weekly work hours goal
    wwg = request.form.get('weekly_hours')
    work_days = request.form.get('work_days')

    print(wwg)
    # print(request.json)
    user_dict['name'] = name
    user_dict['weekly_work_hours_goal'] = float(wwg)
    user_dict['number_of_work_days'] = int(work_days)

    new_user = User(**user_dict)
    storage.new(new_user)
    storage.save()

    return jsonify({'User ID': new_user.id})
