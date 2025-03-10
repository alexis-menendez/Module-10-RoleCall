-- File path: rolecall/db/schema.sql

-- Drop the existing database if it exists to avoid conflicts
DROP DATABASE IF EXISTS rolecall_db;

-- Create a new database named rolecall_db
CREATE DATABASE rolecall_db;

-- Connect to the newly created database
\c rolecall_db;

-- Create a table to store department information
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);