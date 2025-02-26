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

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

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
      navigate("/login");
    } catch (err) {
      console.error("Signup failed", err);
      setError("Failed to create an account. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/40 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/40 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/40 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/40 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="Confirm your password"
            />
          </div>

          <div>
            <label htmlFor="captcha" className="block text-sm font-medium mb-1">Captcha</label>
            <div className="mb-2 text-center text-xl font-semibold bg-black/40 px-4 py-2 rounded-lg">{captchaNumber}</div>
            <input
              type="text"
              id="captcha"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              required
              className="w-full px-4 py-2 bg-black/40 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
              placeholder="Enter captcha above"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition">
            Sign Up
          </button>

          <p className="text-center text-gray-300">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:text-blue-500 transition">
              Log in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
