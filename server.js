var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable= require("console.table");

var PORT= process.env.PORT || 8080;

var connection = mysql.createConnection({
    host: "localhost",
    port:336,
    user: "root",
    databse_: "db.db"

});

connection.connect(function (err){
    if (err) {
        console.error("error")
    }

});

//using inquirer to recieve users data
function employeeSearch() {
    inquirer
        .prompt({
            name: "job",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department?",
                "Add employee?",
                "Add Role?",
                "View Deparetmet?",
                "view emplyee?",
                "view role?",
                "update employee role?"
            ]

        }).then(function(answer){
            let query =answer.action;
            if(query == "Add Department?"){
                addDept();

            }else if(query == "Add Employee?"){
                addEmployee();

            }else if(query == "Add Role?"){
                addRoles();

            }else if(query == "View Department?"){
                viewDept();

            }else if(query == "View Employee?"){
                viewEmployee();

            }else if(query == "Viee Role?"){
                viewRole();
            }
            
        })

        //questions for each specific departments using inquirer
        function addDept(){
            inquirer
            .prompt ({
                name: "action",
                type: "text",
                message:"What department would you like to add?",

            }).then(function(answer){
                //using .then to constuct a promise to link multiple calls
                connection.query("INSERT INTO role (title) VALUES (?)", [answer.action], (err,res)=>{
                    if (err) throw err;
                    console.log("role successfully added");
                    startSearch()
                });

            });
            
           
        };

        function addEmployee(){
            inquirer
            .prompt({
                
             name: "action",
             type: "text",
             message: "Which employee would you like to add?",
                
            }).then(function(answer) {
                connection.query("INSERT INTO employee (first_name last_name) VALUES (?)", [answer.action], (err, res) => {
                    if (err) throw err;
                    console.log("Employee Succesfully Added!");
                    startSearch()
                });
            });
        };

        function addRoles(){
            inquirer
            .prompt ([
                {
                    name: "role",
                    type: "text",
                    message: "What role will you be adding?"
                },
                {
                    name: "department",
                    type: "text",
                    message: 'What is the department ID?'
                },
                {
                    name: "salary",
                    type: "text",
                    message: "What's the salary amount?"
                },
            ])
            .then(function(answer){
                // using a let statment to assign variable within block
                //let users input(value) be added as part of the employee's role
                let question = connection.query("INSERT INTO role(title, salary,department_id) VALUES (?, ?, ?)", [anwer.role, answer.department,anwer.salary], (err, res) =>{
                    if (err) throw err
                    console.log("Role succesfully added!");
                    startSearch()
                });
                  
                

            })
            
        }

};

















        
            

