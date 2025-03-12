# Module 10

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS).

# Employee Tracker
Your Challenge this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.
Because this application won't be deployed, you'll also need to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. You'll need to submit a link to the video and add it to the README of your project.
Refer to the Video Submission Guide on the Full-Stack Blog for additional guidance on creating a video.

# User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

# Acceptance Criteria
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

# Getting Started
You'll need to use the pg package to connect to your PostgreSQL database and perform queries, and the Inquirer package to interact with the user via the command line.


As the image illustrates, your schema should contain the following three tables:

# department
id: SERIAL PRIMARY KEY
name: VARCHAR(30) UNIQUE NOT NULL to hold department name

# role
id: SERIAL PRIMARY KEY
title: VARCHAR(30) UNIQUE NOT NULL to hold role title
salary: DECIMAL NOT NULL to hold role salary
department_id: INTEGER NOT NULL to hold reference to department role belongs to

# employee
id: SERIAL PRIMARY KEY
first_name: VARCHAR(30) NOT NULL to hold employee first name
last_name: VARCHAR(30) NOT NULL to hold employee last name
role_id: INTEGER NOT NULL to hold reference to employee role
manager_id: INTEGER to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
You might want to use a separate file that contains functions for performing specific SQL queries you'll need to use. A constructor function or class could be helpful for organizing these. You might also want to include a seeds.sql file to pre-populate your database, making the development of individual features much easier.

# Bonus
Try to add some additional functionality to your application, such as the ability to do the following:
Update employee managers.
View employees by manager.
View employees by department.
Delete departments, roles, and employees.
View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

# Grading Requirements

# note
If a Challenge assignment submission is marked as “0”, it is considered incomplete and will not count towards your graduation requirements. Examples of incomplete submissions include the following:
A repository that has no code
A repository that includes a unique name but nothing else
A repository that includes only a README file but nothing else
A repository that only includes starter code
This Challenge is graded based on the following criteria:

# Deliverables: 10%
Your GitHub repository containing your application code.

# Walkthrough Video: 27%
A walkthrough video that demonstrates the functionality of the employee tracker must be submitted, and a link to the video should be included in your README file.
The walkthrough video must show all of the technical acceptance criteria being met.
The walkthrough video must demonstrate how a user would invoke the application from the command line.
The walkthrough video must demonstrate a functional menu with the options outlined in the acceptance criteria.

# Technical Acceptance Criteria: 40%
Satisfies all of the preceding acceptance criteria plus the following:
Uses the Inquirer package.
Uses the pg package to connect to a PostgreSQL database.
Follows the table schema outlined in the homework instructions.

# Repository Quality: 13%
Repository has a unique name.
Repository follows best practices for file structure and naming conventions.
Repository follows best practices for class/id naming conventions, indentation, quality comments, etc.
Repository contains multiple descriptive commit messages.
Repository contains a high-quality README with description and a link to a walkthrough video.

# Application Quality 10%
The application user experience is intuitive and easy to navigate.

# Bonus
Fulfilling any of the following can add up to 20 points to your grade. Note that the highest grade you can achieve is still 100:
Application allows users to update employee managers (2 points).
Application allows users to view employees by manager (2 points).
Application allows users to view employees by department (2 points).
Application allows users to delete departments, roles, and employees (2 points for each).
Application allows users to view the total utilized budget of a department—in other words, the combined salaries of all employees in that department (8 points).

# How to Submit the Challenge
You are required to submit BOTH of the following for review:
A walkthrough video demonstrating the functionality of the application.
The URL of the GitHub repository, with a unique name and a README describing the project.

# note
You are allowed to miss up to two Challenge assignments and still earn your certificate. If you complete all Challenge assignments, your lowest two grades will be dropped. If you wish to skip this assignment, click Next, and move on to the next Module.
Comments are disabled for graded submissions in BootCamp Spot. If you have questions about your feedback, please notify your instructional staff or the Student Success Advisor. If you would like to resubmit your work for an improved grade, you can use the Resubmit Assignment button to upload new links. You may resubmit up to three times for a total of four submissions.

# important
It is your responsibility to include a note in the README section of your repo specifying code source and its location within your repo. This applies if you have worked with a peer on an assignment, used code in which you did not author or create sourced from a forum such as Stack Overflow, or you received code outside curriculum content from support staff such as an Instructor, TA, Tutor, or Learning Assistant. This will provide visibility to grading staff of your circumstance in order to avoid flagging your work as plagiarized.
If you are struggling with a Challenge or any aspect of the curriculum, please remember that there are student support services available for you:
Xpert LA Chat+ - chat with a Live Agent in the "Xpert Learning Assistant Chat+" section of Bootcampspot - Canvas.
Office hours facilitated by your instructional staff before and after each class session.
Tutoring Guidelines—schedule a session in the "Tutor Sessions" section of Bootcampspot - Canvas.
If the above resources are not applicable and you have a need, please reach out to a member of your instructional team, your Student Success Advisor, or submit a support ticket in the Student Support section of your BCS application.

