const mysql = require('mysql');
const inquirer = require('inquirer');


// create the connection information for the sql database
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employee_trackerDB',
});


const start = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
        'Add a department',
        'Add a role',
        'Add an employee',
        'View departments',
        'View roles',
        'View employees',
        'Update an employee\'s role',
        'Update employee managers',
        'View employees by manager',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View the total utilized budget of a department',
        'Quit'
      ]
    })
    .then((response) => {
      switch (response.options) {
        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'Add an employee':
          addEmployee();
          break;

        case 'View departments':
          viewDepartment();
          break;

        case 'View roles':
          break;

        case 'View employees':
          break;

        case 'Update an employee\'s role':
          break;

        case 'Update employee managers':
          break;

        case 'View employees by manager':
          break;

        case 'Delete a department':
          break;

        case 'Delete a role':
          break;

        case 'Delete an employee':
          break

        case 'Delete an employee':
          break;

        case 'View the total utilized budget of a department':
          break;

        case 'Quit':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${response.options}`);
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: 'input',
      name: 'name',
      message: 'Name of the department you would like to add?'
    })
    .then((answer) => {
      connection.query('INSERT INTO department SET ?', {
          name: answer.name
        },
        (err, res) => {
          if (err) throw err;
          console.log('Department successfully added!');

          start();
        }
      );
    });
};


const addRole = () => {

  connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([{
          type: 'list',
          name: 'choice',
          message: 'What department will this role belong to?',
          choices: function () {
            const deptArray = [];
            results.forEach(({
              name
            }) => {
              deptArray.push(name);
            });
            return deptArray;
          },
        },
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role would you like to add?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for this role?'
        },
      ])
      .then((answer) => {
        connection.query('INSERT INTO role SET ?', {
            title: answer.title,
            salary: answer.salary
          },
          (err, res) => {
            if (err) throw err;
            console.log('Role successfully add!')
            start();
          });
      });
  });
};

const addEmployee = () => {

  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([{
          type: 'list',
          name: 'choice',
          message: 'What role will this employee hold?',
          choices: function () {
            const roleArray = [];
            results.forEach(({
              title
            }) => {
              roleArray.push(title);
            });
            return roleArray;
          },
        },
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the first name of the employee you are adding?'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the last name of the employee you are adding?'
        },
      ])
      .then((answer) => {
        connection.query('INSERT INTO employee SET ?', {
            first_name: answer.firstName,
            last_name: answer.lastName
          },
          (err, res) => {
            if (err) throw err;
            console.log('Employee successfully add!')
            start();
          });
      });
  });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start()
  })
}




connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
});