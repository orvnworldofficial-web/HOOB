// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ import footer

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignUp from "./pages/auth/SignUp"
import SignIn from "./pages/auth/SignIn"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import VerifyCode from "./pages/auth/VerifyCode";

// (Later you can add SignIn, Dashboard, etc.)

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-futuristic text-white flex flex-col">
        {/* Navbar on all pages */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element= {<Contact/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/verify-code" element={<VerifyCode/>}/>
          </Routes>
        </main>

        {/* Footer on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
