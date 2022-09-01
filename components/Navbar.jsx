import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import LogoDB from '../public/assets/icons/LogoBold';


//import <Cart /> component and useStateContext
import { Cart } from './';
import { useStateContext } from '../context/StateContext';


const Navbar = () => {
  //destructure the functions we are gonna use from useStateContext.
  const { showCart, setShowCart, totalQuantities } = useStateContext();


  /* 
  Navbar component render:
    a <div> tag that works as a container.
      a <p> tag that contains a <Link> component wrapping a string which works as a logo
        this <link> component will redirect to the root of the app.
      a <button> tag that contains an icon and a <span> tag with the totalQuantities state coming from useStateContext.
        this button will use the setShowCart() to modify the showCart state to true every time it is clicked
      a JS logic: if showCart is true then renders <Cart /> component.
  */
  return (
    <div className="navbar-container">
      <div className="logo">
        <Link href="/">
          <a><LogoDB /></a>
        </Link>

        <p>
          <Link href="/">
            Sound Tech Store
          </Link>
        </p>
      </div>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar;