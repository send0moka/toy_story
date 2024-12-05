CREATE DATABASE toy_story_catalog;
USE toy_story_catalog;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE toys (
    toy_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    toy_name VARCHAR(100) NOT NULL,
    toy_description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE toy_stories (
    story_id INT AUTO_INCREMENT PRIMARY KEY,
    toy_id INT,
    story_content TEXT,
    FOREIGN KEY (toy_id) REFERENCES toys(toy_id)
);
