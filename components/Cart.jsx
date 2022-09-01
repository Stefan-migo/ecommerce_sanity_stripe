// useRef hook
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  
  
  //handleCheckout()
  /* 
    handleCheckout() will send a req to the server, this request will be a POST method, 
    and it will send inside the body the cartItems state(with all the products on the cart).
      first it will call the instance getStripe(connection with stripe), creating a variable stripe.
      second it will create a function response. this function will be the reques. so it will specify
        the request method(POST), the headers(json), and the body content(cartItems state)
      third if there is something wrong with the request, it will end the function (handleCheckout)
      fourth if the req is successful we will have a response from the server
        we will create a new variable called data and it will be equal to the response from the server.
      fifth we call the toast function with its loading method seting a string (redirecting) pop-up box
      sixth we use the rediectToCheckout method from stripe (getStripe instance) passing through the data.id as property
  */
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;
    
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }


  /* 
  Cart component renders:
    a <div> tag working as a wrapper (check styles but i think this wrapper is the right pannel that is diplayed when showCart state is true.
      a <div> tag as a container. with four tags.
        first: a <button> tag that modifies the showCart(to false) state onClick calling the setShowCart()
          this <button> is wrapping an icon(arrow left), and two <span> tags, these last ones are a string and the totalQuantities state from (useContext)
        second: a logic: if cartItems' length is lower than 1 (if the array has no items) then render a <div> tag with empty-cart style that wraps:
          an icon, a <h3> tag with with a string, a <button> tag that contains a string
            this <button> is wrapped by a <link> tag that redirects to the root of the app.
        third: a <div> that works as a container for a logic.
          logic: if the cartItems'length is equal or larger than 1 (if there is at least 1 element in the cartItems state (array)), then map the array and for each element returns:
            a <div> tag that contains all the product's information we want to buy.
              a <img>, a <div> that works as item-description, it contais:
                a <div> tag wrapping a <h5> and <h4> tags with the name and price.
                a <div> tag wrapping a deleteItem button (it calls onRemove function form stateContext), and another <div> which contains:
                  a <p> tag with quantity description that is wrapping 3 <span> tags:
                    decreaseQty(it calls toggleCartItemsQuantity() with item.id and dec as props), qty, and increaseQty(it calls toggleCartItemsQuantity() with item.id and inc as props) spans.
        fourth: a <div> tag that contais a Logic: if the cartItems' length is equal or larger than 1 (if there is at least one item in the cartItems State(array)) then renders:
          a <div> tag that work as a container for the pay section, it is wrapping:
            a <div> tag that contains two <h3> tags with a string and the totalPrice state (from useContext)
            a <div> tag that contains a <button> tag which calls the handleCheckout() onClick, and its wrapping a string.  
  */
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart