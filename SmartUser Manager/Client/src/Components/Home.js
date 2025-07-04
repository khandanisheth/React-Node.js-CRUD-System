// Home.js

import '../App.css'; // CSS file import ho rahi hai styling ke liye
import { Link } from 'react-router-dom'; // Navigation ke liye Link component
import React, { useEffect, useState } from 'react'; // useState & useEffect import
import axios from 'axios'; // HTTP request bhejne ke liye axios import

const Home = () => {

    // users state banayi jo server se aaye huye users ko rakhegi
    const [users, setUsers] = useState([]);

    // 👇 API se data get karne wali function async banayi
    const getUsers = async () => {
        try {
            // API call with axios to GET users
            const res = await axios.get("http://localhost:8001/getusers");

            // agar status 201 hai to data state me save karo
            if (res.status === 201) {
                setUsers(res.data); // setUsers me data set kar rahe hain
            } else {
                alert("Failed to fetch users"); // agar status galat mila
            }
        } catch (error) {
            console.error("Error fetching users:", error); // console me error
            alert("Error fetching data"); // UI me alert
        }
    }

    // useEffect chalega jab component load hoga (like componentDidMount)
    useEffect(() => {
        getUsers(); // component mount hone ke baad getUsers call karo
    }, []);

    // ✅ Function to Delete User
    // Kya ho raha hai?
    // window.confirm popup dikhata hai user ko delete karne se pehle.
    // Agar user "OK" click kare, to axios.delete API call karta hai.
    // Agar delete successful ho, to list ko dobara fetch karo (getUsers()).
    const deleteuser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const res = await axios.delete(`http://localhost:8001/deleteuser/${id}`);
                if (res.status === 201) {
                    alert("User deleted successfully");
                    getUsers(); // user list ko dobara load karo
                } else {
                    alert("Failed to delete user");
                }
            } catch (error) {
                console.error("Delete error:", error);
                alert("Something went wrong while deleting");
            }
        }
    };

    return (
        <div className="mt-5">
            <div className="container">

                {/* Add User Button */}
                <div className="btn_add mb-2">
                    <Link to="/register" className="btn btn-primary">
                        Add User
                    </Link>
                </div>

                {/* Table to show all users */}
                <table className="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Job</th>
                            <th scope="col">Mobile No.</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // users state ko map karke table rows create kar rahe hain
                            users.map((val, index) => (
                                <tr key={val.id}>
                                    <th scope="row">{val.id}</th>
                                    <td>{val.name}</td>
                                    <td>{val.email}</td>
                                    <td>{val.job}</td>
                                    <td>{val.mobile}</td>
                                    <td className='d-flex gap-3'>
                                        {/* View User */}
                                        <Link to={`/view/${val.id}`} className="btn btn-success btn-sm">
                                            <i className="fa-solid fa-eye"></i>
                                        </Link>

                                        {/* Edit User */}
                                        <Link to={`/edit/${val.id}`} className="btn btn-primary btn-sm">
                                            <i className="fa-solid fa-user-pen"></i>
                                        </Link>

                                        {/* Delete User */}
                                        {/* 
                                        
                                        ✅ Kya ho raha hai?
                                            Ye button dikhata hai trash icon.
                                            onClick={() => deleteuser(val.id)}: 
                                            jab click hoga, to user ka id pass karega deleteuser() 
                                            function me.
                                        */}
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteuser(val.id)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;



//  Summary:
// 🔧 Part	                🔎 Explanation
// useState([])         	Users list ke liye state banayi
// getUsers()	            API se users ko fetch karta hai
// useEffect()	            Component mount hone par data laata hai
// map() in table	        Har user ke liye ek row banata hai
// Link component	        View, Edit, Delete ke liye navigation