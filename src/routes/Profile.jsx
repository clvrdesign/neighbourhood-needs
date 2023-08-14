import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BirthdayCake } from "img/BirthdayCake.svg";
import { ReactComponent as Clock } from "img/Clock.svg";
import { ReactComponent as Location } from "img/Location.svg";
import { timeAgo } from "src/utils/timeAgo.js";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

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
        <div className="latest-badge">
          <img src="https://placehold.co/128" alt="latest badge" />
        </div>
        <div className="profile-info">
          <h1 className="profile-info__heading">{user.name}</h1>
          <div className="profile-info__item">
            <BirthdayCake width="18px" height="18px" fill={"#e2e8f0"} />
            <p className="profile-info__text">member since {timeAgo(user.creationTime)}</p>
          </div>
          <div className="profile-info__item">
            <Clock width="18px" height="18px" fill={"#e2e8f0"} />
            <p className="profile-info__text">last seen {timeAgo(user.lastSignInTime)}</p>
          </div>
          <div className="profile-info__item">
            <Location width="18px" height="18px" fill={"#e2e8f0"} />
            <p className="profile-info__text">last seen {timeAgo(user.lastSignInTime)}</p>
          </div>
        </div>
        <div className="logout"></div>
        <button> Log Out</button>
      </header>
      <section></section>
    </div>
  ) : (
    "Not Logged In"
  );
}

export default Profile;
