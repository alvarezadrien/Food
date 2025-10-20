import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Pages
import Accueil from "./components/Pages/Accueil/Accueil.jsx";
import PlatPrincipaux from "./components/Pages/PlatPrincipaux/Principaux.jsx";
import FicheRecettes from "./components/Pages/FichesRecettes/FichesR.jsx";

//Import Widgets
import Footer from "../src/components/Widgets/Footer/Footer.jsx";
import Navbar from "./components/Widgets/Navbar/Navbar.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="Plats_Principaux" element={<PlatPrincipaux />} />
          <Route path="Fiches_Recettes" element={<FicheRecettes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
