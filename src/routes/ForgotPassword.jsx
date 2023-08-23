import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toastOptions } from "utils/toastOptions.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(event) {
    setEmail(event.target.value);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent!");
    } catch (error) {
      toast.error("Could not reset email",toastOptions);
    }
  }

  return (
    <div className="form-container">
      <header className="registration-header">
        <h1> Forgot Password</h1>
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

        <button className="forgot-form__signUpBtn">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
