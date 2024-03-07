#!/usr/bin/python3
""" This module contains tests for task.py """

import unittest
import sqlalchemy
from models.task import Task


class TestTask(unittest.TestCase):
    """ Tests the Task class """

    def test_task_attrs(self):
        """ Tests if the task attributes work correctly """
        task = Task()
        task.task_name = "Study"
        task.daily_goal = 6
        task.weekly_goal = 36
        task.user_id = "this is the user id"

        self.assertEqual(type(task), Task)
        self.assertEqual(task.task_name, "Study")
        self.assertEqual(task.daily_goal, 6)
        self.assertEqual(task.weekly_goal, 36)
        self.assertEqual(task.user_id, "this is the user id")
        self.assertEqual(type(task.logs),
                         sqlalchemy.orm.collections.InstrumentedList)


if __name__ == "__main__":
    unittest.main()
