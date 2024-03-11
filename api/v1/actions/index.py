#!/usr/bin/python

""" Index """

from api.v1.actions import app_actions
from flask import jsonify, request, abort

@app_actions.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})
