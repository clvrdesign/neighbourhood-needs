import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    signature: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(event) {
    setFormData((prevestate) => ({
      ...prevestate,
      [event.target.id]: event.target.value,
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
      navigate("/");

      // build user object for db injection
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.dateRegistered = serverTimestamp();
      formDataCopy.ipAddressRegistered = await fetchIpAddress();
      formDataCopy.fingerprintRegistered = await subtleSecurity.constructor(
        "getLocalStorage"
      )("NNGFP");
      //for local storage encryption
      formDataCopy.key = await subtleSecurity.constructor("rotateKey")();
      formDataCopy.isShadowBanned = false;
      formDataCopy.likedPost = [""];
      formDataCopy.silverBadgesCount = 0;
      formDataCopy.bronzeBadgesCount = 0;
      formDataCopy.goldBadgesCount = 0;
      await setDoc(doc(db, "users", user.uid), formDataCopy);
    } catch (error) {
      console.error(error);
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
          value={name}
          onChange={onChange}
          required
          placeholder="enter first and last name"
        />
        <input
          className="registration-form__input"
          type="email"
          title="email"
          id="email"
          value={email}
          onChange={onChange}
          required
          placeholder="enter email"
        />
        <input
          className="registration-form__input"
          type="password"
          title="password"
          id="password"
          value={password}
          onChange={onChange}
          required
          minLength={8}
          maxLength={32}
          placeholder="enter password"
        />
        <fieldset>
          <legend>Select Signature:</legend>
          <input
            className="fieldset_input"
            type="radio"
            title="signature style"
            id="signature"
            name="signatureStyle"
            value={transformName(name)}
            onChange={onChange}
            required
          />
          <label htmlFor="signatureShort">
            {name
              ? transformName(name)
              : transformName("John Doe") + "(example)"}
          </label>
          <input
            className="fieldset_input"
            type="radio"
            title="signature style"
            name="signatureStyle"
            id="signature"
            value={getInitials(name)}
            onChange={onChange}
            required
          />
          <label htmlFor="signatureInitials">
            {name ? getInitials(name) : getInitials("John Doe") + "(example)"}
          </label>
        </fieldset>

        <button className="registration-form__signUpBtn">Sign Up</button>
      </form>
      <Link className="registration-link" to="/sign-in">
        Sign in Instead
      </Link>
    </div>
  );
}

export default SignUp;
