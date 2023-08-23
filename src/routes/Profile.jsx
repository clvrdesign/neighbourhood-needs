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
} from "firebase/firestore";
import { db } from "src/firebase.config.js";
import Spinner from "components/Spinner.jsx";

function Profile() {
  const [user, setUser] = useState({
    location: "",
    signature: "",
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const { location, signature } = user;
  const navigate = useNavigate();
  const auth = getAuth();

  const formRef = useRef(null);

  function onChange(event) {
    setUser((prevestate) => ({
      ...prevestate,
      [event.target.name]: event.target.value,
    }));
    formRef.current[1].setCustomValidity("");
    formRef.current[2].setCustomValidity("");
  }
  async function handleSubmit(event) {
    try {
      if (formRef.current[1].value.length === 0) {
        setChangeDetails(false);

        formRef.current[1].setCustomValidity("You must choose a location.");
        return formRef.current[1].reportValidity();
      }

      if (!formRef.current[2].checked && !formRef.current[3].checked) {
        setChangeDetails(false);
        formRef.current[2].setCustomValidity("You must choose a signature.");
        return formRef.current[2].reportValidity();
      }

      if (user?.location && user?.signature) {
        formRef.current[1].setCustomValidity("");
        formRef.current[2].setCustomValidity("");
        setChangeDetails(true);
      }
    } catch (error) {
      toast.error("Could not update", toastOptions);
    }
  }
  function handleChangeClick(event) {
    changeDetails && handleSubmit(event);
    setChangeDetails((prevestate) => !prevestate);
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

   const getUserFromDB = useCallback(async () =>{
      
    console.info("getUserFromDB Running...");
    try {
      let userSnapshot;
      let userRef;
      if (!user?.id) {
        console.log("no id")
        return;
      }
      console.log();
      userRef = doc(db, "users", user.id);

      //try getting from cache first
      userSnapshot = await getDocFromCache(userRef);

      console.log("userSnapshot", userSnapshot.data());
      console.log("userSnapshot?.exists()", userSnapshot?.exists());

      if (userSnapshot?.exists()) {
        setUser((prevestate) => ({
          ...prevestate,
          ...userSnapshot.data(),
        }));
        return setIsLoading(false);
      }
      // console.log("user id found");

      // userRef = await doc(db, "users", user.id);
      // userSnapshot = await getDocFromServer(userRef);
      // setUser((prevestate) => ({
      //   ...prevestate,
      //   ...userSnapshot.data(),
      // }));
      setIsLoading(false);
    } catch (error) {
      console.error("error occurred:\n\n", error);
      console.log({ user });
      setIsLoading(false);
    }

   },[] ); 

  useEffect(() => {
    onAuthStateChanged(auth, (userFound) => {
      if (!userFound) {
        return;
      }
      // User is signed in.
      let shouldSetUser = true;

      if (shouldSetUser) {
        setUser((prevestate) => ({
          ...prevestate,
          name: userFound.displayName,
          id: userFound.uid,
          email: userFound.email,
          lastSignInTime: userFound.metadata.lastSignInTime,
          creationTime: userFound.metadata.creationTime,
        }));
      }

      return () => {
        shouldSetUser = false;
      };
    }); //end of onAuthStateChanged
  }, []);

   const isMounted = useRef(true);
useEffect(() => {
  if (isMounted.current) {
    getUserFromDB();
  }

  return () => {
    isMounted.current = false;
  };
}, [user.id]);


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
              {changeDetails ? "Save" : "update"}
            </p>
          </div>
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

                {user.signature && !changeDetails ? (
                  <p className="profile-info__text">{user.signature}</p>
                ) : (
                  <div className="profile-info__signature-wrapper">
                    <input
                      className="fieldset_input"
                      type="radio"
                      title="signature style"
                      id="signature1"
                      name="signature"
                      value={transformName(user?.name)}
                      onChange={onChange}
                      required
                    />
                    <label
                      className="profile-info__label"
                      htmlFor="signatureShort"
                    >
                      {user?.name
                        ? transformName(user?.name)
                        : transformName("John Doe") + "\n(example)"}
                    </label>
                    <input
                      className="fieldset_input"
                      type="radio"
                      title="signature style"
                      name="signature"
                      id="signature2"
                      value={getInitials(user?.name)}
                      onChange={onChange}
                      required
                    />
                    <label
                      className="profile-info__label"
                      htmlFor="signatureInitials"
                    >
                      {user?.name
                        ? getInitials(user?.name)
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
