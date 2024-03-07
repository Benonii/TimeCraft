# TimeCraft

Welcome to TimeCraft, your personal time tracking companion! ⏰

Project Goal:

This project empowers you to keep track of your time spent on tasks, including wasted time. It caters to multiple users and tasks, offering daily, weekly, and monthly reports with valuable metrics like total productive time and total wasted time.

Instructions:

Navigate to the project's root directory and execute:

Bash
./timecraft.py
Use code with caution.
Create a user by running:

Bash
new User
Use code with caution.
Remember your User ID; you'll need it for subsequent actions.

Commands:

new User: #new-user: Creates a new user profile, prompting you for your name, weekly work hour goals, and number of work days. Outputs your User ID.
new Task: #new-task: Creates a new task for a specific user (requires your User ID). Inputs include the task name and desired dedicated hours. Returns the Task ID.
new Log: #new-log: Establishes a new log entry (requires your Task ID). Inputs include time spent on the task and wasted time. Returns the log date.
all_tasks: #all_tasks: Presents a list of all tasks associated with a user (requires your User ID).
total_time_on_task: #total_time_on_task: Calculates the total time spent on a particular task (requires your Task ID).
delete_task: #delete_task: Eliminates a task (requires your Task ID).
daily_report: #daily_report: Generates a report detailing your time usage for a specific day (requires your User ID). Enter "today" for the current day or a date in YYYY-MM-DD format (e.g., "2024-03-07").
weekly_report: #weekly_report: Presents a report on your time usage for a chosen week (requires your User ID). Input "this_week" for the current week, "last_week" for the previous week, or "custom" followed by a date in YYYY-MM-DD format for a specific week's report.
monthly_report: #monthly_report: Offers a report on your time usage for a given month (requires your User ID).
total_productive_time: #total_productive_time: Returns the total productive time accrued by a user (requires your User ID).
total_wasted_time: #total_wasted_time: Returns the total wasted time accumulated by a user (requires your User ID).
quit: #quit: Exits TimeCraft (or press Ctrl+D).
Contributing:

We encourage contributions in the form of adding features, bug fixes, and suggestions! To report a bug or make suggestions, please open an issue.

For developer contributions, fork this repository and create a pull request upon completion.

Master your time and achieve your goals, one day at a time!
