//File path: rolecall/src/server.ts

// Import necessary moduloes
import inquirer from 'inquirer';
import colors from 'colors';
import chalk from 'chalk';

// load environtmental variable from .env file
import dotenv from 'dotenv';
dotenv.config();

// import PostgreSQL client for database connection & destructure Pool class from pg package
import pkg from 'pg';
const { Pool } = pkg;