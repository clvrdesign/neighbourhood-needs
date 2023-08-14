import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    // setUser(auth.currentUser);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is not signed in.
        // ...
      }
    });
  }, []);

  return user ? <h1>{user.displayName}</h1> : "Not Logged In";
}

export default Profile;
