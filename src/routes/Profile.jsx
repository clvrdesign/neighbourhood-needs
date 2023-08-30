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
    locationSelect.setCustomValidity("");
    SingleInitialInput.setCustomValidity("");
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
          lastModified: serverTimestamp(),
          profileLastUpdated: serverTimestamp(),
        };
        // const updatedUser = {
        //   ...user,
        //   profileLastUpdated: Timestamp.fromDate(new Date()), // mock for testing
        //   lastModified: Timestamp.fromDate(new Date()), // mock for testing
        // };
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
    const { profileLastUpdated } = user;
    const twoMonthsAgo = isMonthsAgo(new Date(profileLastUpdated?.seconds), 2);
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

      //dummy snapshot to minimize db reads
      // userSnapshot = {
      //   data: () => ({
      //     name: "Alfred Crayon",
      //     location: "",
      //     // profileLastUpdated: {
      //     //   seconds: dateInSeconds(getDateXDaysFromNow(5)),
      //     // },
      //     profileLastUpdated: null,
      //   }),
      // };
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
      <header>
        <div className="badge-wrapper">
          <div className="badge-wrapper__latest-badge" title="Rank">
            <img
              src={getBadge(user?.rank || 1)?.path}
              alt="latest badge"
              className="badge-wrapper__img"
            />
          </div>
          <p className="badge-wrapper__rank-name">
            {getBadge(user?.rank || 1)?.name}
          </p>
        </div>
        <div className="profile-info">
          <div className="profile-info__heading-wrapper">
            <h1 className="profile-info__heading">{user?.name}</h1>
            <p
              className="profile-info__update-text-btn"
              onClick={handleChangeClick}
            >
              {changeDetails && user.name ? "Save" : "update"}
            </p>
          </div>
          <div className="profile-info__item">
            <BirthdayCake width="25px" height="25px" fill={"#e2e8f0"} />
            <p className="profile-info__text">
              Member since : {timeAgo(authInfo.creationTime)}
            </p>
          </div>
          <div className="profile-info__item">
            <Clock width="25px" height="25px" fill={"#e2e8f0"} />
            <p className="profile-info__text">
              Last seen : {timeAgo(authInfo.lastSignInTime)}
            </p>
          </div>
          <form className="profile-info__form" ref={formRef}>
            <fieldset
              className={`profile-info__fieldset${
                changeDetails ? " profile-info__fieldset--show-border" : ""
              }`}
            >
              <legend className="profile-info__legend ">
                {changeDetails ? "Update In Progress" : null}
              </legend>
              <div className="profile-info__item">
                <Location width="25px" height="25px" fill={"#e2e8f0"} />

                <select
                  className="profile-info__select"
                  value={user.location}
                  id="location"
                  name="location"
                  onChange={onChange}
                  disabled={!changeDetails}
                  required
                >
                  <option className="profile-info__text" value="">
                    Where are you from?
                  </option>
                  {sortedNeighbourhoods.map((aNeighbourhood) => (
                    <option
                      key={aNeighbourhood}
                      value={aNeighbourhood}
                      className="profile-info__text"
                    >
                      {aNeighbourhood}
                    </option>
                  ))}
                </select>
              </div>
              <div className="profile-info__item">
                <Signature width="25px" height="25px" fill={"#e2e8f0"} />
                <p className="profile-info__text profile-info__text--keep-all">
                  Signature:
                </p>

                {user?.signature && !changeDetails ? (
                  <p className="profile-info__text">{user.signature}</p>
                ) : (
                  <div className="profile-info__signature-wrapper">
                    <input
                      className="fieldset_input"
                      type="radio"
                      title="signature style"
                      id="signature1"
                      name="signature"
                      value={transformName(authInfo?.name)}
                      onChange={onChange}
                      required
                    />
                    <label
                      className="profile-info__label"
                      htmlFor="signatureShort"
                    >
                      {user?.name
                        ? transformName(authInfo?.name)
                        : transformName("John Doe") + "\n(example)"}
                    </label>
                    <input
                      className="fieldset_input"
                      type="radio"
                      title="signature style"
                      name="signature"
                      id="signature2"
                      value={getInitials(authInfo?.name)}
                      onChange={onChange}
                      required
                    />
                    <label
                      className="profile-info__label"
                      htmlFor="signatureInitials"
                    >
                      {user?.name
                        ? getInitials(authInfo?.name)
                        : getInitials("John Doe") + "(example)"}
                    </label>
                  </div>
                )}
              </div>
            </fieldset>
          </form>
        </div>

        <button className="logout" onPointerDown={onLogout}>
          Log Out
        </button>
      </header>
      <section></section>
    </div>
  );
}

export default Profile;
