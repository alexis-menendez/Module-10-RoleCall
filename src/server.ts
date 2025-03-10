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

// display instructions in the console
console.log(chalk.hex('#AF52DE')('=============================='));  // Purple
console.log(colors.bold.rainbow.underline('🌈 Welcome to RoleCall! 🌈')); // Magenta
console.log(chalk.hex('#FF2D55')('Manage your employees, roles, and departments with ease!')); // Pink
console.log(chalk.hex('#FF2D55')('To begin, use the arrow keys to select an option from the menu below!')); // Pink
console.log(chalk.hex('#AF52DE')('=============================='));  // Purple

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

// display the main menu
const mainMenu = async () => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'mainMenu',
        message: colors.rainbow('What can I do for ya, Boss?'), // Rainbow
        choices: [
          colors.red('🔍 View All Departments'), // Red
          chalk.hex('#FF9500')('📋 View All Roles'), // Orange
          colors.yellow('🙋 View All Employees'), // Yellow
          colors.green('➕ Add a Department'), // Green
          colors.blue('➕ Add a Role'), // Blue
          chalk.hex('#AF52DE')('➕ Add an Employee'), // Purple
          chalk.hex('#FF2D55')('✏️ Update an Employee Role'), // Pink
          colors.bgRed.white('❌ Exit') // Red background, white text
        ],
      },
    ]);