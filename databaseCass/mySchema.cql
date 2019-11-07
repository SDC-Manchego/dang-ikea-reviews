drop keyspace ikea;
create keyspace ikea with replication = {'class':'SimpleStrategy','replication_factor':1};

use ikea;
DROP TABLE reviews;
CREATE TABLE reviews (
id int PRIMARY KEY,
product_id int,
title 	text,
text	text,
date	date,
author	text,
overall_rating	int,
value_rating	int,
quality_rating	int,
appearance_rating	int,
ease_of_assembly_rating 	int,
works_as_expected_rating	int,
recommended		boolean,
helpful_count	int,
not_helpful_count	int,
reported_count	int
);

DROP TABLE product_data;
CREATE TABLE product_data (
id int PRIMARY KEY,
description	text,
product_name text,
designer text,
height	INT,
length	INT,
width	INT,
weight	INT,
environment	text,
materials	text,
product_reviews <frozen <reviews>>
);
