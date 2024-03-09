#!/usr/bin/python

""" Index """

from api.v1.actions import actions

@app_vies.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})
