import { Form } from "./Form";
import { useRef, useState } from "react";
import { sortedNeighbourhoods } from "utils/extractNeighbourhoods.js";
import { normalizeWords } from "utils/normalizeWords.js";
import { filterBadWords } from "utils/filterBadWords.js";
import { isMobileDevice } from "utils/isMobileDevice.js";
import logoURL from "img/NNLogoWhite.png";
import { autosize } from "utils/autosizeTextArea.js";
import { showCharLimit } from "utils/showCharLimit.js";
import { subtleSecurity } from "src/utils/subtleSecurity.js";
import { Header } from "./Header";

function ProblemForm() {
  const initialState = {
    message: "",
    selected: "",
    isValidated: false,
    showForm: false,
  };

  const [formData, setFormData] = useState(initialState);
  const problemText = useRef(null);
  const locationSelection = useRef(null);

  function handleProblemText(event) {
    autosize(event);
    const contents = event.target.value;
    const input = event.target;
    setFormData((prevData) => ({
      ...prevData,
      message: contents,
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

  function handleSelect(event) {
    const contents = event.target.value;
    const selection = event.target;
    setFormData((prevData) => ({
      ...prevData,
      selected: contents,
    }));

    if (contents.length === 0) {
      setFormData((prevData) => ({
        ...prevData,
        isValidated: false,
      }));
      return selection.setCustomValidity("You must choose a location.");
    }

    selection.setCustomValidity("");
  }

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
        problem: formData.message,
        postLocation: formData.selected,
        fromShadowBannedUser: false,
        // postIPAddress: await fetchIpAddress(),
        userFingerPrint: await subtleSecurity.constructor("getLocalStorage")(
          "NNGFP"
        ),
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
    <>
      <Header logoURL={logoURL} setFormData={setFormData} formData={formData} />
      <Form
        handleSubmit={handleSubmit}
        handleProblemText={handleProblemText}
        problemText={problemText}
        formData={formData}
        showCharLimit={showCharLimit}
        handleSelect={handleSelect}
        locationSelection={locationSelection}
      />
    </>
  );
}

export default ProblemForm;
