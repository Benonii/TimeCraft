# TimeCraft: Track Your Time and Productivity

# Table of Contents

**Project Goal:**

This project is intended to track your time by keeping track of how much time
you spend on specific tasks, helping you identify areas for improvement and 
optimize your workflow.

**Features:**

* **Multi-user support:** Accommodates multiple users to personalize their time tracking experiences.
* **Task management:** Create and manage tasks, including daily goal for time
on task.
* **Task logging:** Record the time spent and wasted time for each task, providing valuable insights into your work habits.
* **Reporting:** Generate comprehensive reports on daily, weekly, and monthly activity, helping you assess your progress and identify trends.
* **Time metrics:** Gain insights into your total productive and wasted time, allowing you to make informed decisions about your time usage.

**Instructions:**

1. **Start TimeCraft:**
   - Open your terminal and navigate to the project directory.
   - Run `./timecraft.py` to initiate.

2. ## Create a User:
   - Use the `new User` command to set up your user profile.
   - Provide your name, weekly work hour goals, and number of work days per 
     week.
   - The command will return your unique User ID, essential for task 
     management and logging.

3. ## Manage Tasks:**
   - ### Create a new task:
     - Use the `new Task` command, specifying your User ID (from step 2).
     - Enter the task name and how much you'd like to dedicate to the task.
     - The command will return a Task ID that'll come in handy later.
   - ### View all tasks:
     - Use the `all_tasks` command, provide your User ID, to list all tasks
       associated with a  user.
   - ### Total time on task:
     - Use the `total_time_on_task` command, along with the Task ID, to
       retrieve the total time spent on a task.
   - ### Delete a task:
     - Use the `delete_task` command, specifying the Task ID, to 
       __permanently__ remove the task.
4. ## Create Logs:
    - Use the `new Log` command to record your activity for the day. Provide       your Task ID (from step 3) and specify how much time you've spent on 
      and how much time you've wasted

4. ## Generate Reports:
   - ### Daily report:
     - Use the `daily_report` command with your User ID.
     - You can either enter "today" for the current day, or a specific date
       in the format "Month-Day-Year" (e.g., "February 29, 2024").
   - ### Weekly report:
     - Use the `weekly_report` command with your User ID.
     - Enter one of the following options:
       - "this_week" for a report on the current week.
       - "last_week" for a report on the previous week.
       - "custom" followed by a date in "Month Day Year" format 
         (e.g., "February 24 2024") to get a report for the week containing
         that date.
   - ### Monthly report:
     - Use the `monthly_report` command with your User ID to generate a report for the entire month.

5. **Time Metrics:**
   - **Total productive time:**
     - Use the `total_productive_time` command with your User ID to calculate the total time spent productively across all tasks.
   - **Total wasted time:**
     - Use the `total_wasted_time` command with your User ID to determine the total time wasted across all tasks.

6. **Exit:**
   - To exit TimeCraft, you can either enter the `quit` command or press `Ctrl+D`.

**Contributions:**

TimeCraft welcomes contributions from the community! Feel free to report bugs, suggest improvements, or create pull requests to enhance the project's functionality and user experience.

**Master your time and optimize your productivity with TimeCraft!**

**Command List:**

- [new User](**#new-user**)
- [new Task](#new-task)
- [new Log](#new-log)
- [all_tasks](#all_tasks)
- [total_time_on_task](#total_time_on_task)
- [delete_task](#delete_task)
- [daily_report](#daily-report)
- [weekly_report](#weekly-report)
- [monthly_report](#monthly-report)
- [total_productive_time](#total_productive_time)
- [total_wasted_time](#total_wasted_time)
- [quit](#quit)
