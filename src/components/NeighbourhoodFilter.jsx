import {sortedNeighbourhoods} from "utils/extractNeighbourhoods.js";
import { useEffect } from "react";


function NeighbourhoodFilter({showFilter,setShowFilter}) {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1200px)')

    if (mediaQuery.matches) {
      setShowFilter(true);
    }
  }, []);
  return (
    <aside>
    <nav>
        <details open={showFilter}>
            <summary>
                All Neighbourhoods
            </summary>
            <ul className="neighbourhood-list">
              {sortedNeighbourhoods.map((aNeighbourhood) =>(
                <li key={aNeighbourhood}><button>{aNeighbourhood.toUpperCase()}</button></li>
              )) }

            </ul>
        </details>
    </nav>
</aside>
  )
}

export default NeighbourhoodFilter