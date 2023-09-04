import { useState } from "react";
import NeighbourhoodFilter from "src/components/neighbourhoodFilter/NeighbourhoodFilter.jsx";
import ProblemList from "src/components/explore/ProblemList.jsx";
import { Form } from "components/explore/Form.jsx";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import { Header } from "components/explore/Header.jsx";


function Explore() {
  const initialState = {
    problem: "",
    location: "",
    isValidated: false,
    showForm: false,
  };
 
  const [formData, setFormData] = useState(initialState);

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
        <Header setFormData={setFormData} formData={formData} />
        <Form formData={formData} setFormData={setFormData} />
        <main>
          <NeighbourhoodFilter />
          <ProblemList />
        </main>
      </div>
    </>
  );
}

export default Explore;
