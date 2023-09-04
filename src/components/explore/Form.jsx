import PropTypes from "prop-types";
import { TextArea } from "./TextArea.jsx";
import { EvidenceInput } from "./EvidenceInput.jsx";
import { NeighbourhoodSelect } from "./NeighbourhoodSelect.jsx";
import { showCharLimit } from "utils/showCharLimit.js";
import { useRef } from "react";
import { autosize } from "src/utils/autosizeTextArea.js";
import { sortedNeighbourhoods } from "utils/extractNeighbourhoods.js";
import { normalizeWords } from "utils/normalizeWords.js";
import { filterBadWords } from "utils/filterBadWords.js";
import { isMobileDevice } from "utils/isMobileDevice.js";

import { subtleSecurity } from "src/utils/subtleSecurity.js";
export function Form({ formData, setFormData }) {
  const problemText = useRef(null);
  const locationSelection = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    let inputValue = problemText.current.value.trim();
    let selectionValue = locationSelection.current.value.trim();

    // Normalize inputs and check against badword filter
    // for each word entered, normalize it then check in the badword filter
    // if a badword is found, invalidate submission

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
        inputElement: locationSelection.current,
      },
      {
        condition: !sortedNeighbourhoods.includes(selectionValue),
        errorMessage:
          "The location entered is not approved\n if you would like it added please send an email",
        inputElement: locationSelection.current,
      },
    ];

    for (const invalidSubmission of invalidConditions) {
      if (invalidSubmission.condition) {
        setFormData((prevData) => ({
          ...prevData,
          isValidated: false,
        }));
        invalidSubmission.inputElement.setCustomValidity(
          invalidSubmission.errorMessage
        );
        return invalidSubmission.inputElement.reportValidity();
      }
    }

    problemText.current.setCustomValidity("");
    locationSelection.current.setCustomValidity("");
    setFormData((prevData) => ({
      ...prevData,
      isValidated: true,
    }));

    try {
      if (!formData.isValidated) {
        return;
      }

      // Rest of the post object creation code
      const post = {
        problem: formData.problem,
        postLocation: formData.location,
        fromShadowBannedUser: false,
        // postIPAddress: await fetchIpAddress(),
        // userFingerPrint: await subtleSecurity.constructor("getLocalStorage")(
        //   "NNRFP"
        // ),
        votePositiveBy: [""],
        voteNegativeBy: [""],
        voteFlaggedBy: [""],
        isMobileDevice: isMobileDevice(),
      };

      console.log(post);
    } catch (error) {
      console.error("Problem Building Post:\n", error, "at:\n", error.stack);
    }
  }

  return (
    <form
      className={`problem-form ${formData.showForm || "problem-form--hidden"}`}
      onSubmit={handleSubmit}
    >
      <TextArea
        setFormData={setFormData}
        problemText={problemText}
        formData={formData}
      />
      <span className="character-count">
        {formData.message ? showCharLimit(formData.message) : 200}
      </span>
      <EvidenceInput />
      <div className="select-container">
        <NeighbourhoodSelect
          locationSelection={locationSelection}
          formData={formData}
          setFormData={setFormData}
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
    isValidated: PropTypes.bool,
    location: PropTypes.string,
    message: PropTypes.string,
    problem: PropTypes.string,
    showForm: PropTypes.bool,
  }),
  setFormData: PropTypes.func,
};
