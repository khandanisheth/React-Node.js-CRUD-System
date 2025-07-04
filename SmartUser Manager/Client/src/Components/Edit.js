import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    job: '',
    mobile: ''
  });

  const setData = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8001/singleuser/${id}`);
        if (res.status === 201) {
          setUser(res.data[0]);
        } else {
          alert("Failed to fetch user");
        }
      } catch (err) {
        alert("Error fetching user data");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8001/updateuser/${id}`, user);
      if (res.status === 201) {
        alert("User updated successfully");
        navigate("/");
      } else {
        alert("Failed to update user");
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit User Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" name="name" value={user.name} onChange={setData} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" value={user.email} onChange={setData} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input type="text" className="form-control" name="job" value={user.job} onChange={setData} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Mobile Number</label>
          <input type="tel" className="form-control" name="mobile" value={user.mobile} onChange={setData} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update</button>
      </form>
    </div>
  );
};

export default Edit;
