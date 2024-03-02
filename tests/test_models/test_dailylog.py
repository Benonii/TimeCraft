#!/usr/bin/python3

""" This module contains tasks for dailylog.py """

import unittest
from models.dailylog import DailyLog


class TestLog(unittest.TestCase):
    """ Tests the class DailyLog """
    def test_dailylog_attrs(self):
        """ Tests the attributes of the dailylog class """
        log = DailyLog()
        log.month = "March"
        log.day = 2
        log.year = 2024
        log.task_id = "This is the task id"
        log.time_on_task = 3
        log.time_wasted = 1.2
        log.day_of_week = "Saturday"

        self.assertEqual(type(log), DailyLog)
        self.assertEqual(log.month, "March")
        self.assertEqual(log.day, 2)
        self.assertEqual(log.task_id, "This is the task id")
        self.assertEqual(log.time_on_task, 3)
        self.assertEqual(log.time_wasted, 1.2)
        self.assertEqual(log.day_of_week, "Saturday")
