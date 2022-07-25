import React, {useState, useEffect} from "react";
import{useNavigate, useParams, Link} from "react-router-dom";
import "./AddNewRecord.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
    StudentName: "",
    StudentEmail: "",
    GuardianName: "",
    GuardianContactNumber: ""
};


const AddNewRecord = () => {
    const [state, setState] = useState (initialState);
    const {StudentName, StudentEmail,GuardianName,GuardianContactNumber} = state;
    const navigate = useNavigate();

    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`).then ((resp) => setState ({...resp.data[0]}));
    },[id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!StudentName || !StudentEmail || !GuardianName || !GuardianContactNumber){
            toast.error("Please provide values into each input field");
        }else{
            if(!id){
                axios.post("http://localhost:5000/api/post", {
                StudentName,
                StudentEmail,
                GuardianName,
                GuardianContactNumber,
            }).then(()=> {
                setState({StudentName:"", StudentEmail:"",GuardianName:"",GuardianContactNumber:""});
            }).catch((err) => toast.error(err.response.data));
            toast.success("Record Added Successfully!");
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                StudentName,
                StudentEmail,
                GuardianName,
                GuardianContactNumber,
            }).then(()=> {
                setState({StudentName:"", StudentEmail:"",GuardianName:"",GuardianContactNumber:""});
            }).catch((err) => toast.error(err.response.data));
            toast.success("Record Updated Successfully!");
            }
            
            setTimeout(() => navigate.push("/"),500);
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
                
                <label htmlFor="StudentName">Student Name</label>
                <input type="text" id="StudentName" name="StudentName" placeholder="Student Name..." value={StudentName || ""} onChange={handleInputChange}/>
        
                <label htmlFor="StudentEmail">Student Email</label>
                <input type="email" id="StudentEmail" name="StudentEmail" placeholder="Student Email..." value={StudentEmail || ""} onChange={handleInputChange}/>

                <label htmlFor="GuardianName">Guardian Name</label>
                <input type="text" id="GuardianName" name="GuardianName" placeholder="Guadian Name..." value={GuardianName || ""} onChange={handleInputChange}/>
    
                <label htmlFor="GuardianContactNumber">Guardian Contact Number</label>
                <input type="number" id="GuardianContactNumber" name="GuardianContactNumber" placeholder="Guadian Contact Number..." value={GuardianContactNumber || ""} onChange={handleInputChange}/>
            

                <input type="submit" value={ id ? "Update" : "Save"}/>
                <Link to="/">
                    <input type="button" value="Go Back"/>
                </Link>
            </form>
        </div>
    );
};

export default AddNewRecord;
