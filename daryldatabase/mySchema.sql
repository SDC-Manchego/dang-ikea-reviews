DROP DATABASE IF EXISTS ikea_reviews;
CREATE DATABASE ikea_reviews;
USE ikea_reviews;

CREATE TABLE reviews (
id 	INT UNIQUE NOT NULL AUTO_INCREMENT,
product_id TINYINT,
title 	VARCHAR(100),
text	TEXT NOT NULL,
date	DATE NOT NULL,
author	VARCHAR(100) NOT NULL,
overall_rating	TINYINT NOT NULL,
value_rating	TINYINT,
quality_rating	TINYINT,
appearance_rating	TINYINT,
ease_of_assembly_rating 	TINYINT,
works_as_expected_rating	TINYINT,
recommended		BOOLEAN,
helpful_count	INT DEFAULT 0,
not_helpful_count	INT DEFAULT 0,
reported_count	INT DEFAULT 0,
PRIMARY KEY(id)
);

CREATE TABLE product_data (
id TINYINT UNIQUE NOT NULL,
description	TEXT,
product_name VARCHAR(50),
designer VARCHAR(50),
height	INT NOT NULL,
length	INT NOT NULL,
width	INT NOT NULL,
weight	INT NOT NULL,
environment	TEXT,
materials	TEXT,
PRIMARY KEY(id)
);