import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  return (
    <div className="form-container">
      <header>
        <h1> Sign Up Here</h1>
      </header>
      <form className="registration-form">
        <input
          className="registration-form__input"
          type="text"
          title="name"
          placeholder="enter first and last name"
        />
        <input
          className="registration-form__input"
          type="email"
          title="email"
          placeholder="enter email"
        />
        <input
          className="registration-form__input"
          type="password"
          title="password"
          placeholder="enter password"
        />

        <button className="registration-form__signUpBtn">Sign Up</button>
      </form>
      <Link className="registration-link" to="/sign-in">
        {" "}
        Sign in Instead{" "}
      </Link>
    </div>
  );
}

export default SignUp;
