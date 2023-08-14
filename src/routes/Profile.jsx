import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        });
      } else {
        // User is not signed in.
        navigate("/sign-in");
        // ...
      }
    });
  }, []);

  return user ? <h1>{user.name}</h1> : "Not Logged In";
}

export default Profile;
