#!/usr/bin/python3
""" Console Module """

import cmd
import sys
import os
import uuid
import calendar
from datetime import datetime, date, timedelta
from models.basemodel import BaseModel
from models.__init__ import storage
from models.user import User
from models.task import Task
from models.dailylog import DailyLog


class TcCommand(cmd.Cmd):
    """ Contains all the functionality for the TC console """

    # Intro message
    intro = "\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"\
            + "|                                                          |\n"\
            + "|                  Welcome to TimeCraft!                   |\n"\
            + "| You know how it doesn't feel like 24 hours are enough?   |\n"\
            + "| Well, this app is inteded to show exactly where all those|\n"\
            + "| hours are going. It also gives you daily, weekly and     |\n"\
            + "| monthly reports of your time usage.                      |\n"\
            + "| Type help and enter to see a list of commands. Enjoy!    |\n"\
            + "|                                                          |\n"\
            + " ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"\

    # Display prompt only if in interactive mode
    prompt = '|Tiempo|> ' if sys.stdin.isatty() else ''

    # Create a dictionary of our classes
    classes = {
            'BaseModel': BaseModel,
            'User': User,
            'Task': Task,
            'Log': DailyLog
        }
    dot_cmds = ['new', 'all_tasks']

    def preloop(self):
        """ Prints prompt before loop if isatty is False """
        if not sys.stdin.isatty():
            print('|Tiempo|> ')

    def precmd(self, line):
        """ Reformats commands... IDK how yet """
        _cmd = _cls = ''

        if not ('.' in line and '(' in line and ')' in line):
            return line

        try:
            parsed_line = line[:]

            # isolate the class name
            _cls = pline[:pline.find('.')]

            # isolate and validate command
            _cmd = parsed_line[pline.find('.') + 1:pline.find('(')]

            if _cmd not in TcCommand.dot_cmds:
                raise Exception
        except Exception as mess:
            pass
        finally:
            return linei

    '''def cmdloop(self):
        """ Adding an intro message to the original cmdloop """
        # print(self.intro)
        super().cmdloop()'''

    def do_quit(self, command):
        """ Exit timecraft """
        print("Bye!")
        exit()

    def help_quit(self):
        """ Prints the help documentation for quit """
        print("Exit timecraft\n")

    def do_EOF(self, arg):
        """ Handles EOF to exit the program """
        print("\n Bye!")
        exit()

    def help_EOF(self):
        """ Prints the help doc for EOF """
        print("You can also exit TimeCraft with ctrl^D")

    def emptyline(self):
        """Overrides the emptyline method of CMD"""
        pass

    def do_new(self, args):
        """ Create an object of any class """

        if not args:
            print("Missing Class name :(")
            return

        argv = args.split(" ")

        if argv[0] not in TcCommand.classes:
            print("You can only create a new User, Task or Log."
                  + " Please try again :)")
            return

        # Creates a new User
        if argv[0] == "User":
            user_dict = dict()

            try:
                name = str(input("Hey new user! What is your name? "))
                weekly_hours_goal = float(
                    input("How many hours would you like to work per week?"
                          + "(Example: 40, 55.5, 20)\n"))
                work_days = int(
                        input("How many days do you work in a week? "))
            except TypeError:
                print("Please enter the right information :|")
                return
            except Exception as e:
                print("Something seems a bit off. Please try again :)")
                return

            user_dict["name"] = name
            user_dict["weekly_work_hours_goal"] = weekly_hours_goal
            user_dict["number_of_work_days"] = work_days

            new_user = User(**user_dict)

            storage.new(new_user)
            storage.save()
            print("All done. Here is your ID, please remember it."
                  + "You will use it to create tasks and log your activity ;)")
            print(new_user.id)

        # Creates a new Task
        elif argv[0] == "Task":
            task_dict = dict()

            try:
                user_id = str(input("A new task. Cool! But first,"
                                    + " what is your ID?\n: "))
                user = storage.get_user(user_id)

                if not user:
                    print("There seems to be no user with that ID."
                          + "Please try again")
                    return

                task_name = str(input("Please name your task: "))
                total_tot = 0
                daily_goal = float(input("How much time would you like to"
                                         + " dedicate to this task everyday? "
                                         ))
                weekly_goal = daily_goal * user.number_of_work_days

            except TypeError:
                print("Please make sure you entered the correct"
                      + " data and try again :|")
                return
            except Exception as e:
                print("Something seems a bit off. Please try again :)")
                return

            task_dict["task_name"] = task_name
            task_dict["daily_goal"] = daily_goal
            task_dict["weekly_goal"] = weekly_goal
            task_dict["user_id"] = user_id

            new_task = Task(**task_dict)
            storage.new(new_task)
            storage.save()
            print("Your new task is saved! Save the task id."
                  + " You will need it to log your activity")
            print(f"Task ID: {new_task.id}")

        # Creates a new log
        elif argv[0] == "Log":
            log_dict = dict()
            try:
                task_id = str(input("What is the task ID? "))
                task = storage.get_task(task_id)

                if not task:
                    print("There seems to be no task with that ID."
                          + "Please try again")
                    return
                user = storage.get_user(task.user_id)
                month = calendar.month_name[datetime.today().month]
                day = datetime.today().day
                year = datetime.today().year
                log_id = f"{month}.{day}.{year}"
                # Day of Week
                Dow = datetime.now().strftime("%A")

                time_on_task = float(input("How much time did you spend on"
                                           + f" {task.task_name} today? "))
                task.total_time_on_task += time_on_task
                user.total_productive_time += time_on_task

                time_wasted = float(input("How much time did you waste"
                                          + " today(It's okay, I won't judge"
                                          + " ;) "))
                user.total_wasted_time += time_wasted

            except TypeError:
                print("Please make sure you entered the correct"
                      + " data and try again :|")
                return
            '''except Exception as e:
                print("Something went wrong. Please try again.")
                return'''

            log_dict["id"] = log_id
            log_dict["month"] = month
            log_dict["day"] = day
            log_dict["year"] = year
            log_dict["time_on_task"] = time_on_task
            log_dict["time_wasted"] = time_wasted
            log_dict["task_id"] = task_id
            log_dict["day_of_week"] = Dow

            new_log = DailyLog(**log_dict)
            storage.new(new_log)
            storage.save()
            print("Your log has been recorded."
                  + " Make sure to come back tomorrow!")

    def help_new(self):
        """ Help information for the new method """
        print("Creates a new, task, a new user or a new log")
        print("Usage: new Task | new User | new Log |")

    def do_all_tasks(self, args):
        """ Gets a list of all tasks associated with a user """
        try:
            user_id = str(input("I'm gonna need your ID\n: "))

            # Get all the tasks in storage
            tasks = storage.get_task()

            if not tasks:
                print("Looks like this user has no tasks")
                return

            user_tasks_names = []
            for task in tasks:
                if task.user_id == user_id:
                    user_tasks_names.append(task.task_name)
            if not user_tasks_names:
                print("Looks like this user has no tasks")
                return
            else:
                print("You currently have the following tasks:")
                for task in user_tasks_names:
                    print(task)

        except Exception as e:
            print("Please make sure that user id is correct. Thank you!")
            return

    def help_all_tasks(self):
        """ Help information for the all_tasks method """
        print("Get a list of tasks associated with a user")
        print("Uaage: all_tasks")

    def do_total_time_on_task(self, args):
        """ Gets the total time on a given task """
        try:
            task_id = str(input("Please give me the task ID :)\n: "))

            task = storage.get_task(task_id)

            if not task:
                print("Hmm, couldn't find a task with that ID."
                      + " Please try again")
            print(f"So far, you've spent {task.total_time_on_task} hours"
                  + f" on {task.task_name}")
        except Exception as e:
            print("Something is a bit off. Please try again :)")

    def help_total_time_on_task(self):
        """ Help information for the total_time_on_task method """
        print("Gets the total time spent on a task")
        print("Usage: total_time_on_task")

    def do_delete_task(self, args):
        """ Deletes a task from the list of tasks """
        try:
            task_id = str(input("Please give me the task ID :)\n: "))
            task = storage.get_task(task_id)

            if not task:
                print("Hmm, couldn't find a task with that ID."
                      + " Please try again")

            storage.delete(task)
            storage.save()
            print("task deleted successfully")
        except TypeError as e:
            print("Something is a bit off. Please try again :)")

    def help_delete_task(self):
        """ Help information for delete_task method """
        print("Delete a task. Remember that deleting tasks will also delete"
              + " all logs related to the task")
        print("Usage: delete_task")

    def do_total_productive_time(self, args):
        """ Get the total productive hours for a user """
        user_id = str(input("Can I please see some ID? :)\n :"))

        user = storage.get_user(user_id)

        print(f"so far, you've logged in {user.total_productive_time}"
              + " hours of solid work. Keep it going!")

    def help_total_productive_time(self):
        """ Help information for totaL_productive_time """
        print("Find out how much time you've been produxtive overall")
        print("Usage: total_productive_time")

    def do_total_wasted_time(self, args):
        """ Get the total time wasted by a user """
        user_id = str(input("Can I please see some ID? :)\n :"))

        user = storage.get_user(user_id)

        print(f"so far, you've wasted {user.total_wasted_time} hours."
              + " Remember, it's about progress not perfection. Keep going!")

    def help_total_wasted_time(self):
        """ Help informationi for total_wasted_time """
        print("Find how much time a user has wasted so far")
        print("Usage: total_wasted_time")

    def do_daily_report(self, args):
        """ Gets a list of all logs for a given day """
        try:
            user_id = str(input("Can I please see some ID? :)\n :"))
            date = str(input("What date should we get a report on?\n( Example"
                             + ": today OR February-29-2024 )\n: "))
            date = date.replace('-', '.')
            date = date.replace(':', '.')
            date = date.replace(' ', '.')

            if date == "today":
                date = datetime.today().strftime("%B.%d.%Y")

            logs = storage.get_logs_of_the_day(date)

            if not logs:
                print("There seems to be no logs for today")
                return
        except TypeError as e:
            print("Something seems off. Please try again!")
            return

        total_time_on_task_day = 0
        total_wasted_time_day = 0

        for log in logs:
            task = storage.get_task(log.task_id)
            if task.user_id == user_id:
                total_time_on_task_day += log.time_on_task
                total_wasted_time_day += log.time_wasted
                print(f"You spent {log.time_on_task} hours on"
                      + f"{task.task_name}")
        print(f"You spent a total of {total_time_on_task_day} hours working")
        print()
        print(f"You wasted a total of {total_wasted_time_day} hours today")
        print("Tomorrow is always another day. Salute!")

    def do_weekly_report(self, args):
        """ Gets a weekly report of time_on_task and time_wasted """
        try:
            user_id = str(input("Can I please see some ID? :)\n : "))
            date = str(input("Please choose from these options\n"
                             + "this_week   last_week    custom\n: "))

            def this_week(date):
                """ Gets a weekly report from Monday to Sunday based on a
                    given date. """
                weekday_offset = date.weekday()
                start_date = today - timedelta(days=weekday_offset)
                # 7 days of the week
                end_date = start_date + timedelta(days=6)

                total_time_on_task_week = 0
                total_wasted_time_week = 0

                day = start_date
                while day < end_date:
                    log_id = day.strftime("%B.%d.%Y")
                    logs = storage.get_logs_of_the_day(log_id)

                    for log in logs:
                        task = storage.get_task(log.task_id)
                        if task.user_id == user_id:
                            total_time_on_task_week += log.time_on_task
                            total_wasted_time_week += log.time_wasted

                    day = day + timedelta(days=1)

                print(f" This week you spent {total_time_on_task_week}"
                      + " hours wroking.\nWay to move forward!")
                print(f" You wasted a total of {total_wasted_time_week}"
                      + " hours. You can't be perfect. But you can be better."
                      + " See you next week! :))")

            today = datetime.today()
            if date == "this_week":
                this_week(today)
            elif date == "last_week":
                this_week(today - timedelta(days=7))
            elif date == "custom":
                custom_date = str(input("Please enter a starting date\n"
                                        + "(Example: February-29-2024)\n: "))
                custom_date = custom_date.replace('-', '.')
                custom_date = custom_date.replace(' ', '.')
                custom_date = custom_date.replace(',', '.')

                custom_date = datetime.strptime(custom_date, "%B.%d.%Y")
                this_week(custom_date)
            else:
                print("Please choose between only the 3 choices. Thank You!")
                return

        except TypeError as e:
            print("Something seems a bit off :( Please try again :)")


if __name__ == "__main__":
    TcCommand().cmdloop()
