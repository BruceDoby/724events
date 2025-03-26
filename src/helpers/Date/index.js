export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1];

// Correction effectué (26/03/2025) : 
// - ajout d'un + 1 pour compenser le décalage de getMonth, en effet data.getMonth retourne un nombre entre 0 et 11, 0 correspondant à
// janvier, en ajoutant 1 on aligne correctement ce nombre avec les clés de notre objet MONTHS pour que 1 correspondant bien à janvier
// ça a permis de corriger 2 tests qui étaient en failed
