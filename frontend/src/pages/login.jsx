// src/pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setIsLoggedIn} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Assuming your API returns a token or user data upon successful login
      console.log("Login successful", response.data);
      setIsLoggedIn(true);
      localStorage.setItem('authtoken',response.data.token);
      
      // Redirect to homepage or dashboard after successful login
      navigate("/");

    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 border rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
