import React, {useState, useEffect} from "react";
import{useHistory, useParams, Link} from "react-router-dom";
import "./AddNewRecord.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    StudentName: "",
    StudentEmail: "",
    GuadianName: "",
    GuardianContactNumber: ""
};


const AddNewRecord = () => {
    const [state, setState] = useState (initialState);
    const {StudentName, StudentEmail,GuadianName,GuardianContactNumber} = state;
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!StudentName || !StudentEmail || !GuadianName || !GuardianContactNumber){
            toast.error("Please provide values into each input field");
        }else{
            axios.post("http://localhost:5000/api/post", {
                StudentName,
                StudentEmail,
                GuadianName,
                GuardianContactNumber,
            }).then(()=> {
                setState({StudentName:"", StudentEmail:"",GuadianName:"",GuardianContactNumber:""});
            }).catch((err) => toast.error(err.response.data));
            toast.success("Record Added Successfully!");
            setTimeout(() => history.push("/"),500);
        }
    };

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
    };

    return(
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth:"400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}>
                <label htmlFor="name">Student Name</label>
                <input type="text" id="studentName" name="studentName" placeholder="Your Name..." value={StudentName} onChange={handleInputChange}/>
                <label htmlFor="name">Student Email</label>
                <input type="email" id="studentEmail" name="studentEmail" placeholder="Your Email..." value={StudentEmail} onChange={handleInputChange}/>
                <label htmlFor="name">Guardian Name</label>
                <input type="text" id="GuadianName" name="GuadianName" placeholder="Guadian Name..." value={GuadianName} onChange={handleInputChange}/>
                <label htmlFor="name">Guardian Contact Number</label>
                <input type="number" id="GuardianContactNumber" name="GuardianContactNumber" placeholder="Guadian Contact Number..." value={GuardianContactNumber} onChange={handleInputChange}/>
                <input type="submit" value="Save"/>
                <Link to="/">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    );
};

export default AddNewRecord;