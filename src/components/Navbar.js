import React ,{useContext}from 'react'
import {Link} from 'react-router-dom';
import {CartContext} from "../Global/CartContext"

/**
* @author
* @function Navbar
**/

const Navbar = (props) => {
  const {qty} = useContext(CartContext);
  return(
      <nav>
              <ul className="left">
              <li><Link to="/" > BD Express</Link></li>
            </ul>

          <ul className="right">
              <li><Link to="Cart">
                 <span className="shoppingCart"><i className=" fas fa-cart-plus" ></i></span>
                  <span className="shoppingCartTotal"> {qty} </span>
                  </Link></li>
          </ul>
                  
      </nav>
   )

 }

export default Navbar
