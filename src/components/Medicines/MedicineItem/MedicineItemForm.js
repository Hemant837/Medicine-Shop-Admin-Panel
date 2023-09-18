import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";
import classes from "./MedicineItemForm.module.css";

const MedicineItemForm = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (event) => {
    event.preventDefault();
    const quantity = document.getElementById("amount" + props.id).value;
    
    cartCtx.addItem({
      ...props.item,
      quantity: Number(quantity),
    });
  };

  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={addItemToCartHandler}>+ Add</button>
    </form>
  );
};

export default MedicineItemForm;
