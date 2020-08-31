// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mysql = require("mysql");

const app = express();

app.set('view engine', 'ejs'); // to use ejs
app.use(express.static("public")); // set the public folder as static for css/js files.

app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asd123456',
    database: 'EmployeeDB'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log("Server running on port 3000"));

// app.get("/", function(req, res){
//     res.render("home");
// });


app.get("/about", function(req, res){
    res.render("about");
});

app.get("/contact", function(req, res){
    res.render("contact");
});




// Get all employees
app.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields) => {
        if(err)
            console.log(err);      
        else
            // var parse = JSON.parse(rows);
            // var parse = JSON.parse(json);

            // console.log(parse);
            res.render("home", {rows: rows});
            console.log(rows);
            // var data0 = rows[0].Name + " " + rows[0].Salary;
            // var data1 = rows[1].Name;
            // // console.log(rows[1].Name);
            // res.render("home", {
            //     row0: data0, 
            //     row1: data1,
            // });
            // rows.forEach(((row) => {
                // console.log(`${row.Name} is ${row.Salary}`);
                // res.render("home", {row: `${row.Name} is ${row.Salary}`});
            // }));        
    });
});





// Get an employees
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employee WHERE EmpID = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
});

// Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?',[req.params.id],(err, rows, fields) => {
        if(!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});