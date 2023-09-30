import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MedicineContext from "./store/medicine-context";
import CartProvider from "./store/CartProvider";
import Header from "./components/Layout/Header";
import Medicines from "./components/Medicines/Medicines";
import Cart from "./components/Cart/Cart";

const App = () => {
  const medCtx = useContext(MedicineContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://crudcrud.com/api/aab1422b718d4a56802f25e59af074b0/products"
        );
        if (data) {
          const newData = Object.keys(data).map((key) => data[key]);
          newData.forEach((item) => {
            console.log(item);
            medCtx.addMed(item);
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData(); // Call the async function immediately
  }, []);
  

  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Medicines />
      </main>
    </CartProvider>
  );
};

export default App;
