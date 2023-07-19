import { useRef, useState, useEffect } from "react";
import { sortedNeighbourhoods } from "/src/utils/extractNeighbourhoods.js";
import { v4 as generateID } from "uuid";
import { normalizeWords } from "/src/utils/normalizeWords.js";
import { filterBadWords } from "/src/utils/filterBadWords.js";
import { captureDateDetails } from "/src/utils/captureDateDetails.js";
import { fetchIpAddress } from "/src/utils/fetchIpAddress.js";
import { isMobileDevice } from "/src/utils/isMobileDevice.js";
function ProblemForm({ showForm }) {
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const problemText = useRef(null);
  const problemSelection = useRef(null);

  function handleProblemText(event) {
    const contents = event.target.value;
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

  async function handleSubmit(event) {
    event.preventDefault();
    let inputValue = problemText.current.value.trim();
    let selectionValue = problemSelection.current.value.trim();


 


    //normalize inputs to check against badword filter
    //for each word entered, normalize it then check in badword filter
    //if badword found invalidate submission
  
    
   

    const invalidConditions = [
      {
        condition: inputValue.length === 0,
        errorMessage: "You must state your problem first.",
        inputElement: problemText.current,
      },
      {
        condition: inputValue.length < 10,
        errorMessage: `Please lengthen this text to 10 characters or more (you're currently using ${inputValue.length} characters).`,
        inputElement: problemText.current,
      },
      {
        condition: await filterBadWords(normalizeWords(inputValue)),
        errorMessage: "Please do not use bad words",
        inputElement: problemText.current,
      },
      {
        condition: selectionValue.length === 0,
        errorMessage: "You must choose a location.",
        inputElement: problemSelection.current,
      },
      {
        condition: !sortedNeighbourhoods.includes(selectionValue),
        errorMessage:
          "The location entered is not approved\n if you would like it added please send an email",
        inputElement: problemSelection.current,
      },
    ];

    for (const invalidSubmission of invalidConditions) {
      if (invalidSubmission.condition) {
        setIsValidated(false);
        invalidSubmission.inputElement.setCustomValidity(
          invalidSubmission.errorMessage
        );
        return invalidSubmission.inputElement.reportValidity();
      }
    }

    problemText.current.setCustomValidity("");
    problemSelection.current.setCustomValidity("");
    setIsValidated(true);

   const post = {
     postID: generateID(),
     problem: message,
     postLocation: selected,
     date: await captureDateDetails().basic,
     postIPAddress: await fetchIpAddress(),
     fromShadowBannedUser: false, //need database cross checking
     votePositive: 0,
     voteNegative: 0,
     voteFlagged: 0,
     userID: await JSON.parse(localStorage.getItem("NNGID")),
     isMobileDevice:isMobileDevice()
   };

   console.log(post);
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
