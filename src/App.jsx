import { useEffect, useState } from "react";
import Header from "components/Header.jsx";
import "./styles.css";
import Container from "components/Container.jsx";
import NeighbourhoodFilter from "components/NeighbourhoodFilter.jsx";
import ProblemForm from "./components/ProblemForm.jsx";
import Main from "./components/Main.jsx";
import ProblemList from "./components/ProblemList.jsx";
import { generateGuestFingerprint } from "./utils/generateGuestFingerprint.js";
import { generateGuestId } from "./utils/generateGuestId.js";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    generateGuestFingerprint();
    generateGuestId();
  }, []);

  return (
    <Container>
      <Header {...{ showForm, setShowForm }} />
      <ProblemForm {...{ showForm }} />
      <Main>
        <NeighbourhoodFilter {...{ showFilter, setShowFilter }} />
        <ProblemList />
      </Main>
    </Container>
  );
}

export default App;
