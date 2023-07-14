import { useRef, useState, useEffect } from "react";
import { sortedNeighbourhoods } from "/src/utils/extractNeighbourhoods.js";

function ProblemForm({ showForm }) {
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const problemText = useRef(null);
  const problemSelection = useRef(null);
  

  function handleProblemText(event) {
    const contents = event.target.value.trim();
    const input = event.target;
    setMessage(contents);

    if (contents.trim().length === 0) {
      setIsValidated(false);
      return input.setCustomValidity("You must state your problem first.");
    }

    if (contents.trim().length < 10) {
      setIsValidated(false);
      return input.setCustomValidity(
        `Please lengthen this text to 10 characters or more (you're currently using ${contents.length} characters).`
      );
    }

    input.setCustomValidity("");
  }

  function handleSelect(event) {
    const contents = event.target.value;
    const selection = event.target;
    setSelected(contents);

    if (contents.length === 0) {
      setIsValidated(false);
      return selection.setCustomValidity("You must choose a location.");
    }

    selection.setCustomValidity("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const inputValue = problemText.current.value;
    const selectionValue = problemSelection.current.value;


    const invalidConditions = [
      {
        condition: inputValue.trim().length === 0,
        errorMessage: "You must state your problem first.",
        inputElement: problemText.current,
      },
      {
        condition: inputValue.trim().length < 10,
        errorMessage: `Please lengthen this text to 10 characters or more (you're currently using ${inputValue.length} characters).`,
        inputElement: problemText.current,
      },
      {
        condition: selectionValue.trim().length === 0,
        errorMessage: "You must choose a location.",
        inputElement: problemSelection.current,
      },
      {
        condition: !sortedNeighbourhoods.includes(selectionValue.trim()),
        errorMessage: "The location entered is not approved\n if you would like it added please send an email",
        inputElement: problemSelection.current,
      },
    ];

    for (const invalidSubmission of invalidConditions) {
      if (invalidSubmission.condition) {
        setIsValidated(false);
        invalidSubmission.inputElement.setCustomValidity(invalidSubmission.errorMessage);
        return invalidSubmission.inputElement.reportValidity();
      }
    }

    problemText.current.setCustomValidity("");
    problemSelection.current.setCustomValidity("");
    setIsValidated(true);
  }

  return (
    <form
      action=""
      className={`problem-form ${showForm || "problem-form--hidden"}`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Whats wrong in your Neighbourhood?"
        className="message"
        value={message}
        onChange={handleProblemText}
        ref={problemText}
      />
      <span className="character-count">200</span>
      <input
        className="evidence-submit"
        type="text"
        placeholder="Evidence (link to photo/video)"
      />
      <div className="select-container">
        <select
          className="neighbourhood-select"
          value={selected}
          onChange={handleSelect}
          ref={problemSelection}
        >
          <option value="">Where are you from?</option>
          {sortedNeighbourhoods.map((aNeighbourhood) => (
            <option key={aNeighbourhood} value={aNeighbourhood}>
              {aNeighbourhood}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="post-btn">
        Post
      </button>
    </form>
  );
}

export default ProblemForm;
