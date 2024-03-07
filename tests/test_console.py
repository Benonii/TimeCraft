#!/usr/bin/python3
""" This module contains tests for timecraft.py """

import unittest
import sys
from io import StringIO
from unittest.mock import patch
from timecraft import TcCommand
from models import storage
from models.basemodel import BaseModel
from models.user import User
from models.task import Task
from models.dailylog import DailyLog


class TestCommmands(unittest.TestCase):
    """ Tests the methods that don't handle major functionalities """
    @patch('sys.stdout', new_callable=StringIO)
    def assert_stdout(self, expected_output, mock_stdout, command):
        with patch('builtins.input', side_effect=[command, 'quit']):
            # Pass mock_stdout to my console
            app = TcCommand(stdin=None, stdout=mock_stdout)
            app.cmdloop()
            # Access the value stored in mock_stdout and call strip() on it
            output = mock_stdout.getvalue().strip()
            self.assertEqual(output, expected_output)

    def test_quit_command(self):
        """ Tests the quit command """
        self.assert_stdout("Bye!", 'quit')


if __name__ == '__main__':
    unittest.main()
