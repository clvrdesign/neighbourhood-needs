import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  return (
    <div className="form-container">
      <header>
        <h1> Sign In</h1>
      </header>
      <form className="registration-form">
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

        <button className="registration-form__signUpBtn">Sign In</button>
      </form>
      <Link className="registration-link" to="/sign-up">
        Sign up Instead
      </Link>
    </div>
  );
}

export default SignIn;
