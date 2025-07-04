import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8001/create", user);
      if (res.status === 201) {
        alert("User registered successfully!");
        setUser({ name: '', email: '', job: '', mobile: '' }); // clear form
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        alert(err.response.data);
      } else {
        alert("Something went wrong");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Register New User</h2>
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

        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>

      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
};
export default Register;
