-- Creates the necessay tables for TimeCraft to operate

-- Creates a table for users
CREATE TABLE IF NOT EXISTS users (
    name VARCHAR(128) NOT NULL,
    weekly_work_hours_goal FLOAT NOT NULL,
    number_of_work_days INT NOT NULL,
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    total_wasted_time FLOAT NOT NULL DEFAULT 0,
    total_productive_time FLOAT NOT NULL DEFAULT 0
);

-- Creates a table for tasks
CREATE TABLE IF NOT EXISTS tasks (
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    task_name VARCHAR(128) NOT NULL,
    total_time_on_task FLOAT,
    daily_goal FLOAT NOT NULL,
    weekly_goal FLOAT NOT NULL,
    user_id VARCHAR(60) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- creates a table for logs
CREATE TABLE daily_log(
    id VARCHAR(60) PRIMARY KEY,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    month VARCHAR(60) NOT NULL,
    day INT NOT NULL,
    year INT NOT NULL,
    task_id VARCHAR(128) NOT NULL,
    time_on_task FLOAT NOT NULL,
    time_wasted FLOAT NOT NULL,
    day_of_week VARCHAR(55) NOT NULL,
    date VARCHAR(255) NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);
