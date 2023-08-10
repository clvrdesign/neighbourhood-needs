import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onChange(event) {
    setFormData((prevestate) =>({
      ...prevestate,
      [event.target.id]:event.target.value
    }) )
  }

  const {name, email, password} = formData
  return (
    <div className="form-container">
      <header>
        <h1> Sign Up </h1>
      </header>
      <form className="registration-form">
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
