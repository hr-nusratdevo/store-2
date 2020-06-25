import React, { createContext, useReducer } from "react"
import { CartReducer } from "./CartReducer"
 export const CartContext = createContext();

 const CartContextProvider = (props) => {

/**
* @author
* @function CartContext
**/
    const [cart, dispatch] = useReducer(CartReducer, { shoppingCart: [], totalPrice: 0, message: '', qty: 0 })

    return (
        <CartContext.Provider value={{ ...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )

 }

export default CartContextProvider