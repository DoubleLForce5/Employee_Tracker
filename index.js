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
          viewRoles();
          break;

        case 'View employees':
          viewEmployees();
          break;

        case 'Update an employee\'s role':
          updateEmployeeRole();
          break;

        case 'Update employee managers':
          // updateEmployeeManager();
          break;

        case 'View employees by manager':
          // which manager do you want to see employees from 
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
          name: 'department',
          message: 'What department will this role belong to?',
          choices: function () {
            const deptArray = [];
            results.forEach(({
              name,
              id
            }) => {
              deptArray.push({
                name: name,
                value: id
              });
            });
            console.log(deptArray);
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
        console.log(answer)
        connection.query('INSERT INTO role SET ?', {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department
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
          name: 'role',
          message: 'What role will this employee hold?',
          choices: function () {
            const roleArray = [];
            results.forEach(({
              title,
              id
            }) => {
              roleArray.push({
                name: title,
                value: id
              });
            });
            console.log(results)
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
        console.log(answer)
        connection.query('INSERT INTO employee SET ?', {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.role
          },
          (err, res) => {
            if (err) throw err;
            console.log('Employee successfully add!');
            start();
          });
      });
  });
};

const viewDepartment = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    res.forEach((name) => {
      console.table(name.name);
    });
    start();
  });
};

const viewRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    res.forEach((title) => {
      console.table(title.title);
    });
    start();
  });
};

const viewEmployees = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    res.forEach((name) => {
      console.log(name.first_name, name.last_name)
    });
    start();
  });
};

const updateEmployeeRole = () => {
  // Fetch all employees from the database
  connection.query('SELECT * FROM employee', (err, empResults) => {
    if (err) throw err;
    // Map all of the employees to Inquirer objects
    // console.log(empResults)
    const empChoice = empResults.map(employee => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      };
    });
    console.log(empChoice)
  });
  // console.log(employeeChoice)

  // Fetch all roles from the database
  connection.query('SELECT * FROM role', (err, roleResults) => {
    if (err) throw err;
    // Map all of the roles to Inquirer objects
    const roleChoice = roleResults.map(role => {
      return {
        name: `${role.title}`,
        value: `${role.id}`
      };
    });
    console.log(roleChoice)
  });
  // console.log(roleChoice)
  // Use Inquirer to ask which employee & role to select (and log responses)
  inquirer 
    .prompt([{
        type: 'list',
        name: 'employee',
        message: 'Please select an employee to update',
        choices: 
        function (data) {

          // const empArray = data.reduce(function(result, item, index) {
          //   result[index] = item
          //   return result 
          // })

          let empArray = [];
          for (let i = 0; i < data.length; i++){
            empArray.push(data[i].name);
          }
          console.log(empArray)
          return empArray
          
          // let empArray = []
          // data.map((name) => {
          //   console.log(name.first_name)
          //   empArray.push(name.first_name)
          // });
          // console.log(empArray)
          // return empArray


          // console.log(empChoice)
          // const empArray = [];
          // empChoice.map( empChoice => {
          //   empArray.push(employee.first_name + ", " + employee.last_name);
          //   console.log(employee)
          // });
          // for (i = 0; i < empChoice.length; i++){
          //   console.log(empChoice[i])
          // }
          // return empChoice[i]
          },
    },
      {
        type: 'list',
        name: 'role',
        message: 'What new role will this employee hold?',
        choices: 
        function (roleChoice) {
          const roleArray = [];
          res.forEach(({
            title,
            id
          }) => {
            roleArray.push({
              name: title,
              value: id
            });
          });
          // console.log(results)
          // console.log(roleArray);
        },
      }
    ])
   
    
};













connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
})