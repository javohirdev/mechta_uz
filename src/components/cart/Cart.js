import React, {Component} from 'react';
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import {ProductConsumer} from "../../context/Context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
class Cart extends Component {
    render() {
        return (

            <section>
                <ProductConsumer>
                    {value => {
                        const {cart} = value;
                        if (cart.length>0)
                        return (
                            <React.Fragment>
                                <CartColumns/>
                                <CartList value={value}/>
                                <CartTotals value={value} />
                            </React.Fragment>
                        );
                        else {
                          return  <EmptyCart/>
                        }


                    }}


                </ProductConsumer>

            </section>
        );
    }
}

export default Cart;