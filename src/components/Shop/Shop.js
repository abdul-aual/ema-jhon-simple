import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    const [Data, setData] = useState([]);
    const [card, setCard] = useState([]);
    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
        .then(res=>res.json())
        .then(data=>{
            setData(data)
            
        })
    },[])
    const handleAddProduct = (product)=>{
        const newCard = [...card, product];
        setCard(newCard);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    Data.map(datum=><Product  handleAddProduct = {handleAddProduct} productItem={datum} ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={card} ></Cart>
            </div>
            
        </div>
    );
};

export default Shop;