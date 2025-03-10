//File path: rolecall/src/connection.ts


// import necessary modules
import colors from 'colors';

// laod environmental variables 
import dotenv from 'dotenv';
dotenv.config();

// import PostgreSQL client for database connection & destructure Pool class from pg package
import pg from 'pg';
const { Pool } = pg;

