
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "routes/About.jsx";
import Explore from "routes/Explore.jsx";
import Profile from "routes/Profile.jsx";
import SignIn from "routes/SignIn.jsx";
import SignUp from "routes/SignUp.jsx";
import ForgotPassword from "routes/ForgotPassword.jsx";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
