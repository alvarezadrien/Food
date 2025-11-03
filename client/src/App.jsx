import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import Pages
import Accueil from "./components/Pages/Accueil/Accueil.jsx";
import FicheRecettes from "./components/Pages/FichesRecettes/FichesR.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
import BackOffice from "./components/BackOffice/BackOffice.jsx";
import MentionsLegales from "./components/Pages/MentionsLegales/MentionsL.jsx";
import Confidentialite from "./components/Pages/PolitiquesConfitialite/Politiques.jsx";
import Recherche from "./components/Pages/Recherche/Recherche.jsx";
import Connection from "./components/Pages/Connection/Connection.jsx";

// Import pages recettes
import PlatPrincipaux from "./components/Pages/PlatPrincipaux/Principaux.jsx";
import PetitDej from "./components/Pages/PetitDej/PetitD.jsx";
import Entrees from "./components/Pages/Entrees/Entrees.jsx";
import Soupes from "./components/Pages/Soupes/Soupes.jsx";
import Salades from "./components/Pages/Salades/Salades.jsx";
import Sauces from "./components/Pages/Sauces/Sauces.jsx";
import Accompagnements from "./components/Pages/SnackApero/Accompagnements.jsx";
import Desserts from "./components/Pages/Desserts/Desserts.jsx";

// Import Saisons pages
import Printemps from "./components/Pages/Saisons/Printemps/Printemps.jsx";

// Import Widgets
import Footer from "../src/components/Widgets/Footer/Footer.jsx";
import Navbar from "./components/Widgets/Navbar/Navbar.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* --- Accueil --- */}
          <Route path="/" element={<Accueil />} />

          {/* --- Fiches recettes --- */}
          <Route path="/Fiches_Recettes" element={<FicheRecettes />} />
          {/* ✅ Route dynamique pour les fiches individuelles */}
          <Route path="/Fiches_Recettes/:id" element={<FicheRecettes />} />

          {/* --- Catégories --- */}
          <Route path="/Plats_Principaux" element={<PlatPrincipaux />} />
          <Route path="/Petit_déjeuner" element={<PetitDej />} />
          <Route path="/Entrées" element={<Entrees />} />
          <Route path="/Soupes_Potages" element={<Soupes />} />
          <Route path="/Salades" element={<Salades />} />
          <Route path="/Sauces" element={<Sauces />} />
          <Route path="/Accompagnements" element={<Accompagnements />} />
          <Route path="/Desserts" element={<Desserts />} />

          {/* --- Recherche --- */}
          <Route path="/recherche" element={<Recherche />} />

          {/* --- Autres pages --- */}
          <Route path="/Contact" element={<Contact />} />
          <Route path="/BackOffice" element={<BackOffice />} />
          <Route path="/Mentions_légales" element={<MentionsLegales />} />
          <Route
            path="/Politique_confidentialité"
            element={<Confidentialite />}
          />
          <Route path="/Printemps" element={<Printemps />} />
          <Route path="/Connection" element={<Connection />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
