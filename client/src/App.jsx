import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Pages
import Accueil from "./components/Pages/Accueil/Accueil.jsx";
import PlatPrincipaux from "./components/Pages/PlatPrincipaux/Principaux.jsx";

//Import Widgets
import Footer from "../src/components/Widgets/Footer/Footer.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="Plats_Principaux" element={<PlatPrincipaux />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
