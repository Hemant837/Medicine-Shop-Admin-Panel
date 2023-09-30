import React, { useState } from "react";
import axios from "axios";
import CartContext from "./cart-context";
import MedicineContext from "./medicine-context";

const CartProvider = (props) => {

  const base_URL = "https://crudcrud.com/api/aab1422b718d4a56802f25e59af074b0"

  const [items, setCartItems] = useState([]);
  const [newMed, setNewMed] = useState([]);

  const addItemToCartHandler = async (item) => {
    const updatedItemsArray = [...items];
    const existingItemIndex = updatedItemsArray.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      // Item with the same ID already exists in the cart
      updatedItemsArray[existingItemIndex].quantity += Number(item.quantity);
      try {
        const response = await axios.put(
          `${base_URL}/cart`,
          updatedItemsArray
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Item with the same ID doesn't exist, so add the new item
      updatedItemsArray.push(item);
      try {
        axios.post(
          `${base_URL}/cart`,
          item
        );
      } catch (error) {
        console.log(error);
      }
    }

    // Decrement the availableQuantity of the added item
    const newMedItemIndex = newMed.findIndex((med) => med.id === item.id);

    if (newMedItemIndex !== -1) {
      newMed[newMedItemIndex].availableQuantity -= Number(item.quantity);
      if (newMed[newMedItemIndex].availableQuantity === 0) {
        // Only set inStock to false if availableQuantity reaches zero
        newMed[newMedItemIndex].inStock = false;
      }
    }

    setCartItems(updatedItemsArray);
  };

  const removeItemFromCartHandler = (id) => {
    const updatedItemsArray = [...items];
    const itemIndex = updatedItemsArray.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      // This is the copy of the item
      const updatedItem = { ...updatedItemsArray[itemIndex] };

      // Here we are decrementing the quantity of the item by 1
      updatedItem.quantity = updatedItem.quantity - 1;

      if (updatedItem.quantity === 0) {
        // Here if the quantity reaches zero, remove the item from the array
        updatedItemsArray.splice(itemIndex, 1);
      } else {
        // Updating the item in the array with the updated item
        updatedItemsArray[itemIndex] = updatedItem;
      }

      // Updating the state with the new items array
      setCartItems(updatedItemsArray);
    }
  };

  const cartContext = {
    items: items,
    totalAmount: 0, // You might want to calculate the total amount here
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  const addMedToCart = async (newMedItem) => {
    setNewMed([...newMed, newMedItem]);
    try {
      const newResponse = await axios.post(
        `${base_URL}/products`,
        newMedItem
      );
      console.log(newResponse.data)
    } catch (error) {
      console.log(error);
    }
  };

  const medicineContext = {
    newMed: newMed,
    addMed: addMedToCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      <MedicineContext.Provider value={medicineContext}>
        {props.children}
      </MedicineContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;
