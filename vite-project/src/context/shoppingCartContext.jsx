import { createContext, useContext, useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
const ShoppingCartContext = createContext([]);
const initialCartItems = localStorage.getItem("shoppingcart") ? JSON.parse(localStorage.getItem("shoppingcart")):[]
function ShoppingCartContextProvider({ children }) {
  const [isOren,setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState(initialCartItems); // ye5o id quantity
  
  useEffect(()=>{
    localStorage.setItem("shoppingcart", JSON.stringify(cartItems))//obj jsx to obj json
  },[cartItems])


  const openCart =()=> {
    setIsOpen(true);
  }
  const closeCart =()=> {
    setIsOpen(false)
  }

  const cartQuantity = cartItems.reduce(
    (quantity , item) => item.quantity + quantity //quantity =0 inial 
  ,0)

  const getItemsQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
    // recherche id ?mawjoud=>quantity or 0 return quantity in panier
  };

  const increaseCartQuantity = (id) => {
    // add to cart ou increment quantity
    setCartItems((currItems) => {
      // currItems 9dim if product is not existe added else increment
      if (currItems.find((item) => item.id === id) === undefined) {
        // not existe find pour check
        return [...currItems, { id, quantity: 1 }];
      } else {
        // use map to create a new array with updated values
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };

  const decreaseCartQuantity = (id) => {
    // add to cart ou increment quantity
    setCartItems((currItems) => {
      // currItems 9dim if product is not existe return rest else decrement
      if (currItems.find((item) => item.id === id) === undefined) {
        // not existe find for check then return rest, this not existe
        return currItems.filter((item) => item.id !== id);
      } else {
        // use map to create a new array with updated values 
        return currItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        getItemsQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        closeCart,
        openCart,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOren={isOren} />
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContextProvider;

// shoppingCartContextProvider bch no7it app bi provider value of context
// tousel lil ta7t app kol function and hooks, variable ...

// pour consolte a donne in context call custom hooks useShoppingCart
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
