import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Pages principales
import Accueil from "./components/Pages/Accueil/Accueil.jsx";
import FicheRecettes from "./components/Pages/FichesRecettes/FichesR.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
import BackOffice from "./components/BackOffice/BackOffice.jsx";
import MentionsLegales from "./components/Pages/MentionsLegales/MentionsL.jsx";
import Confidentialite from "./components/Pages/PolitiquesConfitialite/Politiques.jsx";

// Import Pages Recettes
import PlatPrincipaux from "./components/Pages/PlatPrincipaux/Principaux.jsx";
import PetitDej from "./components/Pages/PetitDej/PetitD.jsx";
import Entrees from "./components/Pages/Entrees/Entrees.jsx";
import Soupes from "./components/Pages/Soupes/Soupes.jsx";
import Salades from "./components/Pages/Salades/Salades.jsx";
import Sauces from "./components/Pages/Sauces/Sauces.jsx";
import SnackA from "./components/Pages/SnackApero/SnackA.jsx";
import Desserts from "./components/Pages/Desserts/Desserts.jsx";

// Import Page Recherche 🔍
import Recherche from "./components/Pages/Recherche/Recherche.jsx";

// Import Pages Saisons
import Printemps from "./components/Pages/Saisons/Printemps/Printemps.jsx";

// Import Widgets
import Footer from "./components/Widgets/Footer/Footer.jsx";
import Navbar from "./components/Widgets/Navbar/Navbar.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* --- Pages principales --- */}
          <Route path="/" element={<Accueil />} />
          <Route path="/Fiches_Recettes" element={<FicheRecettes />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/BackOffice" element={<BackOffice />} />
          <Route path="/Mentions_légales" element={<MentionsLegales />} />
          <Route
            path="/Politique_confidentialité"
            element={<Confidentialite />}
          />

          {/* --- Pages recettes --- */}
          <Route path="/Plats_Principaux" element={<PlatPrincipaux />} />
          <Route path="/Petit_déjeuner" element={<PetitDej />} />
          <Route path="/Entrées" element={<Entrees />} />
          <Route path="/Soupes_Potages" element={<Soupes />} />
          <Route path="/Salades" element={<Salades />} />
          <Route path="/Sauces" element={<Sauces />} />
          <Route path="/Snack_Apéro" element={<SnackA />} />
          <Route path="/Desserts" element={<Desserts />} />

          {/* --- Page recherche --- */}
          <Route path="/recherche" element={<Recherche />} />

          {/* --- Pages saisons --- */}
          <Route path="/Printemps" element={<Printemps />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
