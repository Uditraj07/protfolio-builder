// src/pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaNumber, setCaptchaNumber] = useState(generateCaptcha());
  const navigate = useNavigate();

  // Function to generate random 4-digit captcha number
  function generateCaptcha() {
    return Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Check if the captcha is correct
    if (parseInt(captchaInput) !== captchaNumber) {
      setError("Captcha is incorrect!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup successful", response.data);
      
      // Redirect to login page after successful signup
      navigate("/login");

    } catch (err) {
      console.error("Signup failed", err);
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 border rounded shadow-md">
        <h2 className="text-2xl mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="captcha" className="block">Please type the number below:</label>
          <div className="mb-2 text-center text-xl font-semibold">{captchaNumber}</div>
          <input
            type="text"
            id="captcha"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
