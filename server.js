var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable= require("console.table");

var PORT= process.env.PORT || 8080;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Brie2026!",
    database: "employeeInfo_db"

});

connection.connect(function (err){
    if (err) {
        console.error("error connecting:" + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
    startSearch()

});

//using inquirer to recieve users data
function startSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add department?",
                "Add employee?",
                "Add Role?",
                "View Deparetmet?",
                "view employee?",
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

            }else if(query == "View Role?"){
                viewRole();
            }else if(query=="Update Employee role?")
                updateEmployeeRole();
            
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
                connection.query("INSERT INTO role (name) VALUES (?)", [answer.action], (err,res)=>{
                    if (err) throw err;
                    console.log("department successfully added");
                    startSearch()
                });

            })
            
           
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
                  
                

            });
            
        };
        //for view functions, just console log the response
        function viewDept() {
            connection.query("SELECT * FROM department", (err,res)=>{
                if (err) throw err;
                console.table(res)
                startSearch()
            });
        }

    function viewEmployee() {
        connection.query("SELECT * FROM employee", (err, res)=> {
            if (err) throw err;
            console.table(res)
            startSearch()
        });
    }
    function viewRoles(){
        connection.query("SELECT * FROM role", (err, res)=>{
            if (err) throw err;
            console.table(res)
            startSearch()
        });
    
    }
    function updateEmployeeRole(){
        inquirer
        .prompt({
            name: "action",
            type: "text",
            message: "Which Employee Role are you updating?",
        })
        connection.query("UPDATE employee SET role_id =? WHERE id =?", [answer.action, answer.action2], (err,res)=>{
            if (err) throw err;
            console.table(res)
            startSearch()
        });
    }



};

















        
            

