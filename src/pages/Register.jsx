import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";
import "../styles.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { email, password });
      navigate("/"); // redirect to login after successful registration
    } catch (err) {
      alert("Register failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-page">
      <div className="login-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p className="auth-text">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
