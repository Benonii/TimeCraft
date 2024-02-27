#!/usr/bin/python3

''' Initalization model creates a storage object '''

from models.engine.storage import Storage

from models.user import User
from models.task import Task
from models.dailylog import DailyLog
from os import getenv

storage = Storage()

storage.reload()
