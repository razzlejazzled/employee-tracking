const inquirer = require("inquirer");
const mysql = require("mysql")
const { response } = require("express")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeedb"
});

connection.connect(function (err) {
    if (err) throw err;
    promptUser();
});

function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "prompt",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employee",
                "Remove Employee", "Update Employee Role", "Update Employee Manager", "Add Department", "Remove Department", "Add role", "Remove role"]
        },
    ])
        .then(function (resonse) {
            if (response.prompt === "View All Employees") {
                viewAllEmployees();
                promptUser()
            } else if (response.prompt === "View All Departments") {
                viewDepartments();
                promptUser();
            } else if (response.prompt === "View All Roles") {
                viewRoles();
                promptUser();
            } else if (response.prompt === "Add Employee") {
                addEmployee();

            } else if (response.prompt === "Remove Employee") {
                removeEmployee();
            } else if (response.prompt === "Update Employee Role") {
                updateEmployeeRole();
            } else if (response.prompt === "Update Employee Manager") {
                updateEmployeeManager();
            } else if (response.prompt === "Add Department") {
                addDepartment();
            } else if (response.prompt === "Remove Department") {
                removeDepartment();
            } else if (response.prompt === "Add role") {
                addRole();
            } else {
                removeRole();
            }
        })
    }
    const addEmployee = () => {
        return inquirer.prompt([
            {
                type: "input",
                message: "What is the Employee's First  Name",
                name: "newEmployeeFirstName",
            },
            {
                type: "input",
                message: "What is the Employee's Last Name?",
                name: "newEmployeeLastName"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                choices: ["Sales Lead", "Sales Person", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
                name: "newEmployeeRole"
                /// how to pull from database
            },
            // {
            //     type: "List",
            //     message: "Who is the employee's manager?",
            //     name: "newEmployeeManager",
            //     choices: figure out a way to pull in all current employees. Either add them to an array of all employees, or figure out a way to do this wit hsql

            // }

        ]).then(function(response){
            console.log(response)
            connection.query(
                "INSERT INTO employeedb SET people",
                {
                    firstName: response.newEmployeeFirstName,
                    lastName: response.newEmployeeLastName,
                    role: newEmployeeRole,
                    manager: newEmployeeManager,
                }, 
                function(err){
                    if (err) throw err;
                    console.log("You added a new employee")
                    promptUser();
                }
            )
        })
    };
    const removeEmployee = () => {
        connection.query("SELECT * FROM people", function(err, results){
          if(err) throw err;
          inquirer.prompt([
            {
              type: "list",
              name: "remove",
              message: "Which employee would you like to remove?",
              choices: function(){
                 let choiceArray = [];
                 for(let i = 0; i < results.length; i++){
                   choiceArray.push(results[i].first_name + " " + results[i].last_name);
                 }
                 return choiceArray;
              }
            }
           ])
           .then(function(answer){
            let chosenName;
            for(let i = 0; i < results.length; i++){
              if(results[i].first_name + " " + results[i].last_name === answer.remove){
                chosenName = results[i];
              }
            }
            connection.query(
              `DELETE FROM employee WHERE first_name='${chosenName.first_name}'`
            )
              console.log(`(${chosenName.first_name} ${chosenName.last_name} has been removed from employees)`)
              promptUser();
          })
        })
      }

      //updateEmployeeRole
      //updateEmployeeManager
      
    const addDepartment = () => {
        inquirer.prompt([
          {
            type: "input",
            name: "department",
            message: "What department would you like to add?"
          }
        ]).then(function(response){
         connection.query(
           "INSERT INTO employeedb SET departments",
           {
             departmentName: response.department,
           },
           function(err){
             if (err) throw err;
             console.log("You successfully added a new department!")
             promptUser();
           }
         )
        })
     };
     const removeDepartment = () => {
        connection.query("SELECT * FROM departments", function(err, results){
          if(err) throw err;
          inquirer.prompt([
            {
              type: "list",
              name: "removeDept",
              message: "which department would you like to remove?",
              choices: function(){
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].departmentName);
                }
                return choiceArray;
              }
            }
          ])
          .then(function(answer){
            console.log(answer)
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
              if(results[i].departmentName === answer.removeDept){
                chosenDept = results[i];
                console.log(chosenDept.departmentName);
              }
            }
            connection.query(
              `DELETE FROM department WHERE departmentName='${chosenDept.departmentName}'`
                )
              console.log(`${chosenDept.departmentName} has been removed from departments!`);
              start();
          })
        })
      }

      const addRole = () => {
        inquirer.prompt([
          {
            type: "input",
            name: "title",
            message: "What is the title of this role?"
          },
          {
            type: "input",
            name: "salary",
            message: "What is this role's salary?"
          },
          {
            type: "input",
            name: "department_id",
            message: "What is the department id?"
          }
        ]).then(function(response){
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: response.title,
              salary: response.salary,
              department_id: response.department_id
            },
            function(err){
              if(err) throw err;
              console.log("You have added a new role!");
              promptUser();
            }
          )
        })
      }
      const removeRole = () => {
        connection.query("SELECT * FROM role", function(err, results){
          if(err) throw err;
          inquirer.prompt([
            {
              type: "list",
              name: "removeRole",
              message: "Which role would you like to remove?",
              choices: function(){
                let choiceArray = [];
                for (let i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].title);
                }
                return choiceArray;
              }
            }
          ])
          .then(function(answer){
            let chosenRole;
            for (let i = 0; i < results.length; i++) {
              if(results[i].title === answer.removeRole){
                chosenRole = results[i];
              }
            }
            connection.query(
              `DELETE FROM role WHERE title='${chosenRole.title}'`
            )
            console.log(`${chosenRole.title} has been removed from roles!`);
            promptUser();
          })
        })
      }

      const viewAllEmployees = () => {
        connection.query("SELECT * FROM people", function(err, res){
          if (err) throw err;
          console.log("------------------------------------------------------");
          console.table(res);
        }
        )
     };
     const viewDepartments = () => {
        connection.query("SELECT * FROM departments", function(err, res){
          if(err) throw err;
          console.log("-------------------------------------------------------");
          console.table(res);
        })
      }
      const viewRoles = () => {
        connection.query("SELECT * FROM role", function(err, res){
          if(err) throw err;
          console.log("-------------------------------------------------------");
          console.table(res);
        })
      }
      
     
      