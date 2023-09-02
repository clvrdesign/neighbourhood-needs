import PropTypes from "prop-types";
import { TextArea } from "./TextArea.jsx";
import { EvidenceInput } from "./EvidenceInput.jsx";
import { NeighbourhoodSelect } from "./NeighbourhoodSelect.jsx";
export function Form({
  handleSubmit,
  handleProblemText,
  problemText,
  formData,
  showCharLimit,
  handleSelect,
  locationSelection,
}) {
  return (
    <form
      className={`problem-form ${formData.showForm || "problem-form--hidden"}`}
      onSubmit={handleSubmit}
    >
      <TextArea
        handleProblemText={handleProblemText}
        problemText={problemText}
        formData={formData}
      />
      <span className="character-count">
        {formData.message ? showCharLimit(formData.message) : 200}
      </span>
      <EvidenceInput />
      <div className="select-container">
        <NeighbourhoodSelect
          handleSelect={handleSelect}
          locationSelection={locationSelection}
          formData={formData}
        />
      </div>
      <button type="submit" className="post-btn">
        Post
      </button>
    </form>
  );
}

Form.propTypes = {
  formData: PropTypes.shape({
    message: PropTypes.string,
    showForm: PropTypes.bool,
  }),
  handleProblemText: PropTypes.func,
  handleSelect: PropTypes.func,
  handleSubmit: PropTypes.func,
  locationSelection: PropTypes.object,
  problemText: PropTypes.object,
  showCharLimit: PropTypes.func,
};
