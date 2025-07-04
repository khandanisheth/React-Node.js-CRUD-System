import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate(); // 🔹 for redirect after delete

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8001/singleuser/${id}`);
      if (res.status === 201) {
        setUser(res.data[0]);
      } else {
        alert("User fetch failed");
      }
    } catch (error) {
      alert("Error fetching user");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const deleteuser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`http://localhost:8001/deleteuser/${id}`);
        if (res.status === 201) {
          alert("User deleted successfully");
          navigate("/"); // 🔹 Back to home page
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center mb-4">👤 User Details</h4>

        <p><i className="fa-solid fa-id-badge me-2 text-primary"></i><strong>ID:</strong> {user.id}</p>
        <p><i className="fa-solid fa-user me-2 text-success"></i><strong>Name:</strong> {user.name}</p>
        <p><i className="fa-solid fa-envelope me-2 text-danger"></i><strong>Email:</strong> {user.email}</p>
        <p><i className="fa-solid fa-briefcase me-2 text-warning"></i><strong>Job:</strong> {user.job}</p>
        <p><i className="fa-solid fa-phone me-2 text-info"></i><strong>Mobile:</strong> {user.mobile}</p>

        <div className="d-flex justify-content-between mt-4">
          <Link to={`/edit/${user.id}`} className="btn btn-primary w-45">
            <i className="fa-solid fa-pen-to-square me-1"></i>Edit
          </Link>

          <button className="btn btn-danger w-45" onClick={() => deleteuser(user.id)}>
            <i className="fa-solid fa-trash me-1"></i>Delete
          </button>
        </div>

        <Link to="/" className="btn btn-secondary mt-3 w-100">
          <i className="fa-solid fa-arrow-left me-2"></i>Back to Home
        </Link>
      </div>
    </div>
  );
};

export default View;
