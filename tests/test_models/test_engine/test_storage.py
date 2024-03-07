#!/usr/bin/python
""" This module contains tests for storage.py """

import unittest
from models import storage
from models.user import User
from models.task import Task
from models.dailylog import DailyLog


class TestUserTaskStorage(unittest.TestCase):
    """ Tests if storage is working properly for the BaseModel class """

    def setUp(self):
        """ Creates an instance of the class """
        self.user_1 = User()
        self.user_1.name = "Drake"
        self.user_1.weekly_work_hours_goal = 80
        self.user_1.number_of_work_days = 6
        self.user_1.total_productive_time = 120
        self.user_1.total_wasted_time = 40

        self.user_2 = User()
        self.user_2.name = "Josh"
        self.user_2.weekly_work_hours_goal = 40
        self.user_2.number_of_work_days = 5
        self.user_2.total_productive_time = 74
        self.user_2.total_wasted_time = 60

        self.task_1 = Task()
        self.task_2 = Task()
        self.task_3 = Task()
        self.task_4 = Task()

        self.task_1.task_name = "study"
        self.task_1.daily_goal = 4
        self.task_1.weekly_goal = 24
        self.task_1.user_id = self.user_1.id

        self.task_2.task_name = "read"
        self.task_2.daily_goal = 2
        self.task_2.weekly_goal = 12
        self.task_2.user_id = self.user_1.id

        self.task_3.task_name = "exercise"
        self.task_3.daily_goal = 1.5
        self.task_3.weekly_goal = 9
        self.task_3.user_id = self.user_2.id

        self.task_4.task_name = "code"
        self.task_4.daily_goal = 6
        self.task_4.weekly_goal = 36
        self.task_4.user_id = self.user_2.id

        storage.new(self.user_1)
        storage.new(self.user_2)
        storage.save()

        storage.new(self.task_1)
        storage.new(self.task_2)
        storage.new(self.task_3)
        storage.new(self.task_4)

        storage.save()

    def tearDown(self):
        pass

    def test_all_tasks(self):
        """ Tests if the all_task method is working properly """
        # List of tasks for user 1
        tasks_1 = storage.all_tasks(self.user_1)
        # List of tasks for user 2
        tasks_2 = storage.all_tasks(self.user_2)

        self.assertEqual(len(tasks_1), 2)
        for task in tasks_1:
            self.assertEqual(type(task), Task)
            self.assertEqual(task.user_id, self.user_1.id)
            self.assertEqual(type(task.task_name), str)
            self.assertEqual(type(task.daily_goal), int)
            self.assertEqual(type(task.weekly_goal), int)
            self.assertEqual(task.total_time_on_task, 0.0)

        for task in tasks_2:
            self.assertEqual(type(task), Task)
            self.assertEqual(task.user_id, self.user_2.id)
            self.assertEqual(type(task.task_name), str)
            # self.assertEqual(type(task.daily_goal), int)
            self.assertEqual(type(task.weekly_goal), int)
            self.assertEqual(task.total_time_on_task, 0.0)

    def test_ttot(self):
        """ Tests the total_time_on_task() method """
        # total time on task
        ttot_1 = storage.total_time_on_task(self.user_1, self.task_1)
        ttot_2 = storage.total_time_on_task(self.user_1)
        ttot_3 = storage.total_time_on_task(self.user_1, self.task_2)

        self.assertEqual(ttot_1, 0)
        self.assertEqual(ttot_2, 0)
        self.assertEqual(ttot_3, 0)

        ttot_4 = storage.total_time_on_task(self.user_2, self.task_3)
        ttot_5 = storage.total_time_on_task(self.user_2)
        ttot_6 = storage.total_time_on_task(self.user_2, self.task_4)

        self.assertEqual(ttot_1, 0)
        self.assertEqual(ttot_2, 0)
        self.assertEqual(ttot_3, 0)

    def test_get_user(self):
        """ Tests the get_user() method """
        all_users = storage.get_user()
        user_1 = storage.get_user(self.user_1.id)
        user_2 = storage.get_user(self.user_2.id)

        # self.assertEqual(len(all_users), 2)
        for user in all_users:
            self.assertEqual(type(user), User)

        self.assertIs(user_1, self.user_1)
        self.assertIs(user_2, self.user_2)

    '''
    def test_delete(self):
        """ Tests the delete() method """
        storage.delete(self.user_1)
        storage.save()
        users = storage.get_user()

        self.assertEqual(len(users), 1)

        storage.delete(self.user_2)
        storage.save()
        users = storage.get_user()

        self.assertIs(users, None)'''


class TestLogStorage(unittest.TestCase):
    """ Tests if storage is working properly for the DailyLog class """
    def setUp(self):
        """ The set up """

        self.user_1 = User()
        self.user_1.name = "Drake"
        self.user_1.weekly_work_hours_goal = 80
        self.user_1.number_of_work_days = 6
        self.user_1.total_productive_time = 120
        self.user_1.total_wasted_time = 40

        self.task_1 = Task()
        self.task_1.task_name = "study"
        self.task_1.daily_goal = 4
        self.task_1.weekly_goal = 24
        self.task_1.user_id = self.user_1.id

        self.log_1 = DailyLog()
        self.log_1.month = "March"
        self.log_1.day = 2
        self.log_1.year = 2024
        self.log_1.id = "March.2.2024"
        self.log_1.task_id = self.task_1.id
        self.log_1.time_on_task = 2.5
        self.log_1.time_wasted = 2
        self.log_1.day_of_week = "Saturday"

        self.log_2 = DailyLog()
        self.log_2.month = "March"
        self.log_2.day = 4
        self.log_2.year = 2024
        self.log_2.id = "March.4.2024"
        self.log_2.task_id = self.task_1.id
        self.log_2.time_on_task = 5
        self.log_2.time_wasted = 2
        self.log_2.day_of_week = "Monday"

        storage.new(self.user_1)
        storage.save()
        storage.new(self.task_1)
        storage.save()
        storage.new(self.log_1)
        storage.new(self.log_2)

        storage.save()

    def test_get_logs(self):
        """ tests the method get_logs_of_the_day() """
        all_logs = storage.get_logs_of_the_day()
        march_2 = storage.get_logs_of_the_day("March.2.2024")
        march_4 = storage.get_logs_of_the_day("March.4.2024")

        # self.assertEqual(all_logs.length(), 2)
        for log in all_logs:
            self.assertEqual(type(log), DailyLog)
        self.assertEqual(march_2[0], self.log_1)
        self.assertEqual(march_4[0], self.log_2)

    def check_time_on_task(self):
        """ This checks that time_on_task and time_wasted are being updated
            in the task attributes and user attributes """
        # total time on task
        ttot = self.log_1.time_on_task + self.log_2.time_on_task
        # total wasted time
        twt = self.log_1.time_wasted + self.log_2.time_wasted

        self.assertEqual(self.task_1.total_time_on_task,
                         ttot)
        self.assertEqual(self.task_1.total_wasted_time,
                         twt)

        self.assertEqual(self.user_1.total_productive_time,
                         ttot)
        self.assertEqual(self.user_1.total_wasted_time,
                         twt)
    '''
    def test_delete(self):
        """ Checks the delete() method """
        storage.delete(self.log_1)
        storage.save()
        logs = storage.get_logs_of_the_day()
        self.assertEqual(len(logs), 1)


        storage.delete(self.log_2)
        storage.save()
        logs = storage.get_logs_of_the_day()
        self.assertIs(logs, None)'''


if __name__ == "__main__":
    unittest.main()
