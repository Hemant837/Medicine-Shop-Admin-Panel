import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import Input from "../../UI/Input";
import classes from "./MedicineItemForm.module.css";

const MedicineItemForm = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (event) => {
    event.preventDefault();
    const quantity = document.getElementById("amount" + props.id).value;
    console.log("props.item:", props.item);
    console.log("quantity:", quantity);
    console.log("inStock:", props.item.inStock);

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
      {props.item.inStock ? (
        <button onClick={addItemToCartHandler}>+ Add</button>
      ) : (
        <p>Out Of Stock</p>
      )}
    </form>
  );
};

export default MedicineItemForm;
