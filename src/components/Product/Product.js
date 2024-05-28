import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

// this is font awesome installation code in git bash 
// npm install --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome


const Product = (props) => {
    
    const { name, img, seller, price, stock } = props.productItem;
    return (
        <div className='single-product'>
            <div className='imag'>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <br></br>
                <p><small>by: {seller}</small></p>
                <p style={{fontWeight:'bold'}}> ${price} </p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button className="buy-btn" onClick={()=>props.handleAddProduct(props.productItem)}>
                 
                 <FontAwesomeIcon icon={faShoppingCart} />
                       <span> add to cart</span>
                </button>
            </div>


        </div>
    );
};

export default Product;