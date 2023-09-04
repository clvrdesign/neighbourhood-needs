import PropTypes from "prop-types";
import logoURL from "img/NNLogoWhite.png";
export function Header({  setFormData, formData }) {
  return (
    <header>
      <div className="logo">
        <img src={logoURL} alt="site logo" />
      </div>
      <h1>Neighbourhood Needs</h1>
      <sup>[BETA]</sup>
      <button
        className="form-toggle"
        onPointerDown={() =>
          setFormData((prevData) => ({
            ...prevData,
            showForm: !prevData.showForm,
          }))
        }
      >
        {formData.showForm ? `Close` : `Report`}
      </button>
    </header>
  );
}

Header.propTypes = {
  formData: PropTypes.shape({
    showForm: PropTypes.bool
  }),
  logoURL: PropTypes.string,
  setFormData: PropTypes.func
}
