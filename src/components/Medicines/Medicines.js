import { Fragment } from "react";
import NewMedicine from "./NewMedicine";
import AvailableMedicines from "./AvailableMedicines";

const Medicines = () => {
  return (
    <Fragment>
      <NewMedicine />
      <AvailableMedicines />
    </Fragment>
  );
};

export default Medicines;
