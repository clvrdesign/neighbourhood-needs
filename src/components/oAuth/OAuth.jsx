import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "src/firebase.config.js";
import { toast } from "react-toastify";
import { generateGuestFingerprint } from "src/utils/generateGuestFingerprint.js";
import { fetchIpAddress } from "src/utils/fetchIpAddress.js";
import { subtleSecurity } from "src/utils/subtleSecurity.js";
import { transformName } from "src/utils/transformName.js";
import { toastOptions } from "utils/toastOptions.js";
function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  async function handleGoogleAuth(event) {
    event.preventDefault();
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);

      //if no user in db then create new user

      if (!userSnapshot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          signature: transformName(user.displayName),
          dateRegistered: serverTimestamp(),
          lastModified: serverTimestamp(),
          ipAddressRegistered: await fetchIpAddress(),
          isShadowBanned: false,
          likedPost: [""],
          silverBadgesCount: 0,
          bronzeBadgesCount: 0,
          goldBadgesCount: 0,
          rank: 1,
          fingerprintRegistered: await generateGuestFingerprint(),
          location: "",
          profileLastUpdated: null,
          key: await subtleSecurity.constructor("rotateKey")(),
        });
      }
      navigate("/");
      return toast.success(`Welcome ${user.displayName}`, toastOptions);
    } catch (error) {
      toast.error("Could not Authorize with Google", toastOptions);
      console.log(error);
    }
  }
  return (
    <button
      className="registration-form__GoogleSignInBtn"
      onPointerDown={handleGoogleAuth}
    >
      Google Sign {location.pathname === "/sign-up" ? "up" : "in"}
    </button>
  );
}

export default OAuth;
