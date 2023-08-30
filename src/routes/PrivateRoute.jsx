import { Navigate, Outlet } from "react-router-dom";
import Spinner from "src/components/spinner/Spinner.jsx";
import { useAuthStatus } from "hooks/useAuthStatus.js";
const PrivateRoute = () => {
  const [loggedIn, checkingStatus] = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
