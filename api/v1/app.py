#!/usr/bin/python3
""" Flask App """

from models import storage
from os import environ
from flask import Flask, render_template, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger
from flasgger.utils import swag_from
from api.v1.actions import app_actions
from rtime_craft.src import components

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT-REGULAR'] = True
app.register_blueprint(app_actions, url_prefix="/tc/v1")
CORS(app, resources={r"/tc/v1/*": {"origins": "http://localhost:3000"}})


@app.teardown_appcontext
def close_db(error):
    """ Terminate database session """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ 404 Error
    ---
    response:
      404:
        description: a resource was not found
    """
    return make_response(jsonify({'error': "NOT FOUND"}), 404)


app.config['SWAGGER'] = {
    'title': 'TimeCraft',
    'uiversion': 3
}

Swagger(app)


if __name__ == "__main__":
    """ Main Function """
    host = environ.get('HBNB_API_HOST')
    port = environ.get('HBNB_API-PORT')
    if not host:
        host = '0.0.0.0'
    if not port:
        port = 5001
    app.run(host=host, port=port, threaded=True,debug=True)
