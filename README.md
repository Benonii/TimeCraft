Welcome! This project is called TimeCraft.

The goal of this project is to help you track time on task.
It records how much time you spend on a task and how much time you've wasted over all.

It can be used by multiple users, It can log records for multiple tasks.
But it only accepts one log per task for one day. It can also give you daily, weekly and monthly reports.
And finally, it can give you metrics like Total productive time and Total
wasted time and more...

Instructions for use:

In the project root directory, run ./timecraft.py

Run the command new User to create your user. Save the User Id. You will need
it to create tasks and log your activity.

Commands:
new User
new Task
new Log
all_tasks
total_time_on_task
delete_task
daily_report
weekly_report
monthly_report
total_productive_time
total_wasted_time
quit


new User

Creates a new User. Asks for name, weekly work hour goals and number of work
days. Returns your User ID.


new Task

Creates a new Task for a given user.(Needs your User ID). Asks for task_name
and how many hours you wnat to dedicate to that task. Returns the Task ID.


new Log

Creates a new Log.(Needs your Task ID). Asks how much time you spent on the task, and how much time you've wasted. (Returns the date of the log).


all_task

Returns a list of all tasks assosciated with a user.(Needs your User ID). 


total_time_on_task

Gets the total time you've spent on a task.(Needs your Task ID).


delete_task

Deletes a task.(Needs Task ID).


daily_report

Gives you a report of how you've spent your time for that day.(Needs User ID)
Asks for day to get a report for. You can enter "today" or a specific date in
the format: Month-Day-Year (Example: February 29, 2024).


weekly_report

Gives you a report of how you've spent your time for a given week.(Needs User
ID) You can enter "this_week" for a report on this week, "last_week" for a report on lassweek. Or you could type "custom" and provide a date (format: Month Day Year)
to get a report for the week containing that date.


monthly_report

Gives you a report of how you've spent your time for a given month.(Needs
user ID)


total_productive_time

Returns the total time a user has been productive.(Needs User ID)


total_wasted_time

Return the total time a user has wasted.(Needs User ID)

quit

Exits TimeCraft. You can also exit by pressing ctrl^D.

Contributions

Everyone is welcome to add features, find bugs and make suggestions. If you would like to report a bug or make suggestions, feel free to open up an issue.

If you would like to make contributions as a developer, feel free to fork 
this repo, and create a pull request once you're done.

Master your fate one day at a time! Enjoy!
