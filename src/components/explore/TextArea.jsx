import PropTypes from "prop-types"
export function TextArea({ handleProblemText, problemText, formData }) {
  return (
    <textarea
      maxLength={200}
      rows={5}
      type="text"
      placeholder="Whats wrong in your Neighbourhood?"
      className="message"
      value={formData.message}
      onChange={handleProblemText}
      ref={problemText}
    />
  );
}

TextArea.propTypes = {
  formData: PropTypes.shape({
    message: PropTypes.any
  }),
  handleProblemText: PropTypes.any,
  problemText: PropTypes.any
}
  