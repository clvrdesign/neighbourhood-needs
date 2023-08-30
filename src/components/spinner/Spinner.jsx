import spinner from "img/Infinity.svg";

function Spinner() {
  return (
    <div className="spinner-container">
      <img
        width={"25%"}
        className="spinner-svg"
        src={spinner}
        alt="Loading..."
      />
    </div>
  );
}

export default Spinner;
