import React from "react";

const MedicineContext = React.createContext({
  newMed: [],
  addMed: (newMedItem) => {},
});

export default MedicineContext;
