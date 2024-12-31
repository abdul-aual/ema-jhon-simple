import React, { useEffect, useState } from 'react';
import Product from './Product';
import fakeData from '../fakeData/fakedata.json';
import logo from '../images/logo.png';
import './cart.css';

const Products = () => {
    const [cart, setCart] = useState(null); // Unified cart state
    const [products, setProducts] = useState([]); // Stores product data

    // Load cart and sync with products when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { TotalItems: 0, TotalAmount: 0, Items: [] };
        const first20 = fakeData.slice(0, 20);

        // Sync products with stored cart
        const updatedProducts = first20.map((product) => {
            const cartItem = storedCart.Items.find((item) => item.key === product.key);
            return cartItem
                ? { ...product, clicked: true, quantity: cartItem.quantity }
                : { ...product, clicked: false, quantity: 0 };
        });

        setProducts(updatedProducts);
        setCart(storedCart); // Load stored cart into state
    }, []); // Run only on mount

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const handleClickBtn = (key) => {
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, clicked: true, quantity: 1 }
                : product
        );
        setProducts(updatedProducts);

        // Update the cart state
        setCart((prevCart) => {
            const existingItem = prevCart.Items.find((item) => item.key === key);

            const updatedItems = existingItem
                ? prevCart.Items
                : [...prevCart.Items, { ...selectedProduct, quantity: 1 }];

            return {
                TotalItems: updatedItems.length,
                TotalAmount: prevCart.TotalAmount + selectedProduct.price,
                Items: updatedItems,
            };
            
        });
    };

    const inc = (key) => {
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, quantity: product.quantity + 1 }
                : product
        );
        setProducts(updatedProducts);

        // Update the cart state
        setCart((prevCart) => {
            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return {
                TotalItems: prevCart.TotalItems,
                TotalAmount: prevCart.TotalAmount + selectedProduct.price,
                Items: updatedItems,
            };
        });
    };

    const dec = (key) => {
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? {
                      ...product,
                      quantity: product.quantity > 1 ? product.quantity - 1 : 0,
                      clicked: product.quantity > 1,
                  }
                : product
        );
        setProducts(updatedProducts);

        // Update the cart state
        setCart((prevCart) => {
            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter((item) => item.quantity > 0);

            return {
                TotalItems: updatedItems.length,
                TotalAmount: Math.max(0, prevCart.TotalAmount - selectedProduct.price),
                Items: updatedItems,
            };
        });
    };

    const toggleClass = () => {
        const divClass = document.getElementById('expandable-div');
        divClass.classList.toggle('expanded');
        divClass.classList.toggle('collapse');
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart({ TotalItems: 0, TotalAmount: 0, Items: [] });
        const clearedProducts = products.map((product) => ({
            ...product,
            clicked: false,
            quantity: 0,
        }));
        setProducts(clearedProducts);


    };

    if (cart === null) {
        return <div>Loading...</div>;
    }

    const TotalAmount = parseFloat(cart?.TotalAmount || 0).toFixed(2);

    return (
        <div>
            <div id='expandable-div' className='collapse'>
                <div className='collapse-content' onClick={toggleClass}>
                    <div className='item-div'>
                        <h5>{cart.TotalItems} Items</h5> 
                    </div>
                    <div className='logo-div'>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="total-amount-div">
                        <h5>{TotalAmount}</h5>
                    </div>
                </div>
                <div className='expandable-content'>
                    <button className='cross-btn' onClick={toggleClass}>&times;</button>
                    <div className="scrollable-content">
                        <button onClick={()=>{
                                clearCart();
                                toggleClass();
                        }
                        }>Clear the Cart</button>
                    </div>
                </div>
            </div>
            <div>
                {products.map((product, index) => (
                    <Product
                        pdData={product}
                        handleClickBtn={handleClickBtn}
                        inc={inc}
                        dec={dec}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
