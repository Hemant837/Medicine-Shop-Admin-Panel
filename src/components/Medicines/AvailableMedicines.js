import React, { useContext } from "react";
import Card from "../UI/Card";
import MedicineItem from "./MedicineItem/MedicineItem";
import classes from "./AvailableMedicines.module.css";
import MedicineContext from "../../store/medicine-context";

const AvailableMedicines = () => {
  const medCtx = useContext(MedicineContext);
  const medList = medCtx.newMed.map((med) => (
    <MedicineItem
      id={med.id}
      key={med.id}
      name={med.name}
      description={med.description}
      price={med.price}
      availableQuantity={med.availableQuantity}
      inStock={med.inStock}
    />
  ));

  return (
    <section className={classes.meds}>
      <Card>
        <ul>{medList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMedicines;
