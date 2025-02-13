import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AxiosInstance from './../util/axios-config';
import "../styles/Login.css"; 

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      setLoading(true);
      console.log("Login Request:", formData);

      const response = await AxiosInstance.post("/api/auth/login", formData);
  
      setLoading(false);
      console.log("Login successful!", response.data);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      setUser({ name: formData.email });

      navigate("/search");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="text" 
              id="email" 
              placeholder="Enter your Email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="register-link">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="register-text">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
