import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "src/firebase.config.js";
function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      const userCredential = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      updateProfile(auth.currentUser, { displayName: name });
      navigate("/");
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

        <button className="registration-form__signUpBtn">Sign Up</button>
      </form>
      <Link className="registration-link" to="/sign-in">
        Sign in Instead
      </Link>
    </div>
  );
}

export default SignUp;
