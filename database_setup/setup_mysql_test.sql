-- Prepares a MySQL test server for the project

-- Creates the test db if it doesn't exist
CREATE DATABASE IF NOT EXISTS tc_test_db;

-- Creates the user if it doesn't exist
CREATE USER IF NOT EXISTS 'tc_test'@'localhost' IDENTIFIED BY 'tc_test_pwd_4796';

-- Grants all privileges on the test db to the created user
GRANT ALL PRIVILEGES ON tc_test_db.* TO 'tc_test'@'localhost';

-- Grants select privilege to the created user on the performace_schema db
GRANT SELECT ON performace_schema.* TO 'tc_test'@'localhost';
