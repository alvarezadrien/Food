import React from "react";
import "./MentionsL.css";

export default function MentionsLegales() {
  return (
    <main className="mentions-container">
      <h1>Mentions légales</h1>

      <section>
        <h2>1. Éditeur du site</h2>
        <p>
          Le site <strong>Les Délices du Jour</strong> est un blog culinaire
          dédié au partage de recettes, d’astuces et d’idées gourmandes.
          <br />
          Il est édité à titre personnel par <strong>Adrien Alvarez</strong>.
        </p>
      </section>

      <section>
        <h2>2. Objet du site</h2>
        <p>
          Ce site a pour objectif de partager des recettes, des conseils et des
          articles autour de la cuisine. Les contenus sont fournis à titre
          informatif et ne constituent pas des conseils professionnels.
        </p>
      </section>

      <section>
        <h2>3. Propriété intellectuelle</h2>
        <p>
          L’ensemble des textes, images et éléments du site{" "}
          <strong>Les Délices du Jour</strong> sont la propriété exclusive de
          leur auteur, sauf mention contraire. Toute reproduction, totale ou
          partielle, est interdite sans autorisation préalable.
        </p>
      </section>

      <section>
        <h2>4. Données personnelles</h2>
        <p>
          Les informations éventuellement collectées (formulaire de contact,
          commentaires, etc.) sont utilisées uniquement pour répondre aux
          utilisateurs et ne sont jamais transmises à des tiers.
        </p>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous pouvez à tout moment demander la suppression de vos
          données en écrivant à{" "}
          <a href="mailto:contact@lesdelicesdujour.com">
            contact@lesdelicesdujour.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>5. Responsabilité</h2>
        <p>
          L’éditeur ne peut être tenu responsable des erreurs ou omissions dans
          le contenu publié ni des conséquences liées à l’utilisation des
          informations présentes sur le site.
        </p>
      </section>

      <section>
        <h2>6. Contact</h2>
        <p>
          Pour toute question, suggestion ou problème technique, vous pouvez
          nous écrire à :{" "}
          <a href="mailto:contact@lesdelicesdujour.com">
            contact@lesdelicesdujour.com
          </a>
          .
        </p>
      </section>

      <footer>
        <p>
          © {new Date().getFullYear()} Les Délices du Jour — Tous droits
          réservés.
        </p>
      </footer>
    </main>
  );
}
