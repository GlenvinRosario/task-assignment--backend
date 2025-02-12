import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AxiosInstance from './../util/axios-config'
import "../styles/Register.css"; 

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    console.log("Register button clicked");
    e.preventDefault();
    setError(null);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    console.log("Form data:", formData);
  
    try {
      setLoading(true);
      const response = await AxiosInstance.post("/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
  
      console.log("Response:", response); 
      console.log("Registration successful!", response.data);
  
      setLoading(false);
      setUser({ name: response.data.username });
  
      if (response?.status === 201) {
        console.log("Navigating to login...");
        navigate("/login"); 
      } else {
        console.log("Unexpected response, not navigating.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="container">
      <div className="register-box">
        <h2 className="title">Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <div>
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="login-link">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
