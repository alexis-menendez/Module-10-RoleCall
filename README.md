#  RoleCall
##  **Description**

RoleCall is a command-line application designed to help business owners manage their company's employee database efficiently. Built using Node.js, Inquirer, and PostgreSQL, RoleCall enables users to view, add, and update departments, roles, and employees with ease.

**Key Features**

* View all departments, roles, and employees in a formatted table.
* Add new departments, roles, and employees to the database.
* Update an employee's role.
* Streamlined command-line interface for efficient navigation.
* Built using asynchronous database queries for a smooth experience.

**Technology Stack**

* **Back-End:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/) 
* **Database:** [PostgreSQL](https://www.npmjs.com/package/pg)
* **CLI Interaction:** [Inquirer](https://www.npmjs.com/package/inquirer/v/8.2.4), [Colors](https://www.npmjs.com/package/colors), [Chalk](https://www.npmjs.com/package/chalk)
* **Package Management:** [npm](https://www.npmjs.com/)

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Walkthrough Video](#walkthrough-video)
* [Database Schema](#database-schema)
* [Contributing](#contributing)
* [Tests](#tests)
* [Documentation](#documentation)
* [Questions](#questions)


## Installation

To set up and run RoleCall on your local machine, follow these steps:

1. Ensure you have the following installed:
	* [Express.js](https://expressjs.com/) 
	* [Node.js](https://nodejs.org/) 
	* [npm](https://www.npmjs.com/) (Comes bundled with Node.js)
	* [PostgreSQL](https://www.postgresql.org/)
	* [Colors](https://www.npmjs.com/package/colors)
	* [Chalk](https://www.npmjs.com/package/chalk)
   
2. Clone the [RoleCall](https://github.com/alexis-menendez/RoleCall) repository to your local machine:
	* Open a terminal or command prompt and run:
	  * git clone <(https://github.com/alexis-menendez/RoleCall)>

3. Navigate to the project directory:
	* cd your/project/folder/RoleCall

4. Install Dependencies:
	* Run the following command to install all required dependencies:
	  * npm run install

5. Set up your PostgreSQL database:
	* Create a PostgreSQL database.
	* Use the provided schema.sql file to structure your database.
	* (Optional) Use seeds.sql to populate initial data.

6. Configure environment variables:

	* Create a .env file in the root directory and add:
	  * DB_NAME=your_database_name
	  * DB_USER=your_database_user
	  * DB_PASSWORD=your_database_password

7. Build the Application:
	* In the terminal, still in the project directory run:
	  * npm build

8. Run the Application:
	* In the terminal, still in the project directory run:
	  * npm start

## Usage

1. Run the application using command:
	* npm start

2. Select an option from the main menu:
	* View all departments
	* View all roles
	* View all employees
	* Add a department
	* Add a role
	* Add an employee
	* Update an employee role

3. Follow the prompts to interact with the employee database.


## Walkthrough Video

* [Walkthrough Video](https://drive.google.com/LINK/GOES/HERE)

## Database Schema

RoleCall uses a PostgreSQL database with three primary tables:

department
| Column    | Type | Description |
| -------- | ------- | ------- |
| id  | SERIAL PRIMARY KEY    | Unique ID for the department    |
| name | VARCHAR(30) UNIQUE NOT NULL     | Department name    |

role
| Column    | Type | Description |
| -------- | ------- | ------- |
| id  | SERIAL PRIMARY KEY    | Unique ID for the role   |
| title | VARCHAR(30) UNIQUE NOT NULL     | Job title    |
| salary  | DECIMAL NOT NULL    | Salary for the role    |
| department_id | INTEGER NOT NULL     | References department    |

employee
| Column    | Type | Description |
| -------- | ------- | ------- |
| id  | SERIAL PRIMARY KEY    | Unique ID for the employee   |
| first_name | VARCHAR(30) UNIQUE NOT NULL     | Employee first name    |
| last_name  | VARCHAR(30) NOT NULL   | Employee last name    |
| role_id | INTEGER NOT NULL     | References role    |
| manager_id  | INTEGER    | References another employee (optional)    |

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes and create a pull request.


## Tests

There are currently no automated tests for this project

## Documentation

* [Inquirer.js Documentation](https://www.npmjs.com/package/inquirer)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [Project Repository](https://github.com/alexis-menendez/RoleCall)
* [Walkthrough Video](https://drive.google.com/LINK/GOES/HERE)

## Acknowledgements

* I used Github Copilot to help me write the code for this project, primarily its suggestive text feature which enabled me to write code faster.
* I also used ChatGPT to:
  	* Provide assistance debugging my code. I am happy to provide transcripts of the conversation with ChatGPT upon request.
  	* Review my completed project and offer suggestions for improvement.
  	* Create detailed explanations for certain concepts which informed my writing.

## Contact

If you have any questions, feel free to contact me:

*  **GitHub**: [alexis-menendez](https://github.com/alexis-menendez)
*  **Email**: alexis.menendez@austincc.edu


