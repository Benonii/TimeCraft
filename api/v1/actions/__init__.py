#!/usr/bin/python3
""" Blueprint for API """
from flask import Blueprint

# Create the blueprint
app_actions = Blueprint('actions', __name__, url_prefix='')

# Import all the views(actions)
from api.v1.actions.index import *
from api.v1.actions.user import *
from api.v1.actions.task import *
from api.v1.actions.log import *
from api.v1.actions.report import *
