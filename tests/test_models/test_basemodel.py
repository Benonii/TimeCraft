#!/usr/bin/python3
# Test module for our basemodel.py
import unittest
from datetime import datetime
from models.basemodel import BaseModel
from models.task import Task


class TestBaseModel_init(unittest.TestCase):
    """ A class to test the initialisation of the base module """
    def setUp(self):
        """ Set up """
        self.objct = BaseModel()

    def tearDown(self):
        """ Tear down """
        pass

    def test_object_created(self):
        """ Tests if an object is created """
        self.assertEqual(BaseModel, type(self.objct))

    def test_object_attrs(self):
        """ tests that object atrributes are who they say they are """
        self.assertEqual(type(self.objct.id), str)
        self.assertEqual(type(self.objct.created_at), datetime)
        self.assertEqual(type(self.objct.updated_at), datetime)

        self.assertIn('id', self.objct.__dict__.keys())
        self.assertIn('created_at', self.objct.__dict__.keys())
        self.assertIn('updated_at', self.objct.__dict__.keys())

        self.assertIn(self.objct.id, self.objct.__dict__.values())
        self.assertIn(self.objct.created_at, self.objct.__dict__.values())
        self.assertIn(self.objct.updated_at, self.objct.__dict__.values())

    def test_object_str(self):
        """ Tests the object's __str__() method """
        filtered_dict = {k: v for k, v in self.objct.__dict__.items() if v}
        test_str = f"[{type(self.objct).__name__}] ({self.objct.id})"\
                   + f" {filtered_dict}"

        self.assertEqual(self.objct.__str__(), test_str)

    def test_object_save(self):
        """ Tests the object's save() method.
            We will only be checking if the updated_at attribute has
            been changed. The other part of this method is the concern of
            testing the storage engine. """

        updated_at_minute = datetime.now().strftime('%M')
        self.assertEqual(self.objct.updated_at.strftime("%M"),
                         updated_at_minute)

    def test_to_dict(self):
        """ Tests the object's to_dict() method """
        # A dictionary of the object's attributes that only have a value
        # assigned.
        filtered_dict = {k: v for k, v in self.objct.__dict__.items() if v}
        filtered_dict["__class__"] = self.objct.__class__.__name__
        self.assertEqual(self.objct.to_dict(), filtered_dict)

    # The delete method will be tested using the other objects


if __name__ == "__main__":
    unittest.main()
