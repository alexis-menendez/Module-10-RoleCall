//File path: rolecall/src/connection.ts

// import necessary modules
import colors from 'colors';

// laod environmental variables 
import dotenv from 'dotenv';
dotenv.config();

// import PostgreSQL client for database connection & destructure Pool class from pg package
import pg from 'pg';
const { Pool } = pg;

// create a postgreSQL connection pool using environmental variables
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

// connect to the database and handle errors
const connectToDb = async () => {
  try {
    await pool.connect();
    console.log(colors.rainbow('✅ Success: Connected to the database.'));
  } catch (err) {
    console.error(colors.red('❌ Error: Could not connect to the database.'), err);
    process.exit(1);
  }
};

// export the database pool and connection function for use in other modules
export { pool, connectToDb };
