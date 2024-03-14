#!/usr/bin/python
""" Handles reports for users """

from models import storage
from models.user import User
from models.dailylog import DailyLog
from api.v1.actions import app_actions
from flasgger.utils import swag_from
from datetime import datetime, timedelta
from flask import jsonify, request, abort


@app_actions.route('/daily_report', methods=['POST', 'GET'], strict_slashes=False)
def daily_report():
    """ Provides a daily report for the current user """
    user_id = request.form.get('userId')
    daily_report = dict()
    date = request.form.get('date')
    date = date.replace('-', '.')
    date = date.replace(':', '.')
    date = date.replace(',', '.')
    date = date.replace(' ', '.')

    if date == "today":
        date = datetime.today().strftime("%B.%-d.%Y")

    logs = storage.get_logs_of_the_day(date)

    if not logs:
        return jsonify({})

    ttot_day = 0
    twt_day = 0

    for log in logs:
        task = storage.get_task(log.task_id)
        print(log.date)

        if task.user_id == user_id:
            ttot_day += log.time_on_task
            twt_day += log.time_wasted

    daily_report['ttot_day'] = ttot_day
    daily_report['twt_day'] = twt_day


    return jsonify(daily_report)

@app_actions.route('/weekly_report', methods=['POST', 'GET'], strict_slashes=False)
def weekly_report():
    """ Provides a weekly report for the current user """
    user_id = request.form.get('userId')
    user = storage.get_user(user_id)

    week = request.form.get('week')
    print(week)

    def this_week(date):
        """ Gets a weekly report from Monday to Sunday based on a
            given date. """
        weekday_offset = date.weekday()
        start_date = date - timedelta(days=weekday_offset)
        # print(f"Start Date: {start_date.strftime('%B.%-d.%Y')}")
        # 7 days of the week
        end_date = start_date + timedelta(days=6)
        # print(f"End Date: {end_date.strftime('%B.%-d.%Y')}")

        ttot_week = 0
        twt_week = 0

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
        
        weekly_report = dict()
        weekly_report['ttot_week'] = ttot_week
        weekly_report['twt_week'] = twt_week

        return jsonify(weekly_report)

    today = datetime.today() 

    if week == "this_week":
        return this_week(today)
    elif week == "last_week":
        return this_week(today - timedelta(days=7))
    elif week == "custom":
        custom_date = custom_date.replace(' ', '.')
        custom_date = custom_date.replace('-', '.')
        custom_date = custom_date.replace(',', '.')
        custom_date = custom_date.repalce(':', '.')

        return this_week(custom)
    else:
        return jsonify({})


@app_actions.route('/monthly_report', methods=['POST', 'GET'], strict_slashes=False)
def monthly_report():
    """ Provides a monthly report for the current user """
    user_id = request.form.get('userId')
    user = storage.get_user(user_id)
    month = request.form.get('month')
    print(user_id)
    print(month)

    # total time on task month
    ttot_month = 0
    # total wasted timme month
    twt_month = 0

    logs = storage.get_logs_of_the_day()
    logs_of_the_month = []
    for log in logs:
        print(log.month)
        if log.month == month:
            logs_of_the_month.append(log)
    if not logs_of_the_month:
        return jsonify({})

    for log in logs_of_the_month:
        task = storage.get_task(log.task_id)
        if task.user_id == user_id:
            ttot_month += log.time_on_task
            twt_month += log.time_wasted
    
    monthly_report = {
            'ttot_month': ttot_month,
            'twt_month': twt_month
        }

    return jsonify(monthly_report)


@app_actions.route('/total_productive_time', methods=['POST', 'GET'],
                   strict_slashes=False)
def total_productive_time():
    """ Gets the total productive time for a User """
    user_id = request.form.get('user_id')
    tpt = {
            'total_productive_time': user.total_productive_time
        }

    return jsonify(tpt)


@app_actions.route('/total_wasted_time', methods=['GET'],
                   strict_slashes=False)
def total_wasted_time():
    """ Gets the total wasted time for a User """
    user_id = request.form.get('user_id')
    twt = {
            'total_wasted_time': user.total_wasted_time
        }

    return jsonify(twt)
