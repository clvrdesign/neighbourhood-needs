import PropTypes from "prop-types";
import { sortedNeighbourhoods } from "src/utils/extractNeighbourhoods.js";
export function NeighbourhoodSelect({
  locationSelection,
  formData,
  setFormData,
}) {
  function handleSelect(event) {
    const contents = event.target.value;
    const selection = event.target;
    setFormData((prevData) => ({
      ...prevData,
      location: contents,
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

  return (
    <select
      className="neighbourhood-select"
      value={formData.selected ?? ""}
      onChange={handleSelect}
      ref={locationSelection}
    >
      <option value="">Where are you from?</option>
      {sortedNeighbourhoods.map((aNeighbourhood) => (
        <option key={aNeighbourhood} value={aNeighbourhood}>
          {aNeighbourhood}
        </option>
      ))}
    </select>
  );
}

NeighbourhoodSelect.propTypes = {
  formData: PropTypes.shape({
    selected: PropTypes.string,
  }),
  handleSelect: PropTypes.func,
  locationSelection: PropTypes.string,
  setFormData: PropTypes.func,
};
