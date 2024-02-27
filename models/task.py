#!/usr/bin/env python3
''' This module contains the class definition of Task '''

from models.basemodel import BaseModel, Base
from sqlalchemy import Column, String, Float
from sqlalchemy.orm import relationship

class Task(BaseModel, Base):
    ''' This is the class that will represent Task objects '''
    
    __tablename__ = "tasks"
    task_name = Column(String(128), nullable=False)
    total_time_on_task = Column(Float, nullable=True)
    daily_goal = Column(Float, nullable=False)
    weekly_goal = Column(Float, nullable=False)
    total_wasted_time = Column(Float, nullable=True)
    user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
