import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "routes/About.jsx";
import Explore from "routes/Explore.jsx";
import Profile from "routes/Profile.jsx";
import SignIn from "routes/SignIn.jsx";
import SignUp from "routes/SignUp.jsx";
import ForgotPassword from "routes/ForgotPassword.jsx";
import Footer from "components/Footer.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/src/styles.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
