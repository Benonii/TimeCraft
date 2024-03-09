#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

app_actions = Blueprint('actions', __name__, url_prefix='tc/v1')

from api.v1.actions.new_user import *
