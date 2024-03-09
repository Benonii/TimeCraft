#!/usr/bin/python
""" Handles reports for users """

from models import storage
from models.user import User
from models.dailylog import DailyLog
from api.v1.actions import app_actions
from flasgger.utils import swag_from
from datetime import datetime, timedelta


@app_actions.route('/daily_report', methods=['GET'], strict_slashes=False)
def daily_report():
    """ Provides a daily report for the current user """
    user = request.form.get('user_id')
    date = request.form.get('date')
    date = date.replace('-', '.')
    date = date.replace(':', '.')
    date = date.repalce(',', '.')
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

        if task.user_id == user_id:
            ttot_day += log.time_on_task
            twt_day += log.time_wasted

        daily_report = {
                'ttot_day': ttot_day,
                'twt_day': twt_day
                }

        return jsonify(daily_report)


@app_actions.route('/weekly_report', methods=['GET'], strict_slashes=False)
def weekly_report():
    """ Provides a weekly report for the current user """
    user_id = request.form.get('user_id')
    user = storage.get_user(user_id)

    def this_week(date):
        """ Gets a weekly report from Monday to Sunday based on a
            given date. """
        weekday_offset = date.weekday()
        start_date = date - timedelta(days=weekday_offset)
        print(f"Start Date: {start_date.strftime('%B.%-d.%Y')}")
        # 7 days of the week
        end_date = start_date + timedelta(days=6)
        print(f"End Date: {end_date.strftime('%B.%-d.%Y')}")

        ttot_week = 0
        twt_week = 0

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
        
        weekly_report = dict()
        weekly_report['ttot_week'] = total_time_on_task_week
        weekly_report['twt_week'] = total_wasted_time_week

        return jsonify(weekly_report)

    today = datetime.today()
    week = request.form.get('date')

    if week == "this_week":
        this_week(today)
    elif week == "last_week":
        this_week(today - timedelta(days=7))
    elif week == "custom":
        custom_date = custom_date.replace(' ', '.')
        custom_date = custom_date.replace('-', '.')
        custom_date = custom_date.replace(',', '.')
        custom_date = custom_date.repalce(':', '.')

        this_week(custom)
    else:
        return jsonify({})


@app_actions.route('/monthly_report', methods=['GET'], strict_slashes=False)
def monthly_report():
    """ Provides a monthly report for the current user """
    user_id = request.form.get('user_id')

