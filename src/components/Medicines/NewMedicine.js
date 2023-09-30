import React, { useContext, useState } from "react";
import MedicineContext from "../../store/medicine-context";
import classes from "./NewMedicine.module.css";

const NewMedicine = () => {
  const medCtx = useContext(MedicineContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleAvailableQuantityChange = (event) => {
    setAvailableQuantity(event.target.value);
  };

  const addNewMedicineHandler = (event) => {
    event.preventDefault();
    const newMedicine = {
      id: Math.random().toString(),
      name: name,
      description: description,
      price: parseFloat(price),
      availableQuantity: parseInt(availableQuantity),
      inStock: true,
    };

    medCtx.addMed(newMedicine);
    setName("");
    setDescription("");
    setPrice("");
    setAvailableQuantity("");
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
      <div>
        <label htmlFor="available-quantity">Available Quantity</label>
        <input
          id="available-quantity"
          type="number"
          name="available-quantity"
          value={availableQuantity}
          onChange={handleAvailableQuantityChange}
        />
      </div>
      <button onClick={addNewMedicineHandler}>Add Medicine</button>
    </form>
  );
};

export default NewMedicine;
