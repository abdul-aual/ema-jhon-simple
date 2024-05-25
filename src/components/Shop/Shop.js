import React, { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';


const Shop = () => {
    const [Data, setData] = useState([]);
    useEffect(()=>{
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-simple-resources/master/fakeData/products.JSON')
        .then(res=>res.json())
        .then(data=>{
            setData(data)
            
        })
    },[])
    const handleAddProduct = (product)=>{
        console.log('product added', product.name);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
            
                {
                   
                    Data.map(datum=><Product  handleAddProduct = {handleAddProduct} productItem={datum} ></Product>)
                }
                
            
            </div>
            <div className="cart-container">
                <h3>This is</h3>
            </div>
            
        </div>
    );
};

export default Shop;