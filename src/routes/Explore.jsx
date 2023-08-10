import { useEffect, useState } from "react";
import Header from "components/Header.jsx";
import "/src/styles.css";
import NeighbourhoodFilter from "components/NeighbourhoodFilter.jsx";
import ProblemForm from "components/ProblemForm.jsx";
import ProblemList from "components/ProblemList.jsx";

import { generateGuestFingerprint } from "utils/generateGuestFingerprint.js";
import { generateGuestId } from "utils/generateGuestId.js";
import { collectUserData } from "utils/collectUserData.js";
import { handlePromise } from "utils/handlePromise.js";
function Explore() {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async function () {
      try {
        await generateGuestFingerprint();
        await generateGuestId();
        const acquiredData = await collectUserData();
        setUserData(acquiredData);
      } catch (err) {
        console.error("An Error Occurred", err.message, err?.stack);
      }
    })();
  }, []);

  return (
    <>
      <div className="container">
        <Header {...{ showForm, setShowForm }} />
        <ProblemForm {...{ showForm }} />
        <main>
          <NeighbourhoodFilter {...{ showFilter, setShowFilter }} />
          <ProblemList />
        </main>
      </div>
    </>
  );
}

export default Explore;
