//File path: rolecall/src/server.ts

import inquirer from 'inquirer';
import dotenv from 'dotenv';
import colors from 'colors';
import chalk from 'chalk';
import pkg from 'pg';
const { Pool } = pkg;


dotenv.config();

console.log(colors.bold.magenta('=============================='));
console.log(colors.bold.magenta.underline('🌟 Welcome to RoleCall! 🌟'));
console.log(colors.magenta('Manage your employees, roles, and departments with ease!'));
console.log(colors.magenta('To begin, use the arrow keys to select an option from the menu below!'));
console.log(colors.bold.magenta('=============================='));

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

const mainMenu = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'mainMenu',
      message: colors.rainbow('What can I do for ya, Boss?'),
      choices: [
        chalk.hex(#FF3B30)('🔍 View All Departments'),
        chalk.hex(#FF9500)('📋 View All Roles'),
        chalk.hex(#FFCC00)('🙋 View All Employees'),
        chalk.hex(#34C759)('➕ Add a Department'),
        chalk.hex(#007AFF)('➕ Add a Role'),
        chalk.hex(#AF52DE)('➕ Add an Employee'),
        chalk.hex(#FF2D55)('✏️ Update an Employee Role'),
        colors.bgRed.white('❌ Exit')
      ],
    },
  ]);

  switch (answers.mainMenu) {
    case '🔍 View All Departments':
      await viewDepartments();
      break;
    case '📋 View All Roles':
      await viewRoles();
      break;
    case '🙋 View All Employees':
      await viewEmployees();
      break;
    case '➕ Add a Department':
      await addDepartment();
      break;
    case '➕ Add a Role':
      await addRole();
      break;
    case '➕ Add an Employee':
      await addEmployee();
      break;
    case '✏️ Update an Employee Role':
      await updateEmployee();
      break;
    case '❌ Exit':
      process.exit(0);
  }

  // Show the menu again after completing the action
  await mainMenu();
};

const viewDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  console.table(result.rows);
};

const viewRoles = async () => {
  const result = await pool.query('SELECT * FROM role');
  console.table(result.rows);
};

const viewEmployees = async () => {
  const result = await pool.query('SELECT * FROM employee');
  console.table(result.rows);
};

const addDepartment = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: colors.cyan('WHAT IS THE NAME OF THE DEPARTMENT?'),
    },
  ]);

  const { departmentName } = answers;
  await pool.query(
    `INSERT INTO department (name) VALUES ($1);`,
    [departmentName]
  );
  console.log(colors.green('Department inserted successfully!'));
};

const addRole = async () => {
  const departments = await pool.query('SELECT id, name FROM department');
  const departmentChoices = departments.rows.map(department => ({
    name: department.name,
    value: department.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: colors.yellow('WHAT IS THE ROLE TITLE?'),
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: colors.yellow('WHAT IS THE ROLE SALARY?'),
    },
    {
      type: 'list',
      name: 'roleDepartment',
      message: colors.yellow('WHAT DEPARTMENT IS THE ROLE IN?'),
      choices: departmentChoices,
    },
  ]);

  const { roleTitle, roleSalary, roleDepartment } = answers;
  await pool.query(
    `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`,
    [roleTitle, roleSalary, roleDepartment]
  );
  console.log('Role inserted successfully!');
};

const addEmployee = async () => {
  const roles = await pool.query('SELECT id, title FROM role');
  const roleChoices = roles.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));

  const employees = await pool.query('SELECT id, first_name, last_name FROM employee');
  const managerChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));
  managerChoices.push({ name: 'None', value: null });

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'EmployeeFirstName',
      message: colors.red('WHAT IS THE EMPLOYEE FIRST NAME?'),
    },
    {
      type: 'input',
      name: 'EmployeeLastName',
      message: colors.red('WHAT IS THE EMPLOYEE LAST NAME?'),
    },
    {
      type: 'list',
      name: 'EmployeeRole',
      message: colors.red('WHAT IS THE EMPLOYEE ROLE?'),
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'EmployeeManager',
      message: colors.red('WHO IS THE EMPLOYEE MANAGER?'),
      choices: managerChoices,
    },
  ]);

  const { EmployeeFirstName, EmployeeLastName, EmployeeRole, EmployeeManager } = answers;
  await pool.query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
    [EmployeeFirstName, EmployeeLastName, EmployeeRole, EmployeeManager]
  );
  console.log('Employee inserted successfully!');
};

const updateEmployee = async () => {
  const employees = await pool.query('SELECT first_name, last_name, role_id, manager_id FROM employee');
  const employeeChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));
  
const departments = await pool.query('SELECT id, name FROM department');
  const departmentChoices = departments.rows.map(department => ({
    name: department.name,
    value: department.id,
  }));

  const managerChoices = employees.rows.map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id}));
       
  const roles = await pool.query('SELECT id, title FROM role');
  const roleChoices = roles.rows.map(role => ({
    name: role.title,
    value: role.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'updateEmployee',
      message: colors.magenta('WHICH EMPLOYEE WOULD YOU LIKE TO UPDATE?'),
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'updateRole',
      message: colors.magenta('WHAT IS THEIR NEW ROLE?'),
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'updateManager',
      message: colors.magenta('WHO IS THEIR NEW MANAGER?'),
      choices: managerChoices,
    },
    {
      type: 'list',
      name: 'updateDepartment',
      message: colors.magenta('WHAT IS THEIR NEW DEPARTMENT?'),
      choices: departmentChoices,
    },
    {
      type: 'input',
      name: 'updateSalary',
      message: colors.magenta('WHAT IS THE EMPLOYEE NEW SALARY?'),
    },
  ]);

  const { updateEmployee, updateRole, updateManager, updateDepartment, updateSalary } = answers;
  await pool.query(
    `UPDATE employee SET role_id = $1, manager_id = $2 WHERE id = $3`, [updateRole, updateManager, updateEmployee]
  );
  await pool.query(`UPDATE role set department_id = $1, salary = $2 WHERE id = $3`, [updateDepartment, updateSalary, updateRole]);
  console.log('Employee updated successfully!');
};

connectToDb().then(() => {
  mainMenu();
});