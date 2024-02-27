#!/usr/bin/env python3

from models.basemodel BaseModel, Base
from sqlalchemy import Column, String, Float, Integer
from datetime import datetime


class DailyLog(BaseModel, Base):
    ''' This is the class representation of the Object DailyLog '''
    __tablename__ = "daily_log"
    month  = Column(String(60), nullable=False)
    day = Column(Integer, nullable=False)
    year = Column(Integer, nullable=False)
    task_id = Column(String(128), ForeignKey("tasks.id"), nullable=False)
    time_on_task = Column(Float, nullable=False)
    time_wasted = Column(Float, nullable=False)
