#!/usr/bin/python
""" Handles reports for users """

from models import storage
from models.user import User
from models.dailylog import DailyLog
from api.v1.actions import app_actions
from flasgger.utils import swag_from
from datetime import datetime, timedelta
from flask import jsonify, request, abort


@app_actions.route('/daily_report', methods=['POST', 'GET'],
                   strict_slashes=False)
def daily_report():
    """ Provides a daily report for the current user """

    # Gets User ID from the form
    user_id = request.form.get('userId')

    # Empty Dictionary
    daily_report = dict()

    ''' Get the date and format the string into something compatible with
        the Log object's "date" attribute '''

    date = request.form.get('date')
    date = date.replace('-', '.')
    date = date.replace(':', '.')
    date = date.replace(',', '.')
    date = date.replace(' ', '.')

    ''' Handles the case of the user getting a report for "today" and not a
        specific date '''

    if date == "today":
        date = datetime.today().strftime("%B.%-d.%Y")

    # Get all logs that are for the given date
    logs = storage.get_logs_of_the_day(date)

    # If there are no logs for that date
    if not logs:
        return jsonify({})

    ttot_day = 0
    twt_day = 0

    # Go through all the logs and add up the work time and wasted time metrics
    for log in logs:
        task = storage.get_task(log.task_id)

        if task.user_id == user_id:
            ttot_day += log.time_on_task
            twt_day += log.time_wasted

    # Store result in the dictionary
    daily_report['ttot_day'] = ttot_day
    daily_report['twt_day'] = twt_day
    daily_report['date'] = date.replace(".", " ")
    date = datetime.strptime(date, "%B.%d.%Y")
    weekday = date.weekday()
    daily_report['weekday'] = weekday

    return jsonify(daily_report)


@app_actions.route('/weekly_report', methods=['POST', 'GET'],
                   strict_slashes=False)
def weekly_report():
    """ Provides a weekly report for the current user """
    user_id = request.form.get('userId')
    user = storage.get_user(user_id)

    ''' Gets the "week" to get a report for.
        week is one of 3 things. "this_week", "last_week", or "custom"
    '''
    week = request.form.get('week')

    # Takes in an actual datetime object
    def this_week(date):
        """ Gets a weekly report from Monday to Sunday based on a
            given date. """

        # Gets the difference of the given date and the beginning of the week
        weekday_offset = date.weekday()

        # Calculate the date for Monday of that week
        start_date = date - timedelta(days=weekday_offset)
        # Calculate the date for Sunday of that week
        end_date = start_date + timedelta(days=6)

        # Total productive and wasted time for the week
        ttot_week = 0
        twt_week = 0

        # Get logs from Monday to Sunday of that week
        day = start_date
        while day < end_date:
            log_id = day.strftime("%B.%-d.%Y")
            logs = storage.get_logs_of_the_day(log_id)

            for log in logs:
                task = storage.get_task(log.task_id)
                if task.user_id == user_id:
                    ttot_week += log.time_on_task
                    twt_week += log.time_wasted

            day += timedelta(days=1)

        # Initialize a dictionary and store the report to be returned
        weekly_report = dict()
        weekly_report['ttot_week'] = ttot_week
        weekly_report['twt_week'] = twt_week
        weekly_report['start_date'] = start_date
        weekly_report['end_date'] = end_date

        return jsonify(weekly_report)

    # Gets today's date
    today = datetime.today()

    if week == "this_week":
        year = datetime.today().strftime("%Y")
        return this_week(today)
    elif week == "last_week":
        year = datetime.today().strftime("%Y")

        # Provides a date for a day exactly a week from today
        return this_week(today - timedelta(days=7))
    elif week == "custom":

        ''' Gets the custom date and formats it to match a Log object's
            date attribute
        '''
        custom_date = request.form.get('dateOfWeek')
        custom_date = custom_date.replace(' ', '.')
        custom_date = custom_date.replace('-', '.')
        custom_date = custom_date.replace(',', '.')
        custom_date = custom_date.replace(':', '.')

        # Cnverts the string to an actual datetime object
        date = datetime.strptime(custom_date, "%B.%d.%Y")
        year = date.strftime("%Y")
        return this_week(date)
    else:
        return jsonify({})


@app_actions.route('/monthly_report', methods=['POST', 'GET'],
                   strict_slashes=False)
def monthly_report():
    """ Provides a monthly report for the current user """
    user_id = request.form.get('userId')
    user = storage.get_user(user_id)
    month = request.form.get('month')
    year = int(datetime.today().strftime("%Y"))

    # total time on task month
    ttot_month = 0
    # total wasted time month
    twt_month = 0

    # Get all logs in storage and filter by month
    logs = storage.get_logs_of_the_day()
    logs_of_the_month = []
    for log in logs:
        if log.year == year:
            if log.month == month:
                logs_of_the_month.append(log)

    # If there are no logs for the given month
    if not logs_of_the_month:
        return jsonify({})

    # Get the hourly mesurments for the report on the month
    for log in logs_of_the_month:
        task = storage.get_task(log.task_id)
        if task.user_id == user_id:
            ttot_month += log.time_on_task
            twt_month += log.time_wasted

    # Store the report in a dictionary
    monthly_report = {
            'ttot_month': ttot_month,
            'twt_month': twt_month,
            'month': month,
            'year': year
        }

    return jsonify(monthly_report)


@app_actions.route('/total_productive_time', methods=['POST', 'GET'],
                   strict_slashes=False)
def total_productive_time():
    """ Gets the total productive time for a User """
    user_id = request.form.get('userId')
    user = storage.get_user(user_id)

    # Dictionary to store the total productive time
    tpt = {'tpt': 0}

    # Get's a User's total productive time and store it in the dictionary
    tpt['tpt'] = user.total_productive_time

    return jsonify(tpt)


@app_actions.route('/total_wasted_time', methods=['POST', 'GET'],
                   strict_slashes=False)
def total_wasted_time():
    """ Gets the total wasted time for a User """
    user_id = request.form.get('userId')
    user = storage.get_user(user_id)

    # Get a User's total wasted time and store it in a dictionary
    twt = {
            'twt': user.total_wasted_time
        }

    return jsonify(twt)
