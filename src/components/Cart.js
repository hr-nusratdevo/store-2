import React, { useContext } from "react"
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { CartContext } from "../Global/CartContext"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

/**
* @author
* @function Cart
**/  

const Cart = (props) => {

    const { dispatch, shoppingCart, totalPrice, qty } = useContext(CartContext); 
            const handleToken = async (token) => {
                const product = { name: 'All Products', price: totalPrice }
                const response = await axios.post('http://localhost:8080/checkout', {
                    token,
                    product
                });
                const { status } = response.data;
                if (status === 'success') {

                    dispatch({ type: 'EMPTY' });
                    props.history.push(`/`)
                    toast.success("You have paid successfully now you can continue your shopping!", {
                        position: toast.POSITION.TOP_RIGHT
                    });

                } else {

                }
            }
    console.log(shoppingCart);
  return(
          <div className="cartContainer" style={{ marginTop: '100px' }}>
              <div className="cartDetails">
           {shoppingCart.length ? shoppingCart.map(product => (
               <div className="cart" key={product.id}>
                   <span className="cartProImage"><img src={product.image} alt="" />
                       <span className="imageCount">{product.qty}</span>
                   </span>
                   <span className="cartProductName">{product.name}</span>
                   <span className="cartProductPrice">${product.price}.00</span>
                   <span className="inc" onClick={() => dispatch({ type: 'INC', id: product.id })}><i className="fas fa-plus"></i></span>
                   <span className="productQuantity">{product.qty}</span>
                   <span className="dec" onClick={() => dispatch({ type: 'DEC', id: product.id })}><i className="fas fa-minus"></i></span>
                   <span className="productTotalPrice">${product.qty * product.price}.00</span>
                   <button onClick={() => dispatch({ type: 'DELETE_PRODUCT', id: product.id })} className="deleteCartPro"><i className="fas fa-trash-alt"></i></button>
               </div>
           )) : <div className="empty">'Your cart is currently empty!'</div> }

          </div>
          {shoppingCart.length ? <div className="cartSummary">
              <div className="summary">
                  <h3>Order Summary</h3>
                  <div className="totalItems">
                      <div className="items">Total Items</div>
                      <div className="itemsCount">{qty}.00</div>
                  </div>
                  <div className="totalPriceSection">
                      <div className="justTitle">Total Price</div>
                      <div className="itemsPrice">${totalPrice}.00</div>
                  </div>
                  <div className="stripSection">
                      <StripeCheckout
                          stripeKey="pk_test_51Gv0uJCavfRrvdKEVkaxfadQ1gwQXgXBGvgv5Hs0w04Aav8hrsgVGOjh1kZx7QJb5fFwe7QkoaRPPGWP0rqqZUF00098mzowGB"
                            token={handleToken}
                            billingAddress
                            shippingAddress
                            amount = {totalPrice * 100}
                            name="All products in the cart">
                      </StripeCheckout>
                      </div>
              </div></div>
              : ''}

      </div>
    
   )

 }

  export default Cart;