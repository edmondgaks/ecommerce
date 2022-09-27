import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setshowCart] = useState(false);
    const [cartItems,setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState();
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setqty] = useState(1);
    const incQty = () => {
        setqty((prevQty) => prevQty + 1);
    }   
    const decQty = () => {
        setqty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const onAdd = (product,quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        if(checkProductInCart) {
            settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
            settotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantiy + quantity
                }
            })
            setcartItems(updatedCartItems);
            
        } else {
            product.quantity = quantity;
            setcartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to cart`);
    }

    return (
        <Context.Provider value={{
            cartItems,showCart,totalPrice,totalQuantities,qty,setqty,incQty,decQty, onAdd, setshowCart
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);