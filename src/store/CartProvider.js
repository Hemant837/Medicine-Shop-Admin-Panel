import React, { useState } from "react";
import CartContext from "./cart-context";
import MedicineContext from "./medicine-context";

const CartProvider = (props) => {
  const [items, setCartItems] = useState([]);
  const [newMed, setNewMed] = useState([
    {
      id: "m1",
      name: "Paracetamol",
      description: "Pain reliever and fever reducer",
      price: 50,
    },
    {
      id: "m2",
      name: "Ibuprofen",
      description: "Nonsteroidal anti-inflammatory drug",
      price: 70,
    },
    {
      id: "m3",
      name: "Amoxicillin",
      description: "Antibiotic for bacterial infections",
      price: 100,
    },
    {
      id: "m4",
      name: "Loratadine",
      description: "Antihistamine for allergies",
      price: 80,
    },
    {
      id: "m5",
      name: "Omeprazole",
      description: "Proton pump inhibitor for heartburn",
      price: 120,
    },
    {
      id: "m6",
      name: "Aspirin",
      description: "Pain reliever and antiplatelet agent",
      price: 60,
    },
  ]);

  const addItemToCartHandler = (item) => {
    setCartItems([...items, item]);

    const updatedItemsArray = [...items];
    const existingItemIndex = updatedItemsArray.find(
      (existingItem) => existingItem.id === item.id
    );

    existingItemIndex
      ? (existingItemIndex.quantity += Number(item.quantity))
      : updatedItemsArray.push(item);

    setCartItems(updatedItemsArray);
  };

  const removeItemFromCartHandler = (id) => {
    const updatedItemsArray = [...items];
    const itemIndex = updatedItemsArray.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      // This is the copy of the item
      const updatedItem = { ...updatedItemsArray[itemIndex] };

      // Here we are Decrement the quantity of the item by 1
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
    totalAmount: 0,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  const addMedToCart = (newMedItem) => {
    setNewMed([...newMed, newMedItem]);
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
