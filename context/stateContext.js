import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setshowCart] = useState(false);
    const [cartItems,setcartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setqty] = useState(1);

    let foundProduct;
    let index;
    const incQty = () => {
        setqty((prevQty) => prevQty + 1);
    }   
    const decQty = () => {
        setqty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);

        if(value === 'inc') {
            let newCartItems = [...cartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]
            // foundProduct.quantity + 1;
            setcartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1 );
        } else if(value == 'dec') {
            if(foundProduct.quantity > 1) {
                let newCartItems = [...cartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]
                // foundProduct.quantity - 1;
                setcartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1 )
            }
        }
    }

    const onAdd = (product,quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        if(checkProductInCart) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

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
            cartItems,showCart,totalPrice,totalQuantities,qty,setqty,incQty,decQty, onAdd, setshowCart, toggleCartItemQuantity
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);