#!/usr/bin/env python3
''' This module contains the class User '''

from models.basemodel import BaseModel, Base
from sqlalchemy import Column, String, Float, Integer


class User(BaseModel, Base):
    ''' This class is the represantation for the User object '''
    __tablename__ = "users"
    name = Column(String(128), nullable=False)
    weekly_work_hours_goal = Column(Float, nullable=False)
    number_of_work_days = Column(Integer, nullable=False)
    total_productive_time = Column(Float, nullable=False, default=0)
    total_wasted_time = Column(Float, nullable=False, default=0)
