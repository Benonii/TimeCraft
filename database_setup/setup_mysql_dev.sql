-- Prepares a MySQL dev server for TimeCraft

-- Creates the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS tc_dev_db;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS 'tc_dev'@'localhost' IDENTIFIED BY 'passwd';

-- Grants all privileges to the created user on the dev db
GRANT ALL PRIVILEGES ON tc_dev_db.* TO 'tc_dev'@'localhost';
