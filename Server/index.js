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

app.post("/api/post",(req, res) => {
    const {StudentName, StudentEmail, GuardianName, GuardianContactNumber} = req.body;
    const sqlInsert = "INSERT INTO studentdetails (StudentName, StudentEmail, GuardianName, GuardianContactNumber) VALUES (?, ?, ?, ?)";
    db.query (sqlInsert, [StudentName, StudentEmail, GuardianName, GuardianContactNumber],(error, result) => {
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get", (req, res)=>{
    const sqlGet = "SELECT * FROM studentdetails";
    db.query(sqlGet, function (error, result) {
        res.send(result);
    });
});

app.get("/",(req, res) => {
    //res.send("Hello Express!!!");
    //const sqlInsert = "INSERT INTO studentdetails (StudentName, StudentEmail, GuardianName, GuardianContactNumber) VALUES ('Sam','Sam@gmail.com','Harry',08613452)";
    //db.query(sqlInsert, function (error, result) {
    //        console.log("error", error);
    //        console.log("result", result);
    //    });
});

app.listen(5000, () => {
    console.log("Server is running on");
});
