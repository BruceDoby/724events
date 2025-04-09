import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements du plus récent au plus ancien
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) => // changement au niveau de data?.focus
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // changement au niveau du >
  );

  const dataLength = byDateDesc.length;

  // changement complet ici
  useEffect(() => {
    if (dataLength > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % dataLength);
      }, 5000);

      return () => clearInterval(interval); // Nettoyage de l'interval
    }
    return undefined; // Ajout d’un retour explicite
  }, [dataLength]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || event.title} // Changement ici au niveau des key
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id || `pagination-${radioIdx}`} // Changement également au niveau des key
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

// Total des éléments corrigé (25/03/2025) : 
// - changement du < en > pour les trié en ordre décroissant, du plus récent au plus anciens
// - ajout d"un tableau vide si data?.focus est undefined ou null
// - on a mis data?.focus dans un tableau pour pouvoir avoir un nouveau tableau avec les mêmes éléments avec le spread operator (...) pour
// être sûr de ne pas modifier les données originales et de prévenir des problèmes de références dans le code
// - on a ajouté const dataLength = byDateDesc.length; pour stocker le nombre d'élément du tableau pour être utilisé dans le useEffect
// - on a ajouté un if pour vérifier la présence de données, on a également ajouté un interval pour s'assurer que la fonction qui suit
// s'execute toutes les 5 secondes, la fonction qui suit elle permet de faire défiler les élément et de retourner à la première image une
// fois que la dernière est atteinte sans créer d'erreur, on clear ensuitre l'interval pour éviter des problèmes dans le cas où dataLength
// changerait, on a également ajouté un retour explicit avec undefined pour éviter un warning de react concernant un retour de valeurs dans
// useEffect, ainsi dans le cas où dataLength est égal à 0, il n'y a donc pas d'intervalle donc rien à clear, retourner undefined permet donc
// de l'indiquer clairement, ajouter la dataLength à la fin permet de s'assurer que useEffect s'effectuera chaque fois que dataLength 
// changera en remettant en place l'intervalle et en ajustant l'index
// - on a corrigé le key unique des éléments, key={event.title} est donc devenu key={event.id || event.title} pour utiliser l'id si dispo
// et key={`${event.id}`} est devenu key={event.id || `pagination-${radioIdx}`} pour utiliser l'id également, sinon, on utilise pagination
// et radioIdx pour être sûr d'avoir une clé unique, avoir une clé unique est essentiel pour react
// - on a ajouté des `` pour éviter une erreur de syntaxe en dessous du key avec event.title
// - ajout d'un onChange en dessous du checked pour éviter une erreur lié au fait qu'on a un checked dans le dernier input, ça permet 
// accessoirement de naviguer entre les images en cliquant sur les boutons radio, à voir si les deux sont utile sinon les deux sont
// probablement supprimables