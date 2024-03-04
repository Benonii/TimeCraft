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

    # Display prompt only if in interactive mode
    prompt = '(Tiempo)> ' if sys.stdin.isatty() else ''

    if sys.stdin.isatty():
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
            print(self.prompt)

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

    def do_quit(self, command):
        """ Exit timecraft """
        print("Bye!")
        exit()

    def help_quit(self):
        """ Prints the help documentation for quit """
        print(f"Type quit to exit timecraft\n")

    def do_EOF(self, arg):
        """ Handles EOF to exit the program """
        print("\n Bye!")
        exit()

    def help_EOF(self):
        """ Prints the help doc for EOF """
        print(f"You can exit TimeCraft with ctrl^D")

    def emptyline(self):
        """Overrides the emptyline method of CMD"""
        pass

    def do_new(self, args):
        """ Create an object of any class """

        if not args:
            print(f"{self.prompt}Missing Class name :(")
            return

        argv = args.split(" ")

        if argv[0] not in TcCommand.classes:
            print(f"{self.prompt}You can only create a new User, Task or Log."
                  + " Please try again :)")
            return

        # Creates a new User
        if argv[0] == "User":
            user_dict = dict()

            try:
                name = str(input(f"{self.prompt}Hey new user!"
                                 + " What is your name?\n: "))
                weekly_hours_goal = float(
                    input(f"{self.prompt}"
                          + "How many hours would you like to work per week?"
                          + "(Example: 40, 55.5, 20)\n: "))
                work_days = int(
                        input(f"{self.prompt}How many days do you work in a week?\n: "))
            except Exception as e:
                print("Something seems a bit off. Run 'help new' and try again)")
                return

            user_dict["name"] = name
            user_dict["weekly_work_hours_goal"] = weekly_hours_goal
            user_dict["number_of_work_days"] = work_days

            new_user = User(**user_dict)

            storage.new(new_user)
            storage.save()
            print("All done. Here is your ID, please remember it."
                  + " You will use it to create tasks and log your activity ;)")
            print(f"User ID: {new_user.id}")

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

                task_name = str(input("Please name your task\n: "))
                total_tot = 0
                daily_goal = float(input("How many hours would you like to"
                                         + " dedicate to this task everyday?\n: "
                                         ))
                weekly_goal = daily_goal * user.number_of_work_days

            except Exception as e:
                print("Something seems a bit off. Run 'help new' and try again :)")
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
                task_id = str(input("What is the task ID?\n: "))
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
                                           + f" {task.task_name} today?\n: "))
                task.total_time_on_task += time_on_task
                user.total_productive_time += time_on_task

                time_wasted = float(input("How much time did you waste"
                                          + " today(It's okay, I won't judge"
                                          + " ;)\n: "))
                user.total_wasted_time += time_wasted

            except Exception as e:
                print("Something seems a bit off. Run 'help new' and try again.")
                return

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
            print(f"Log ID : {new_log.id}")

    def help_new(self):
        """ Help information for the new method """
        print("Creates a new, task, a new user or a new log")
        print("Usage: new Task | new User | new Log |")
        print("new User: Creates a new User")
        print("new Task: Creates a new Task(needs User ID)")
        print("new Log: Creates a new Log of activities for the day"
              + "(Needs Task ID)")

    def do_all_tasks(self, args):
        """ Gets a list of all tasks associated with a user """
        try:
            user_id = str(input("Can I please see some ID?\n: "))

            # Get all the tasks in storage
            tasks = storage.get_task()

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
                    print(f"\t=> {task}")

        except Exception as e:
            print("Please make sure that user id is correct. Thank you!")
            return

    def help_all_tasks(self):
        """ Help information for the all_tasks method """
        print("Get a list of tasks associated with a user")
        print("Usage: Type all tasks and press enter")
        print("     Provide your user ID and get all the tasks of that user.")

    def do_total_time_on_task(self, args):
        """ Gets the total time on a given task """
        try:
            task_id = str(input("Please give me the task ID :)\n: "))

            task = storage.get_task(task_id)

            if not task:
                print("Hmm, couldn't find a task with that ID."
                      + " Please try again")
                return
            print(f"So far, you've spent {task.total_time_on_task} hours"
                  + f" on {task.task_name}")
        except Exception as e:
            print("Something is a bit off. run 'help total_time_on_task' and "
                  + "try again :)")

    def help_total_time_on_task(self):
        """ Help information for the total_time_on_task method """
        print("Gets the total time spent on a task")
        print("Usage: Type 'total_time_on_task' and press enter")
        print("Provide your Task ID")

    def do_delete_task(self, args):
        """ Deletes a task from the list of tasks """
        try:
            task_id = str(input("Please give me the task ID :)\n: "))
            task = storage.get_task(task_id)

            if not task:
                print("Hmm, couldn't find a task with that ID."
                      + " Please try again")
                return

            storage.delete(task)
            storage.save()
            print("Task deleted successfully!")
        except Exception as e:
            print("Something is a bit off. Run 'help delete_task' try again :)")

    def help_delete_task(self):
        """ Help information for delete_task method """
        print("Delete a task. Remember that deleting tasks will also delete"
              + " all logs related to the task")
        print("Usage: type delete_task and press enter")
        print("Enter the task ID for the task you want to delete")

    def do_total_productive_time(self, args):
        try:
            """ Get the total productive hours for a user """
            user_id = str(input("Can I please see some ID? :)\n: "))

            user = storage.get_user(user_id)

            print(f"So far, you've logged in {user.total_productive_time}"
                  + " hours of solid work. Keep it going!")
        except:
            print("Something seems a bit off. Run 'help total_productive_time"
                  + f"' and try again")
    def help_total_productive_time(self):
        """ Help information for total_productive_time """
        print("Find out how much time you've been productive overall")
        print("Usage: Type 'total_productive_time' and press enter")
        print("       Provide your user ID'")

    def do_total_wasted_time(self, args):
        """ Get the total time wasted by a user """
        try:
            user_id = str(input("Can I please see some ID? :)\n: "))

            user = storage.get_user(user_id)

            print(f"So far, you've wasted {user.total_wasted_time} hours."
                  + " Remember, it's about progress not perfection. Keep going!")
        except Exception as e:
            print("Something seems a bit off. Run 'help total_wasted_time'"
                  + " and try again.")

    def help_total_wasted_time(self):
        """ Help informationi for total_wasted_time """
        print("Find how much time a user has wasted so far")
        print("Usage: Type total_wasted_time and press Enter")
        print("       Provide your User ID")

    def do_daily_report(self, args):
        """ Gets a list of all logs for a given day """
        try:
            user_id = str(input("Can I please see some ID? :)\n: "))

            if user_id == "":
                print("Please enter a User ID and try again")
                return

            date = str(input("What date should we get a report on?\n( Example"
                             + ": today OR February-29-2024 )\n: "))
            date = date.replace('-', '.')
            date = date.replace(':', '.')
            date = date.replace(' ', '.')
            date = date.replace(',', '.')

            if date == "today":
                date = datetime.today().strftime("%B.%-d.%Y")
            elif date == "":
                print("Please enter a proper date and try again.")
                print("Run 'help daily_report' for help")
                return

            logs = storage.get_logs_of_the_day(date)

            if not logs:
                print(f"{self.prompt} There seems to be no logs for today")
                return
        except Exception as e:
            print(f"{self.prompt} Something seems off. Run 'help daily_report'"
                  + " and try again.")
            return

        total_time_on_task_day = 0
        total_wasted_time_day = 0

        for log in logs:
            task = storage.get_task(log.task_id)
            if task.user_id == user_id:
                total_time_on_task_day += log.time_on_task
                total_wasted_time_day += log.time_wasted
                print(f"{self.prompt} You spent {log.time_on_task} hours on"
                      + f"{task.task_name}")
        print(f"{self.prompt} You spent a total of {total_time_on_task_day} hours working")
        print()
        print(f"{self.prompt} You wasted a total of {total_wasted_time_day} hours today")
        print(f"{self.prompt} Tomorrow is always another day. Salute!")

    def help_daily_report(self):
        """ Handles ducumentation for the method daily_report """
        print("daily_report: Gets a report of your daily time on task and time wasted")
        print("Usage: type daily_report and press enter")
        print("Provide your user ID and the day you want to get logs for")

    def do_weekly_report(self, args):
        """ Gets a weekly report of time_on_task and time_wasted """
        try:
            user_id = str(input("Can I please see some ID? :)\n : "))
            user = storage.get_user(user_id)
            if not user:
                print("There seems to be no user with that ID."
                      + f" Please try again!")
                return

            date = str(input("Please choose from these options\n"
                             + "this_week   last_week    custom\n: "))

            def this_week(date):
                """ Gets a weekly report from Monday to Sunday based on a
                    given date. """ 
                weekday_offset = date.weekday()
                start_date = date - timedelta(days=weekday_offset)
                print(f"Start Date: {start_date.strftime('%B.%-d.%Y')}")
                # 7 days of the week
                end_date = start_date + timedelta(days=7)
                print(f"End Date: {end_date.strftime('%B.%-d.%Y')}")

                total_time_on_task_week = 0
                total_wasted_time_week = 0

                day = start_date
                while day < end_date:
                    log_id = day.strftime("%B.%-d.%Y")
                    logs = storage.get_logs_of_the_day(log_id)

                    for log in logs:
                        task = storage.get_task(log.task_id)
                        if task.user_id == user_id:
                            total_time_on_task_week += log.time_on_task
                            total_wasted_time_week += log.time_wasted

                    day += timedelta(days=1)

                    if total_time_on_task_week == 0 and\
                            total_wasted_time_week == 0:
                        print("There are no logs for this week.")
                        return

                print(f"{self.prompt} This week you spent {total_time_on_task_week}"
                      + " hours wroking.\nWay to move forward!")
                print(f"{self.prompt} You wasted a total of {total_wasted_time_week}"
                      + " hours.\nYou can't be perfect. But you can be better."
                      + " See you next week! :))")

            today = datetime.today()
            if date == "this_week":
                this_week(today)
            elif date == "last_week":
                print(today - timedelta(days=7))
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
                print(f"{self.prompt} Please choose between only the 3 options. Thank You!")
                return

        except ValueError:
            print("Please make sure you enter a valid date when using the"
                  + " 'custom' option")
        except Exception as e:
            print(f"{self.prompt} Something seems a bit off."
                  + " Run 'help weekly_report' and try again")


    def help_weekly_report(self):
        """ Handles ducumentation for the method weekly_report """
        print(f"weekly_report: Gets a report of your weekly time on task"
              + " and time wasted")
        print(f"Usage: Type 'weekly_report' and press enter")
        print("Provide your User ID and choose between this_week, last_week or"
              + " custom(Choose a date and get a report for that week)")  

    def do_monthly_report(self, args):
        """ Get the total time on task and total wasted time for the month """
        try:
            user_id = str(input("Can I please see some ID? :)\n : "))
            user = storage.get_user(user_id)

            if not user:
                print("There seems to be no user with that ID."
                      + " Please try again!")
                return

            month = str(input("What month would you like to get a report for?"
                              + "\n (Example: February) : "))
            # Total time on task this month
            ttot_month = 0
            # Total wasted time this month
            twt_month = 0

            logs = storage.get_logs_of_the_day()
            logs_of_the_month = []
            for log in logs:
                if log.month == month:
                    logs_of_the_month.append(log)
            if not logs_of_the_month:
                print(f"{self.prompt} Hmm... it looks like there are no logs"
                      + " for that month. Try Another one")
                return

            for log in logs_of_the_month:
                task = storage.get_task(log.task_id)
                if task.user_id == user_id:
                    ttot_month += log.time_on_task
                    twt_month += log.time_wasted

            print(f"{self.prompt} In the month of {month}, you have spent"
                  + f" {ttot_month} hours working. Way to go!")
            print(f"{self.prompt} You have wasted {twt_month} hours this"
                  + f" month.")
            print(f"{self.prompt} You did good. Here is to doing better next"
                  + " month!")
            print()
        except NameError as e:
            print(f"{self.prompt} Something seems to be a bit off."
                  + " Run 'help monthly_report' and try agian :)")

    def help_monthly_report(self):
        """ Handles documentation for the method monthly_report """
        print("monthly_report: Gets report of time on task and time wasted\n"
              + "for a specified month")
        print("usage: Type 'monthly_report' and press enter")
        print("Provide your User ID and the month you want to get a report for")

    '''
    def do_update_task(self, args):
        """ Updates a task's attributes """
        try:
            task_id = str(input("Can I please have the task ID? :)\n : "))
            updater_dict = dict()
            # Attribute to be updated
            attribute = str(input("What attribute would you like to change?\n"
                                  + "Choose one: task_name, daily_goal, "
                                  + "weekly_goal\n: "))

            if attribute not in ["task_name", "daily_goal", "weekly_goal"]:
                print("That doesn't seem right :< Try that again")

            updater_dict[attribute] = str(input("What do you want to change it to?"
                                                + "\n: "))
            task = storage.get_task(task_id)
            task.__dict__.update(updater_dict)
            task.save()

            print("Task updated successfully")
        except TypeError as e:
            print("Something seems off :( Please try again")
            return

    def help_update_task(self):
        """ handles documentation for the method update_task """
        print("update_task: Updates the attributes of a task")
        print("Usage: update_task")

    def do_update_user(self, args):
        """ Updates a user's attributes """
        try:
            user_id = str(input("Can I please see some ID? :)\n : "))
            updater_dict = dict()
            # Attribute to be updated
            attribute = str(input("What attribute would you like to change?\n"
                                  + "Choose one: name, weekly_work_hour_goals"
                                  + ", number_of_work_days\n: "))

            if attribute not in ["name", "weekly_work_hour_goals",
                                 "number_of_work-days"]:
                print("That doesn't seem right :< Try that again")
                return

            updater_dict[attribute] = str(input("What do you want to change it to?"
                                                + "\n: "))
            user = storage.get_user(user_id)
            user.__dict__.update(updater_dict)
            user.save()

            print("User updated successfully")
        except NameError as e:
            print("Something seems off :( Please try again")
            return


    def help_update_user(self):
        """ handles documentation for the method update_user """
        print("update_task: Updates the attributes of a task")
        print("Usage: update_task")

    def do_update_todays_log(self, args):
        try:
            log_id = datetime.today().strftime("%B.%d.%Y")
            task_id = str(input("What is the task ID?\n: "))
            task = storage.get_task(task_id)
            user = storage.get_user(task.user_id)
            logs = storage.get_logs_of_the_day(log_id)

            for log in logs:
                if log.task_id == task_id:
                   log_ = log

            updater_dict = dict()
            # Attribute to be updated
            attribute = str(input("What attribute would you like to change?\n"
                                  + "Choose one: task_name, daily_goal, "
                                  + "weekly_goal"))

            if attribute not in ["task_name", "daily_goal", "weekly_goal"]:
                print("That doesn't seem right :< Try that again")

            if attribute == "time_on_task":
                user.total_time_on_task += float(input("How much more did you"
                                                       + "work today on {}?\n"
                                                       .format(task.task_name)
                                                       ))
            elif attribute == "time_wasted":
                user.total_wasted_time += float(input("Did you waste anymore"
                                                      +" time today? (put in 0"
                                                      +" if not)\n: "))

            updater_dict[attribute] = str(input("What do you want to change it to?"
                                                + "\n: "))
            log.__dict__.update(updater_dict)
            storage.save(log)

            print("Log updated successfully")
        except Exception as e:
            print("Something seems off :( Please try again")
            return

    def help_update_log(self, args):
        """ Handles documentation for the method update_log """
        print("update_log: add more time on task or wasted time")
        print("Usage: update_log")
    '''


if __name__ == "__main__":
    TcCommand().cmdloop()
