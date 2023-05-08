const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
var cors = require('cors');
server.use(cors());
server.use(bodyParser.json());
 
 
//Establish the database connection
 
const db = mysql.createConnection({
 
    host: "localhost",
    user: "root",
    password: "password",
    database: "Student",
 
});
 
db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });
 
//Establish the Port
 
  server.listen(8085,function check(error) {
    if (error)
    {
    console.log("Error....dddd!!!!");
    }
 
    else
    {
        console.log("Started....!!!! 8085");
 
    }
});
 
//Create the Records
 
server.post("/api/student/add", (req, res) => {
  
    const Name = req.body.Name;
    const Course = req.body.Course;
    const Fees = req.body.Fees;
    const Sex = req.body.Sex;

    const query = "insert into studentDt ( stname , course ,fees,Sex) values(?,?,?,?)";
    
    db.query(query,[Name,Course,Fees,Sex], (error,result) => {
      if (error) {
        console.log('error')
        res.send({ status: false, message: "Student created Failed" });
      } else {
        res.send({ status: true, message: `Student created successfully ` });
      }
    });
  });
 
 
 
//view the Records
 
server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM studentDt";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send( result );
       
      }
    });
  });
 
 
//Search the Records
 
server.get("/api/student/:id", (req, res) => {
    // var studentid = req.body.userid;
    var st = req.params.id;
    var sql = "SELECT * FROM studentDt WHERE id=?";
    db.query(sql,[st], (error, result)=> {
      if (error) {
        console.log("Error Connecting to DB");
        
      } else {
        res.send(result);
      }
    });
  });
 
 
 
//Update the Records
 
server.put("/api/student/update/:id", (req, res) => {
    let sql ="UPDATE studentDt SET stname=?,course=?,fees=?,Sex=? where id=?"
    const stName = req.body.Name;
    const course = req.body.Course;
    const fees = req.body.Fees;
    const Sex = req.body.Sex;
    const id = req.params.id;
    // console.log(typeof(Sex));
    let a = db.query(sql,[stName,course,fees, Sex,id], (error, result) => {
      if (error) {
        res.send({ status: false, message: "Student Updated Failed" });
      } else {
        res.send(result);
      }
    });
  });
 
 
 
  //Delete the Records
 
  server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM STUDENTDT WHERE id=" + req.params.id + "";
    db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });