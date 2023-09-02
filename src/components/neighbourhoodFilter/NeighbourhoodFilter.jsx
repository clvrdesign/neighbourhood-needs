import {sortedNeighbourhoods} from "utils/extractNeighbourhoods.js";
import { useEffect, useState } from "react";


function NeighbourhoodFilter() {
    const [showFilter, setShowFilter] = useState(false);
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
              {sortedNeighbourhoods.map((neighbourhood) =>(
                <li key={neighbourhood}><button>{neighbourhood.toUpperCase()}</button></li>
              )) }

            </ul>
        </details>
    </nav>
</aside>
  )
}

export default NeighbourhoodFilter