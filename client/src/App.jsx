import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Pages
import Accueil from "./components/Pages/Accueil/Accueil.jsx";
import FicheRecettes from "./components/Pages/FichesRecettes/FichesR.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
import BackOffice from "./components/BackOffice/BackOffice.jsx";

// Import pages recettes
import PlatPrincipaux from "./components/Pages/PlatPrincipaux/Principaux.jsx";
import PetitDej from "./components/Pages/PetitDej/PetitD.jsx";
import Entrees from "./components/Pages/Entrees/Entrees.jsx";
import Soupes from "./components/Pages/Soupes/Soupes.jsx";
import Salades from "./components/Pages/Salades/Salades.jsx";
import Sauces from "./components/Pages/Sauces/Sauces.jsx";
import SnackA from "./components/Pages/SnackApero/SnackA.jsx";
import Desserts from "./components/Pages/Desserts/Desserts.jsx";

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
          <Route path="Petit_déjeuner" element={<PetitDej />} />
          <Route path="Entrées" element={<Entrees />} />
          <Route path="Soupes_Potages" element={<Soupes />} />
          <Route path="Salades" element={<Salades />} />
          <Route path="Sauces" element={<Sauces />} />
          <Route path="Snack_Apéro" element={<SnackA />} />
          <Route path="Desserts" element={<Desserts />} />
          <Route path="/" element={<Accueil />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="BackOffice" element={<BackOffice />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
