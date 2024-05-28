import React from 'react';
import Cartcss from './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const Total = cart.reduce((initialTotal, currentTotal)=> initialTotal+currentTotal.price, 0)

    let shipping =0;
    if(Total>=100)
    {
        shipping=0;
    }
    else if(Total===0){
        shipping=0;
    }
    else{shipping=5;}
    const tax= parseFloat((Total*0.05).toFixed(2))
    const totalBeforeTax =Total+shipping; 
    const grandTotal=Total+shipping+tax;

    
const alignCenter ={
    textAlign:'center'
}
    return (
        
            <div style={{marginLeft:'3px'}}>
                <h4 style={alignCenter} >Order Summary</h4>
                <p style={alignCenter} >Items Ordered: {props.cart.length}</p>
                <div className='order-details' style={{lineHeight:'20px'}}>
                        <div >  
                            <p><small>Items:</small></p>
                            <p><small>shipping cost</small></p>
                            <p><small>Total before Tax:</small></p>
                            <p><small>Estimated Tax:</small></p>
                        </div>
                        <div>
                            <p><small>$ {props.cart.length}</small></p>
                            <p><small>$ {shipping}</small></p>
                            <p><small>$ {totalBeforeTax}</small></p>
                            <p><small>$ {tax}</small></p>
                        
                        </div>
                </div>
                <h3 style={{color:'orange'}}>Order Total: {grandTotal}</h3>

            </div>
        
    );
};

export default Cart;
