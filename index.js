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
              name, id
            }) => {
              deptArray.push({name: name, value: id});
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
              title, id
            }) => {
              roleArray.push({name: title, value: id});
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
      .then((answer) => { console.log(answer)
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
  connection.query('SELECT * FROM role', (err,res) => {
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



const employee = () => {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) throw err;
    console.log(results)
      inquirer
        .prompt([{
          type: 'list',
          name: 'choiceOne', 
          message: 'Please select an employee to update',
          choices: function () {
            const empArray = [];
            results.forEach(( employee ) => {
              empArray.push(employee.first_name + ", "  + employee.last_name);
            });
            // console.log(empArray)
            return empArray
          }
        }]
        )
}})

const xyz = () => {
  connection.query('SELECT * FROM role', (err, results) => {
    if (err) throw err;
    inquirer
      .prompt([{
        type: 'list',
        name: 'role',
        message: 'Please choose an new role for this employee',
        choices: function () {
          const roleArray = [];
          results.forEach((role) => {
            roleArray.push(role.id, role.title, role.department_id);
          });
          return roleArray
        }
      }
      ])
  })

}

const updateEmployeeRole = () => {
employee();
xyz();


    // which emp would you like to update?
      // select employee to update 
      // array of employee's info 
        // grab employee's current role 
        // select new role from available roles
        // change role
  // connection.query('SELECT * FROM employee', (err, results) => {
  //   if (err) throw err;
  //   console.log(results)
  //     inquirer
  //       .prompt([{
  //         type: 'list',
  //         name: 'choiceOne', 
  //         message: 'Please select an employee to update',
  //         choices: function () {
  //           const empArray = [];
  //           results.forEach(( employee ) => {
  //             empArray.push(employee.first_name + ", "  + employee.last_name);
  //           });
  //           // console.log(empArray)
  //           return empArray
  //         }
  //       }]
  //       )
      // .then ((answer) => { console.log(answer)
      //   connection.query('SELECT * FROM role', (err, results) => {
      //     if (err) throw err;
      //     inquirer
      //       .prompt([{
      //         type: 'list',
      //         name: 'role',
      //         message: 'Please choose an new role for this employee',
      //         choices: function () {
      //           const roleArray = [];
      //           results.forEach((role) => {
      //             roleArray.push(role.id, role.title, role.department_id);
      //           });
      //           return roleArray
      //         }
      //       }
      //       ])
      //   })
      // })
       
  // }
  // );


}



// Something like this.....
// choices: [{name: 'John Doe', value: 1}, {name: 'Other dude', value: 2}]
// .then(
// returns 1 (this 1 represents John Doe)


connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  start();
})