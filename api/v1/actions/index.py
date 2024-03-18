#!/usr/bin/python

""" Index """

from api.v1.actions import app_actions
from flask import jsonify, request, abort


# Returns a status indicator for the API
@app_actions.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})
