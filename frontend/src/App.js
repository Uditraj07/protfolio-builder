import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Signup from "./pages/signup";
import Login from "./pages/login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} /> 
        <Route path="/register" element={<Layout><Signup /></Layout>} /> 
        <Route path="/login" element={<Layout><Login /></Layout>} /> 
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
