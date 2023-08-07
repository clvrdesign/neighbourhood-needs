import { ReactComponent as NeighbourhoodIcon } from "img/NeighbourhoodIcon.svg";
import { ReactComponent as AboutIcon } from "img/AboutIcon.svg";
import { ReactComponent as UserIcon } from "img/UserIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchesRoute = (route) => route === location.pathname;

  return (
    <footer>
      <nav className="navigation-wrapper">
        <ul className="nav-list">
          <li className="list-item" onPointerDown={() => navigate("/")}>
            <NeighbourhoodIcon
              width="46px"
              height="36px"
              fill={pathMatchesRoute("/") ? "#e2e8f0" : "#64748b"}
            />
            <p className={pathMatchesRoute("/") ? "list-item-active":""}>
              Explore
            </p>
          </li>
          <li className="list-item" onPointerDown={() => navigate("/about")}>
            <AboutIcon
              width="36px"
              height="36px"
              fill={pathMatchesRoute("/about") ? "#e2e8f0" : "#64748b"}
            />
            <p className={pathMatchesRoute("/about") ? "list-item-active":""}>
              About
            </p>
          </li>
          <li className="list-item" onPointerDown={() => navigate("/profile")}>
            <UserIcon
              width="36px"
              height="36px"
              fill={pathMatchesRoute("/profile") ? "#e2e8f0" : "#64748b"}
            />
            <p className={pathMatchesRoute("/profile") ? "list-item-active":""}>
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
