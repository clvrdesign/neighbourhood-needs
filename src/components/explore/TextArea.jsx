import PropTypes from "prop-types"
export function TextArea({  problemText, formData, setFormData }) {
    function handleProblemText(event) {
      autosize(event);
      const contents = event.target.value;
      const input = event.target;
      setFormData((prevData) => ({
        ...prevData,
        problem: contents,
      }));

      if (contents.trim()?.length === 0) {
        setFormData((prevData) => ({
          ...prevData,
          isValidated: false,
        }));
        return input.setCustomValidity("You must state your problem first.");
      }

      if (contents.trim()?.length < 10) {
        setFormData((prevData) => ({
          ...prevData,
          isValidated: false,
        }));
        return input.setCustomValidity(
          `Please lengthen this text to 10 characters or more (you're currently using ${contents.length} characters).`
        );
      }

      input.setCustomValidity("");
    }
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
  