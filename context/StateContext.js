//import some packages from react.
import React, { createContext, useContext, useState, useEffect } from 'react';

//this is a pop-up notification when we add something to the cart
import { toast } from 'react-hot-toast';

//set a Context variable and we call it as a hook.
const Context = createContext();

export const StateContext = ({ children }) => { //children prop means that whatever we wrap inside this component will be considered as a child a children and it will be render out.

  //create states and their set functions in order to modify them.
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  //we set this variables to be used on toggleCartItemQuantity()
  let foundProduct;
  let index;

  //onAdd function
  /* 
  onAdd() will accept two properties: "product" as the product we want to add and "quantity" as the quantity of the product we want to add
    first we need to check if the product we want to add is already in the cart. for this we create the variable checkProductInCart.
      checkProductInCart will check if inside the state cartItems(array) there is an item that is equal to the product we are adding.
    second we want to give a total price. for this we will use setTotalPrice() to modify the state totalPrice.
      setTotalPrice will check the previous state of "totalPrice" and it will sum to it the new product price multiply by quantity(number of products we want to add)
    third we want to give a total quantity of the product the user has added. this is possible using setTotalQuanties function to modify the state totalQuantities
      setTotalQuantities will check the prev totalQuantity state and it will add the "quantity" prop (quantity of the product the user added)
    fourth we want to display a message of the porducts and the quantity we have added:
      for this we will use the toast() component(from react) with its success method, returning a string with the information we want to display. 
  Logic: 
    if checkProductInCart is true -> (if the product we are adding is already in the cart), do two actions.
      first actcion: create a variable "updateCartItems" -> this variable will map the cartItems state [array wiht products]
        if any of those items is equal to the product we are adding...
          then return all the items within the cartItem state, and also update the quantity of the item that matches with the product we are adding.
      second action: use setCartItems() to modify the cartItems state, using as a property the variable "updateCartItems"
    if checkProductInCart is false -> return two actions.
      first action: set product quantity equals to quantity. (just add the product and the quantity the user want, beacuse we dont have this product in the cart already.)
      second action: use setCartItems() to modify the state cartItems. this will return:
        all the items that already are in the cart and also it will add the new peoduct(with the quantity we want to add).
  */
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 


// onRemove()
/* 
onRemove wil accept one property "product", the one we want to remove from the cart.
  first we update the variable foundProduct in order to set what product we are working with, the one we are updating the quantity on the cart.
    to do this we set foundProduct equals to cartItems state(array of products) and we apply the method find.
    this method will check if one of the element within cartItems has the same id than the id we have in the properties of the toggleCartItemQuanitity() (the product we are adding) 
    it will be true if both id's match, and it will give us back the product {object}
  second we create a newCartItems variable, is a new array that contains all the elements coming from the cartItems, but the product we want to remove.
    in order to this we set newCartItems equals to cartItems state(array of products) and we apply the method filter.
    this method will check all the items which don't have the same id than the product we want to remove and it wil filter them.
    it will be return all the items filtered (just the ones that the id don't match with the id of the product we want to remove.)
  third we call the functions: setTotalPrice, setTotalQuantities and setCartItems in order to modify their states.
    setTotalPrice() will set totalPrice state equals to: previous total price minus (the price of the found product multiply the quantity of the found product)
    setTotalQuantities() will set totalQuantities state equals to: previous totalQuantities minus the quantity of the found product.
    setCartItems() will set cartItems state equals to: newCartItems variable (filter array without the product we want to remove.) 
*/  
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  // toggleCartItemQuantity ()
  /* 
  toggleCartItemQuantity will accept two properties (id and value.)
    first we update the variable foundProduct in order to set what product we are working with, the one we are updating the quantity on the cart.
      to do this we set foundProduct equals to cartItems state(array of products) and we apply the method find.
      this method will check if one of the element within cartItems has the same id than the id we have in the properties of the toggleCartItemQuanitity() (the product we are adding) 
      it will be true if both id's match, and it will give us back the product {object}
    second we create a newCartItems variable, this will be the a new array that contains all the products that already are in the cart, it also contains the modified product with the new quantity
      to do this, we set a newCartItems variable equals to cartItems state(array of product) and we apply the method map.
      this method will check all the items'id within the array and it will work with the folowwing logic:#
        if one of the items'id inside of the array(cartItems) matches with the id of the product that we are modifying the quantity and also if the value of the property on toggleCartItemQuanitity is 'inc' then:
          return all the items from the cartItems, but to that one who matches the id, modify the quantity increasing it 1 unit 
        if one of the items'id inside of the array(cartItems) matches with the id(property) of the product that we are modifying the quantity, and also the value of the property on toggleCartItemQuanitity is 'dec' then:
          check if the quantity of the product is larger than 1 (let's say there is at least 1 product in the cart), if it is true:
          return all the items from the cartItems, but to that one who matches the id, modify the quantity decreasing it 1 unit 
        if non of these situations happen just return all the items on cartItems without modify them. 
    third we have a logic, with a conditional function:
      if value (property) is equal to "inc" -> the function will call setCartItems(), setTotalPrice() and setTotalQuantities() in order to modify their corresponding states.
        setCartItems() will set cartItems state equals to newCartItems.
        setTotalPrice() will take the previous value of totalPrice state and it will sum it with the foundProduct price. 
        setTotalQuantities() will take the previous value of totalQuantities state and it will increase it in 1 unity.
      if value (property) is equal to "dec" -> 
        check if the quantity of the product is larger than 1 (let's say there is at least 1 product in the cart), if it is true:
          setCartItems() will set cartItems state equals to newCartItems.
          setTotalPrice() will take the previous value of totalPrice state and it will rest it with the foundProduct price. 
          setTotalQuantities() will take the previous value of totalQuantities state and it will decrease it in 1 unity.
        if the quantity is lower than 1 (let's say there is no product on the cart.)
          just run the function onRemove. with foundProduct as a property.
  */
  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    // index = cartItems.findIndex((product) => product._id === id);
    let newCartItems = cartItems.map((item) => {
      if (item._id === id && value === 'inc') {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      } else if (item._id === id && value === 'dec') {
        if(item.quantity >= 1) 
        return {
          ...item,
          quantity: item.quantity - 1
        }
      } else {
        return {
        ...item
        }
      }
    })

    if(value === 'inc') {
      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      } else {
        onRemove(foundProduct);
      }
    }

  }

  //increase quantity function. it will use setQty function 
  //this will increase the Qty state by 1 unity every time the function runs. 
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);// this is the proper way to increase the amount/ we can also do Qty + 1
  }

  //decrease quantity function. it will use setQty function to modify the state qty
  //this will decrease the Qty state in 1 unity every time the function is called.
  const decQty = () => {
    setQty((prevQty) => {
      //logic: if prevQty minus 1 is lower than 1 just return 1
      if(prevQty - 1 < 1) return 1;
      //return prevQty minus 1
      return prevQty - 1;
    });
  }

  /* StateContext renders:
  a <Context.Provider> tag which has as an object of values.
    all the values within this component will be available for the entire app.
      in order to get all the values available for the app we need to wrap the app.js with the StateContext component.
      the app.js will be the {children} 
    the <ContextProvider> will be wrapping the {children} props that we set into the StateContext component.
      this will allow to pass all the values to the entire app.  
  */
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);