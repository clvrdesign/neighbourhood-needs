import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "components/Footer.jsx";
import PrivateRoute from "routes/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/src/styles.css";
import { privateRoutes, publicRoutes } from "routes/allRoutes.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            {privateRoutes.map((closedRoute) => (
              <Route
                key={closedRoute.path}
                path={closedRoute.path}
                element={closedRoute.element}
              />
            ))}
          </Route>
          {publicRoutes.map((openRoute) => (
            <Route
              key={openRoute.path}
              path={openRoute.path}
              element={openRoute.element}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
