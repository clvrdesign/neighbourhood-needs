import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BirthdayCake } from "img/BirthdayCake.svg";
import { ReactComponent as Clock } from "img/Clock.svg";
import { ReactComponent as Location } from "img/Location.svg";
import { timeAgo } from "utils/timeAgo.js";
import { getBadge } from "utils/getBadge.js";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  function onLogout() {
    auth.signOut();
    navigate("/")
  }
  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser({
          name: user.displayName,
          id: user.uid,
          email: user.email,
          lastSignInTime: user.metadata.lastSignInTime,
          creationTime: user.metadata.creationTime,
        });
      } else {
        // User is not signed in.
        navigate("/sign-in");
        // ...
      }
    });
  }, []);

  return user ? (
    <div className="profile-container">
      <header>
        <div className="badge-wrapper">
          <div className="latest-badge" title="Rank">
            <img src={getBadge(1).path} alt="latest badge" />
          </div>
          <p>{getBadge(1).name}</p>
        </div>
        <div className="profile-info">
          <h1 className="profile-info__heading">{user.name}</h1>
          <div className="profile-info__item">
            <BirthdayCake width="25px" height="25px" fill={"#e2e8f0"} />
            <p className="profile-info__text">
              Member since : {timeAgo(user.creationTime)}
            </p>
          </div>
          <div className="profile-info__item">
            <Clock width="25px" height="25px" fill={"#e2e8f0"} />
            <p className="profile-info__text">
              Last seen : {timeAgo(user.lastSignInTime)}
            </p>
          </div>
          <div className="profile-info__item">
            <Location width="25px" height="25px" fill={"#e2e8f0"} />
            <p className="profile-info__text">
              Neighbourhood : {user.location ?? "Port of Spain"}
            </p>
          </div>
        </div>

        <button className="logout" onPointerDown={onLogout}> Log Out</button>
      </header>
      <section></section>
    </div>
  ) : (
    "Not Logged In"
  );
}

export default Profile;
