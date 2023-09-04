import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "src/components/oAuth/OAuth.jsx";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "src/firebase.config.js";
import { transformName } from "utils/transformName.js";
import { getInitials } from "utils/getInitials.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { subtleSecurity } from "src/utils/subtleSecurity.js";
import { fetchIpAddress } from "src/utils/fetchIpAddress.js";
import { toast } from "react-toastify";
import { sortedNeighbourhoods } from "src/utils/extractNeighbourhoods.js";
import { generateGuestFingerprint } from "src/utils/generateGuestFingerprint.js";
import { toastOptions } from "utils/toastOptions.js";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    signature: "",
    location: "",
  });
  const { name, email, password, location, signature } = formData;
  const navigate = useNavigate();

  function onChange(event) {
    setFormData((prevestate) => ({
      ...prevestate,
      [event.target.name]: event.target.value,
    }));
  }
  function handleSignature(event) {
    setFormData((prevestate) => ({
      ...prevestate,
      signature: event.target.value,
    }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await updateProfile(auth.currentUser, { displayName: name });
      // build user object for db insertion
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.dateRegistered = serverTimestamp();
      formDataCopy.lastModified = serverTimestamp();
      formDataCopy.ipAddressRegistered = await fetchIpAddress();
      formDataCopy.isShadowBanned = false;
      formDataCopy.likedPost = [""];
      formDataCopy.silverBadgesCount = 0;
      formDataCopy.bronzeBadgesCount = 0;
      formDataCopy.goldBadgesCount = 0;
      formDataCopy.rank = 1;
      formDataCopy.location = location;
      formDataCopy.lastProfileUpdate = serverTimestamp();
      formDataCopy.fingerprintRegistered = await generateGuestFingerprint();
      //set local fingerprint encrypting with user key
      //for local storage encryption
      formDataCopy.key = await subtleSecurity.constructor("rotateKey")();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/profile");
      toast.success("Registration Successful", toastOptions);
    } catch (error) {
      console.log(error);
      toast.error("Registration error, try again later", toastOptions);
    }
  }

  return (
    <div className="form-container">
      <header className="registration-header">
        <h1> Sign Up </h1>
      </header>
      <form className="registration-form" onSubmit={onSubmit}>
        <input
          className="registration-form__input"
          type="text"
          title="name"
          id="name"
          name="name"
          value={name}
          onChange={onChange}
          required
          placeholder="Enter first and last name"
        />
        <input
          className="registration-form__input"
          type="email"
          title="email"
          id="email"
          name="email"
          value={email}
          onChange={onChange}
          required
          placeholder="Enter email"
        />
        <input
          className="registration-form__input"
          type="password"
          title="password"
          id="password"
          name="password"
          value={password}
          onChange={onChange}
          required
          minLength={8}
          maxLength={32}
          autoComplete="on"
          placeholder="Enter password"
        />

        <div className="select-container signUp-select">
          <select
            className="neighbourhood-select"
            value={location}
            id="location"
            name="location"
            onChange={onChange}
            required
          >
            <option value="">Where are you from?</option>
            {sortedNeighbourhoods.map((aNeighbourhood) => (
              <option key={aNeighbourhood} value={aNeighbourhood}>
                {aNeighbourhood}
              </option>
            ))}
          </select>
        </div>

        <fieldset className="registration-form__fieldset">
          <legend className="registration-form__legend">
            Select signature
          </legend>
          <input
            className="fieldset_input"
            type="radio"
            title="signature style"
            id="signature1"
            name="signature"
            value={transformName(name)}
            onChange={onChange}
            required
          />
          <label htmlFor="signatureShort">
            {name
              ? transformName(name)
              : transformName("John Doe") + "\n(example)"}
          </label>
          <input
            className="fieldset_input"
            type="radio"
            title="signature style"
            name="signature"
            id="signature2"
            value={getInitials(name)}
            onChange={onChange}
            required
          />
          <label htmlFor="signatureInitials">
            {name ? getInitials(name) : getInitials("John Doe") + "(example)"}
          </label>
        </fieldset>

        <div className="signup-btns">
          <button className="registration-form__signUpBtn">Sign Up</button>
          <OAuth />
        </div>
      </form>
      <Link className="registration-link" to="/sign-in">
        Sign in Instead
      </Link>
    </div>
  );
}

export default SignUp;
