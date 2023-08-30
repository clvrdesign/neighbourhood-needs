import About from "./About.jsx";
import Explore from "./Explore.jsx";
import ForgotPassword from "./ForgotPassword.jsx";
import Profile from "./Profile.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

export const publicRoutes = [
  {
    path: "/",
    element: <Explore/>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
];
export const privateRoutes = [
  {
    path: "/profile",
    element: <Profile />,
  },
];
