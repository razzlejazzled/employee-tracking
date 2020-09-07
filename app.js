const inquirer = require("inquirer");

 function promptUser(){
 return inquirer.prompt ([
     {
         type: "list",
         message: "What would you like to do?",
         name: "allOptions",
         choices: ["View All Employees", "View All Employees by Department", "View All Employees by Manager", "Add Employee",
         "Remove Employee", "Update Employee Role", "Update Employee Manager"]
     },
 ])

    if (allOptions.answer === "Add Employee") {
        return inquirer.prompt ([
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
            },
            // {
            //     type: "List",
            //     message: "Who is the employee's manager?",
            //     name: "newEmployeeManager",
            //     choices: figure out a way to pull in all current employees. Either add them to an array of all employees, or figure out a way to do this wit hsql

            // }

        ])
    }
}