import { useEffect, useState } from "react";
import NeighbourhoodFilter from "src/components/neighbourhoodFilter/NeighbourhoodFilter.jsx";
import ProblemForm from "src/components/problemForm/ProblemForm.jsx";
import ProblemList from "src/components/problemList/ProblemList.jsx";
import { generateGuestFingerprint } from "utils/generateGuestFingerprint.js";
import { generateGuestId } from "utils/generateGuestId.js";
import { collectUserData } from "utils/collectUserData.js";
import { handlePromise } from "utils/handlePromise.js";
function Explore() {
  // const [userData, setUserData] = useState({});

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       //overwrite with user's on key when registered!
  //       // await generateGuestFingerprint();
  //       // const acquiredData = await collectUserData();
  //       // setUserData(acquiredData);
  //     } catch (err) {
  //       console.error("An Error Occurred", err.message, err?.stack);
  //     }
  //   })();
  // }, []);

  return (
    <>
      <div className="container">
        <ProblemForm />
        <main>
          <NeighbourhoodFilter />
          <ProblemList />
        </main>
      </div>
    </>
  );
}

export default Explore;
