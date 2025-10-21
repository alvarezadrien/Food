import React from "react";
import "./Politiques.css";

export default function Confidentialite() {
  return (
    <main className="conf-container">
      <h1>Politique de confidentialité</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Le site <strong>Les Délices du Jour</strong> accorde une grande
          importance à la protection de vos données personnelles. Cette
          politique a pour but de vous informer sur la manière dont vos
          informations sont collectées, utilisées et protégées.
        </p>
      </section>

      <section>
        <h2>2. Données collectées</h2>
        <p>
          Nous collectons uniquement les informations nécessaires au bon
          fonctionnement du site, comme :
        </p>
        <ul>
          <li>
            Votre nom et votre adresse e-mail (lorsque vous nous contactez).
          </li>
          <li>
            Les messages que vous nous envoyez via le formulaire de contact ou
            les commentaires.
          </li>
          <li>
            Des données techniques (comme votre navigateur ou votre appareil)
            pour améliorer votre expérience utilisateur.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Utilisation des données</h2>
        <p>Vos données personnelles sont utilisées uniquement pour :</p>
        <ul>
          <li>Répondre à vos messages ou demandes d’informations.</li>
          <li>Améliorer le contenu et les fonctionnalités du site.</li>
          <li>
            Vous envoyer, si vous le souhaitez, des actualités culinaires ou des
            recettes.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Partage des données</h2>
        <p>
          Vos données ne sont <strong>jamais vendues</strong> ni partagées avec
          des tiers à des fins commerciales. Elles peuvent être transmises
          uniquement à nos prestataires techniques (hébergement, messagerie…)
          dans le cadre du bon fonctionnement du site.
        </p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          Ce site utilise des cookies pour améliorer la navigation et mesurer
          l’audience. Vous pouvez à tout moment refuser ou supprimer les cookies
          via les paramètres de votre navigateur.
        </p>
      </section>

      <section>
        <h2>6. Durée de conservation</h2>
        <p>
          Vos données sont conservées uniquement le temps nécessaire pour les
          finalités pour lesquelles elles ont été collectées. Les messages
          envoyés via le formulaire de contact sont supprimés après traitement.
        </p>
      </section>

      <section>
        <h2>7. Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul>
          <li>
            Droit d’accès, de rectification et de suppression de vos données.
          </li>
          <li>Droit d’opposition ou de limitation du traitement.</li>
          <li>Droit à la portabilité de vos données.</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à l’adresse suivante :{" "}
          <a href="mailto:contact@lesdelicesdujour.com">
            contact@lesdelicesdujour.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>8. Sécurité</h2>
        <p>
          Nous mettons tout en œuvre pour protéger vos données contre tout
          accès, modification ou suppression non autorisés, à l’aide de mesures
          de sécurité adaptées.
        </p>
      </section>

      <section>
        <h2>9. Modifications</h2>
        <p>
          Cette politique peut être mise à jour à tout moment. La dernière mise
          à jour a eu lieu le{" "}
          <strong>
            {new Date().toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </strong>
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
