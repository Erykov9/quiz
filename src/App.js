import { useEffect } from "react";
import Root from "./Root";
import QuestionsMain from "./components/Questions/QuestionsMain";
import Summary from "./components/Summary/Summart";
import { useAppContext } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute"; // ✅ Importujemy nowy komponent
import "./app.css";

function App() {
  const { setQuestions, setQuestionsLeft } = useAppContext();

  const getQuestions = async () => {
    const response = await fetch("/questions.json");
    const data = await response.json();
    setQuestions(data);
    setQuestionsLeft(data);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Root />} />
          {/* ✅ Ochrona tras */}
          <Route element={<ProtectedRoute />}>
            <Route path="/quiz" element={<QuestionsMain />} />
            <Route path="/summary" element={<Summary />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
