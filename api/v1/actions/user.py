#!/usr/bin/python
""" Handles creation of a new User """

from models import storage
from models.user import User
from api.v1.actions import app_actions
from flasgger.utils import swag_from
from flask import jsonify, request, abort
import json


@app_actions.route('/new_user', methods=['POST'], strict_slashes=False)
def new_user():
    """ Creates a new user """
    # Empty Dictionary
    user_dict = dict()

    # Get all necessary info about User from the form
    name = request.form.get('username')
    # weekly work hours goal
    wwg = request.form.get('weekly_hours')
    work_days = request.form.get('work_days')

    # Save the data ina dictionary
    user_dict['name'] = name
    user_dict['weekly_work_hours_goal'] = float(wwg)
    user_dict['number_of_work_days'] = int(work_days)

    # Create an object based on the data and save it
    new_user = User(**user_dict)
    storage.new(new_user)
    storage.save()

    return jsonify({'user_id': new_user.id})


@app_actions.route('/get_session_user', methods=['GET'], strict_slashes=False)
def get_session_user():
    """ Gets a user for the session """
    return jsonify({"user_id": storage.user_id})


@app_actions.route('/switch_user', methods=['POST'], strict_slashes=False)
def switch_user():
    """ Changes the user for the session """
    user_id = request.json.get("userID")
    storage.user_id = user_id
    storage.save()

    return jsonify({'status': 'OK'})
