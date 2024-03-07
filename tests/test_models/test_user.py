#!/usr/bin/python3
""" This module contains unittest for user.py """

import unittest
from models.user import User
from models import storage


class TestUser(unittest.TestCase):
    """ Tests the user class """

    def setUp(self):
        """ I do need this after all """
        self.user = User()
        self.user.name = "John"
        self.user.weekly_work_hours_goal = 60
        self.user.number_of_work_days = 6
        self.user.total_productive_time = 0
        self.user.total_wasted_time = 0

    def test_user_attributes(self):
        """ Tests the type and value of a user's attributes """
        self.assertEqual(type(self.user), User)
        self.assertEqual(self.user.name, "John")
        self.assertEqual(self.user.weekly_work_hours_goal, 60)
        self.assertEqual(self.user.number_of_work_days, 6)
        self.assertEqual(self.user.total_productive_time, 0)
        self.assertEqual(self.user.total_wasted_time, 0)


if __name__ == "__main__":
    unittest.main()
