import React, { useContext, useState } from "react";
import MedicineContext from "../../store/medicine-context";
import classes from "./NewMedicine.module.css";

const NewMedicine = () => {
  const medCtx = useContext(MedicineContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const addNewMedicineHandler = (event) => {
    event.preventDefault();
    const newMedicine = {
      id: Math.random().toString(),
      name: name,
      description: description,
      price: parseFloat(price),
    };

    medCtx.addMed(newMedicine);

    setName("");
    setDescription("");
    setPrice("");
  };

  return (
    <form className={classes["new-medicines"]}>
      <div>
        <label htmlFor="medicine-name">Medicine Name</label>
        <input
          id="medicine-name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          name="price"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <button onClick={addNewMedicineHandler}>Add Medicine</button>
    </form>
  );
};

export default NewMedicine;
