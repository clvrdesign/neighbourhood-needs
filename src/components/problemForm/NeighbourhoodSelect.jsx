import PropTypes from "prop-types";
import { sortedNeighbourhoods } from "src/utils/extractNeighbourhoods.js";
export function NeighbourhoodSelect({
  handleSelect,
  locationSelection,
  formData,
}) {
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
    selected: PropTypes.any,
  }),
  handleSelect: PropTypes.any,
  locationSelection: PropTypes.any,
};
