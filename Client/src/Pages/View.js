import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css"

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get (`http://localhost:5000/api/get/${id}`).then ((resp) => setUser({...resp.data[0]}));
    }, [id]);

    return(
        <div style={{marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Student Details</p>
                </div>
                <div className="container">
                    <strong>ID : </strong>
                    <span>{id}</span>
                    <br/>
                    <br/>
                    <strong>Student Name : </strong>
                    <span>{user.StudentName}</span>
                    <br/>
                    <br/>
                    <strong>Student Email : </strong>
                    <span>{user.StudentEmail}</span>
                    <br/>
                    <br/>
                    <strong>Guardian Name : </strong>
                    <span>{user.GuardianName}</span>
                    <br/>
                    <br/>
                    <strong>Guardian Contact Number : </strong>
                    <span>{user.GuardianContactNumber}</span>
                    <br/>
                    <br/>
                    <Link to="/">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View;