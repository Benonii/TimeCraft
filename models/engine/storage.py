#!/usr/bin/env python3

''' Handles the database storage for TimeCraft '''

import os
import sys
import sqlalchemy
from sqlalchemy import (create_engine)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from models.basemodel import Base
from models.user import User
from models.task import Task
from models.dailylog import DailyLog


class DBStorage:
    ''' This class defines handles the storage of our data '''

    __engine = None
    __session = None

    def __init__(self):
        ''' Insantization '''
        env = os.environ.get('HBNB_ENV')
        self.__engine = create_engine('mysql+mysqldb:'\
                                      +'//tc_dev:tc_dev_pwd_4796@localhost'\
                                      +'/tc_dev_db')
        if env == "test":
            Base.metadata.drop_all(self.__engine)

    def all_tasks(self, usr):
        ''' Query the current databse session all tasks belonging to the user
        '''
        objs = dict()

        if type(user) is str:
            usr = eval(usr)
        usr_id = usr.id

        tasks = self.__session.query(Task)

        for task in tasks:
            if task.user_id == usr_id:
                key = f"{task.name}.{task.id}"
                objs[key] = task
        return objs
    
    def total_time_on_task(self, usr, task=None):
        ''' Gets the total time spent across all tasks OR
            total time spent on one task if task is specified '''

        tasks = all_tasks(self, usr)

        if task:
            for tsk in tasks:
                if tsk.id == task.id:
                    return task.total_time_on_task

        for tsk in tasks:
            total_time_on_tasks += tsk.total_time_on_task
        return total_time_on_task
        
    def new(self, obj):
        ''' Adds a new object to the session '''
        self.__session.add(task)

    def save(self):
        self.__session.commit()

    def delete(self, obj):
        if obj:
            self.__session.delete(obj)

    def reload(self):
        ''' Creates all tables in the database and the current db session '''
        Base.metadata.create_all(self.__engine)

        session_factory = sessionmaker(bind=self.__engine,
                                       expire_on_commit=False)

        Session = scoped_session(session_factory)
        self.__session = Session()

    def close(self):
        ''' Closes the current session '''
        self.__session.close()
