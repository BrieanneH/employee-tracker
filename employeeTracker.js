var inquirer = require("inquirer");
var mysql = require("mysql");
var cTable= require("console.table")

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
            if(query == "Add Department?")
            
        })

        //questions for each specific departments using inquirer
        function addDept(){
            inquirer
            .prompt ({
                name: "action",
                type: "text",
                message:"What department would you like to add?",

            }).then(function(answer){
                //
                connection.query("INSERT INTO role (title) VALUES (?)", [answer.action], (err,res)=>{
                    if (err) throw err;
                    console.log("role successfully added");
                    startSearch()
                });

            });
            
           
        };

};

















        
            

