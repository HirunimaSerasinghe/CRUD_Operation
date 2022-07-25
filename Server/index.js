const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createPool({
    host:"localhost",
    user: "sqluser",
    password:"password",
    database:"crud"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get", (req, res)=>{
    const sqlGet = "SELECT * FROM studentdetails";
    db.query(sqlGet, function (error, result) {
        res.send(result);
    });
});

app.post("/api/post",(req, res) => {
    const {StudentName, StudentEmail, GuardianName, GuardianContactNumber} = req.body;
    const sqlInsert = "INSERT INTO studentdetails (StudentName, StudentEmail, GuardianName, GuardianContactNumber) VALUES (?, ?, ?, ?)";
    db.query (sqlInsert,[StudentName, StudentEmail, GuardianName, GuardianContactNumber], (error, result) => {
       if (error){
        console.log(error);
       }
    });
});



app.delete("/api/remove/:id",(req, res) => {
    const {id} = req.params;
    console.log(id);
    const sqlRemove = "DELETE FROM studentdetails WHERE StudentID = ?";
    db.query (sqlRemove, id,(error, result) => {
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id",(req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM studentdetails WHERE StudentID = ?";
    db.query (sqlGet, id,(error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id",(req, res) => {
    const {id} = req.params;
    console.log(req);
    const {StudentName, StudentEmail, GuardianName, GuardianContactNumber} = req.body;
    const sqlUpdate = "UPDATE studentdetails SET StudentName = ?, StudentEmail = ?, GuardianName = ?, GuardianContactNumber = ? WHERE StudentID = ?";
    db.query (sqlUpdate, [StudentName, StudentEmail, GuardianName, GuardianContactNumber,id],(error, result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});



/*app.get("/",(req, res) => {
res.send("Hello Express!!!");
    const sqlInsert = "INSERT INTO studentdetails (StudentName, StudentEmail, GuardianName, GuardianContactNumber) VALUES ('Jack','Jack@gmail.com','Larry',08613452)";
    db.query(sqlInsert, function (error, result) {
           console.log("error", error);
            console.log("result", result);
      });
});*/

app.listen(5000, () => {
    console.log("Server is running on");
});
