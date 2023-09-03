import { sortedNeighbourhoods } from "utils/extractNeighbourhoods.js";
import { useEffect, useState } from "react";

  let showFilter = false;
  if (typeof window !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
      const mediaQuery = window.matchMedia("(min-width: 1200px)");

      if (mediaQuery.matches) {
        showFilter = true;
      }
    });
  }

  
function NeighbourhoodFilter() {


  return (
    <aside>
      <nav>
        <details open={showFilter}>
          <summary>All Neighbourhoods</summary>
          <ul className="neighbourhood-list">
            {sortedNeighbourhoods.map((neighbourhood) => (
              <li key={neighbourhood}>
                <button>{neighbourhood.toUpperCase()}</button>
              </li>
            ))}
          </ul>
        </details>
      </nav>
    </aside>
  );
}

export default NeighbourhoodFilter;
