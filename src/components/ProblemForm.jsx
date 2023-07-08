import { sortedNeighbourhoods } from "/src/utils/extractNeighbourhoods.js";

// (function createDataList() {
//   const container = document.querySelector('.select-container');
//   const dataList = document.createElement('datalist');
//   dataList.id = 'neighbourhood-choice';

//   neighbourhoodList.forEach(function(neighbourhood) {
//     let neighbourhoodOption = document.createElement('option');
//     neighbourhoodOption.value = neighbourhood.toUpperCase();
//     dataList.appendChild(neighbourhoodOption);
//   });

//   container.appendChild(dataList);
// })();
function ProblemForm({showForm}) {

  
  return (
    <form action="" className={`problem-form ${showForm|| 'problem-form--hidden'}`}>
      <input
        type="text"
        placeholder="Whats wrong in your Neighbourhood?"
        className="message"
        required
        maxLength="200"
      />
      <span className="character-count">200</span>
      <input
        className="evidence-submit"
        type="text"
        placeholder="Evidence (link to photo/video)"
      />
      <div className="select-container">
        <input
          className="neighbourhood-select"
          required
          list="neighbourhood-choice"
          placeholder="Where?"
        />
        <datalist id="neighbourhood-choice">
          {sortedNeighbourhoods.map((aNeighbourhood, index) => (
            <option key={index} value={aNeighbourhood} />
          ))}
        </datalist>
      </div>
      <button className="post-btn">Post</button>
    </form>
  );
}

export default ProblemForm;
