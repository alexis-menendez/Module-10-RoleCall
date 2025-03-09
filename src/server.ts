//File path: rolecall/src/server.ts

import inquirer from 'inquirer';
import dotenv from 'dotenv';
import colors from 'colors';
import pkg from 'pg';
const { Pool } = pkg;


dotenv.config();

console.log(colors.rainbow('WELCOME TO EMPLOYEE TRACKER!'));
console.log(colors.rainbow('LETS GET STARTED!'));
console.log(colors.rainbow('PLEASE SELECT AN OPTION FROM THE MENU BELOW.'));



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
      message: colors.blue('WHAT WOULD YOU LIKE TO DO?'),
      choices: ['VIEW ALL DEPARTMENTS', 'VIEW ALL ROLES', 'VIEW ALL EMPLOYEES', 'ADD A DEPARTMENT', 'ADD A ROLE', 'ADD AN EMPLOYEE', 'UPDATE AN EMPLOYEE ROLE', 'EXIT'],
    },
  ]);

  switch (answers.mainMenu) {
    case 'VIEW ALL DEPARTMENTS':
      await viewDepartments();
      break;
    case 'VIEW ALL ROLES':
      await viewRoles();
      break;
    case 'VIEW ALL EMPLOYEES':
      await viewEmployees();
      break;
    case 'ADD A DEPARTMENT':
      await addDepartment();
      break;
    case 'ADD A ROLE':
      await addRole();
      break;
    case 'ADD AN EMPLOYEE':
      await addEmployee();
      break;
    case 'UPDATE AN EMPLOYEE ROLE':
      await updateEmployee();
      break;
    case 'EXIT':
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