import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";


const Home = () => {
    const [data,setData] = useState ([]);
    const loadData = async () => {
        const response = await axios.get ("http://localhost:5000/api/get");
        setData (response.data);
    };

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div style={{marginTop:"150px"}}>
            <Link to='/AddNewRecord'>
                <button className="btn btn-content">Add a new record</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}> Student ID</th>
                        <th style={{textAlign:"center"}}> Student Name</th>
                        <th style={{textAlign:"center"}}> Student Email</th>
                        <th style={{textAlign:"center"}}> Guardian Name</th>
                        <th style={{textAlign:"center"}}> Guardian Contact Number</th>
                        <th style={{textAlign:"center"}}> Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.StudentName}</td>
                                <td>{item.StudentEmail}</td>
                                <td>{item.GuardianName}</td>
                                <td>{item.GuardianContactNumber}</td>
                                <td>
                                    <Link to={'/update'}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete">Delete</button>
                                    <Link to={'/view'}>
                                        <button className="btn btn-view">View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    } )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
