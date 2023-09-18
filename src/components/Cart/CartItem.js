import { useContext } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const price = `₹${props.price}`;

  const ctx = useContext(CartContext);

  return (
    <li key={props.id} className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x{props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={() => ctx.removeItem(props.item.id)}>−</button>
        <button onClick={() => ctx.addItem({ ...props.item, quantity: "1" })}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
