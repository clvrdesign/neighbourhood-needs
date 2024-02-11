import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BirthdayCake } from "img/BirthdayCake.svg";
import { ReactComponent as Clock } from "img/Clock.svg";
import { ReactComponent as Location } from "img/Location.svg";
import { ReactComponent as Signature } from "img/Signature.svg";
import { timeAgo } from "utils/timeAgo.js";
import { getBadge } from "utils/getBadge.js";
import { transformName } from "src/utils/transformName.js";
import { getInitials } from "src/utils/getInitials.js";
import { sortedNeighbourhoods } from "src/utils/extractNeighbourhoods.js";
import { toast } from "react-toastify";
import { toastOptions } from "src/utils/toastOptions.js";
import Header from 'components/profile/Header.jsx'
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  getCountFromServer,
  getDocFromCache,
  startAfter,
  getDocFromServer,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "src/firebase.config.js";
import Spinner from "src/components/spinner/Spinner.jsx";
import { isMonthsAgo } from "src/utils/monthsAgo.js";
import { getDateXDaysFromNow } from "src/utils/getDateXDaysFromNow.js";
import { dateInSeconds } from "src/utils/dateInSeconds.js";

function Profile() {
  const [user, setUser] = useState({
    location: "",
    signature: "",
  });

  const [authInfo, setAuthInfo] = useState({
    name: "",
    id: "",
    email: "",
    lastSignInTime: "",
    creationTime: "",
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();
  const formRef = useRef(null);
  let locationSelect;
  let SingleInitialInput;
  let fDoubleInitialInput;
  if (formRef.current != null) {
    locationSelect = formRef.current[1];
    SingleInitialInput = formRef.current[2];
    fDoubleInitialInput = formRef.current[3];
  }

  function onChange(event) {
    setUser((prevestate) => ({
      ...prevestate,
      [event.target.name]: event.target.value,
    }));
    locationSelect?.setCustomValidity("");
    SingleInitialInput?.setCustomValidity("");
  }
  async function handleSubmit(event) {
    try {
      if (locationSelect.value.length === 0) {
        setChangeDetails(false);

        locationSelect.setCustomValidity("You must choose a location.");
        return locationSelect.reportValidity();
      }

      if (!SingleInitialInput.checked && !fDoubleInitialInput.checked) {
        setChangeDetails(false);
        SingleInitialInput.setCustomValidity("You must choose a signature.");
        return SingleInitialInput.reportValidity();
      }

      if (user.location && user.signature) {
        const userRef = doc(db, "users", authInfo.id);
        locationSelect.setCustomValidity("");
        SingleInitialInput.setCustomValidity("");
        setChangeDetails(true);
        const updatedUser = {
          ...user,
          id: authInfo.id,
          lastModified: serverTimestamp(),
          profileLastUpdated: serverTimestamp(),
        };

        //save to DB
        setUser(updatedUser);
        updateDoc(userRef, updatedUser);
        toast.success("Profile updated", toastOptions);
      }
    } catch (error) {
      toast.error("Could not update", toastOptions);
    }
  }

  function updateLocationAndSignature(event) {
    /**Since using the same button to update and save
     * when changeDetails = true, the user is trying to
     * save since it is false by default
     */

    changeDetails && handleSubmit(event);
    setChangeDetails((prevestate) => !prevestate);
  }
  function handleChangeClick(event) {
    const IN_MILLISECONDS = 1000;
    const MONTHS = 2;
    const { profileLastUpdated } = user;
    const twoMonthsAgo = isMonthsAgo(
      new Date(profileLastUpdated?.seconds * IN_MILLISECONDS),
      MONTHS
    );
    const isfirstUpdate = profileLastUpdated == null;

    if (!isfirstUpdate && !twoMonthsAgo) {
      return alert(
        "You can only update your location & signature once every 2 months!"
      );
    }
    if (!isfirstUpdate && twoMonthsAgo) {
      if (
        !confirm(
          "You can only update your location & signature once every 2 months!\nDo you want to update it now?"
        )
      ) {
        return;
      }
    }

    updateLocationAndSignature(event);
  }

  /* -------------------------------------------------------------------*/
  // #region of TODO
  /* -------------------------------------------------------------------*/

  /**
    # TODO:[x]-completed [A]-priority-letter
  
    1. [] [] fetch user from database
  
    2. [x] [] provide form for signature and location to be updated
  
    3. [] [] update last modified field, if less than 2 months prevent update and notify user
  
    4. [] [] cache user data and only read from db ifcache if last update was 
  
    5. [] [] Fifth todo
  
    6. [] [] Sixth todo
  
    7. [] [] Seventh todo
  
    8. [] [] Eight todo
  
    9. [] [] Ninth todo
  
    10.[] [] Tenth todo
  
    {$@11. todo $@11}*5 
  
  
   */

  /* -------------------------------------------------------------------*/
  // #endregion of TODO

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  const getUserFromDB = async (userID) => {
    let userSnapshot;
    try {
      if (userID == null) {
        return;
      }

      const userRef = doc(db, "users", userID);
      console.log("Network call");
      userSnapshot = await getDocFromServer(userRef);

      setUser((prevestate) => ({
        ...prevestate,
        ...userSnapshot.data(),
      }));
      setIsLoading(false);
    } catch (error) {
      console.error("Network call failed", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        return;
      }
      // User is signed in.

      setAuthInfo((prevestate) => ({
        ...prevestate,
        name: userFound.displayName,
        id: userFound.uid,
        email: userFound.email,
        lastSignInTime: userFound.metadata.lastSignInTime,
        creationTime: userFound.metadata.creationTime,
      }));
    }); //end of onAuthStateChanged
  }, [auth]);

  useEffect(() => {
    if (authInfo.id) {
      getUserFromDB(authInfo.id);
    }
  }, [authInfo.id]);
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="profile-container">
      <Header
        user={user}
        // getBadge={getBadge}
        // rank={rank}
        // path={path}
        // name={name}
        // aNeighbourhood={aNeighbourhood}
        // signature={signature}
        // timeAgo={timeAgo}
        // transformName={transformName}
        // getInitials={getInitials}
        handleChangeClick={handleChangeClick}
        changeDetails={changeDetails}
        formRef={formRef}
        onChange={onChange}
        authInfo={authInfo}
        onLogout={onLogout}
      />
      <section></section>
    </div>
  );
}

export default Profile;
