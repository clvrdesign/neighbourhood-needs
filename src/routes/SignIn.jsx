import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import OAuth from "src/components/oAuth/OAuth.jsx";
function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function onChange(event) {
    setFormData((prevestate) => ({
      ...prevestate,
      [event.target.id]: event.target.value,
    }));
  }

  const { email, password } = formData;
  const toastOptions = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const navigate = useNavigate();
  async function onSubmit(event) {
    try {
      event.preventDefault();
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/");
        toast.success(
          `Welcome ${userCredential.user.displayName}`,
          toastOptions
        );
      }
    } catch (error) {
      toast.error("Bad user credentials", toastOptions);
    }
  }
  return (
    <div className="form-container">
      <header className="registration-header">
        <h1> Sign In</h1>
      </header>
      <form className="registration-form" onSubmit={onSubmit}>
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
          autoComplete="on"
          placeholder="enter password"
        />
        <Link className="forgot-password-link" to="/forgot-password">
          Forgot Password
        </Link>

        <div className="signup-btns">
          <button className="registration-form__signUpBtn">Sign In</button>
          <OAuth />
        </div>
      </form>
      <Link className="registration-link" to="/sign-up">
        Sign up Instead
      </Link>
    </div>
  );
}

export default SignIn;
