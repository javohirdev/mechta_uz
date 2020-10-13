import React from 'react';

function EmptyCart(props) {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-19 mx-auto text-center">
                    <h1>your cart is currently empty</h1>
                </div>
            </div>
        </div>
    );
}

export default EmptyCart;