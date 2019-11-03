DROP TABLE reviews;
CREATE TABLE reviews (
id 	SERIAL UNIQUE NOT NULL,
product_id INT,
title 	VARCHAR(100),
text	TEXT NOT NULL,
date	DATE NOT NULL,
author	VARCHAR(100) NOT NULL,
overall_rating	INT NOT NULL,
value_rating	INT,
quality_rating	INT,
appearance_rating	INT,
ease_of_assembly_rating 	INT,
works_as_expected_rating	INT,
recommended		BOOLEAN,
helpful_count	INT DEFAULT 0,
not_helpful_count	INT DEFAULT 0,
reported_count	INT DEFAULT 0,
PRIMARY KEY(id)
);

-- /Users/silkyh13/dang-ikea-reviews/database/mySchema.sql
-- database/mySchema.sql


DROP TABLE product_data;

CREATE TABLE product_data (
id SERIAL PRIMARY KEY,
description	TEXT,
product_name TEXT,
designer TEXT,
height	INT NOT NULL,
length	INT NOT NULL,
width	INT NOT NULL,
weight	INT NOT NULL,
environment	TEXT,
materials	TEXT
);