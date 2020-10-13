import React from 'react';
import {Link} from "react-router-dom";
function CartTotals({value}) {
    const {cartSubTotal,cartTax,cartTotal,clearCart} = value;
    return         <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-10  mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to="/cart">
                            <button className="btn mb-3 btn-outline-danger mb-3 px-5 text-uppercase"
                            type="button"
                                    onClick={()=>clearCart()}
                            >
                                clear cart
                            </button>
                        </Link>
                        <h5>
                            <span className="text-title">
                             subtotal: </span>
                            <b>$ {cartSubTotal}</b>
                        </h5>
                        <h5>
                            <span className="text-title">
                             tax : </span>
                            <b>$ {cartTax}</b>
                        </h5>
                        <h5>
                            <span className="text-title">
                             total: </span>
                            <b>$ {cartTotal}</b>
                        </h5>

                    </div>
                </div>
            </div>
        </React.Fragment>

    
}

export default CartTotals;