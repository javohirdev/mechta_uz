import React, {Component, Fragment} from 'react';
import {ProductConsumer, ProductContext} from "../context/Context";
import {Link, Redirect} from "react-router-dom";
import "../style/cart.scss";
import SimilarItem from "./SimilarItem/similarItem";
import {Modal, ModalBody} from "reactstrap";
import RegistrationForm from "./test";
import {Spin} from "antd";
import SuccessOrder from "./successOrder";
import {LOCALES} from "../i18nProvider";
import {colors} from "../server_online";

class Cart extends Component {
    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            phone: null,
            address: null,
            region: null,

            modal: false,
            status: true,
            orderId: null,
        }
    }


    addUser = user => {
        const {name, address, region, phone} = user;
        this.setState({name, address, region, phone, status: false})
        this.buyNow();
    };

    buyNow = () => {
        const {cartTotal,cart} = this.context;
        const {name, phone, address, region} = this.state;

        let num = 0;

        const products = cart.map(item =>{
            const {categoryId,colors,count,price,id}  = item;
            let colorId = colors[0].img_id;
            num+=count;
            return {
                productId: id,
                productNum: count,
                price,
                categoryId,
                colorId
            }
        });


        const bodyRes = {
            name,
            phone,
            address,
            region,
            num,
            totalPrice: cartTotal,
            products: [...products]
        };
        this.setState({orderId: "15"}, () => {
            // console.log(this.state.orderId)
        });

        // console.log(bodyRes)

        // const response = await axios.post("http://server.mechta-posuda.uz:3000/api/orders", {...bodyRes});
        // this.toggle();

        // this.setState({successResponse: res.data.message.toLowerCase() === "success"}, () => {
        //     if (this.state.successResponse)
        //         setTimeout(this.toggle, 2000);
        // });
    };




    toggle = () => {
        this.setState(prev => {
            return {modal: !prev.modal}
        });
    };

    theEnd =()=>{
        this.setState({
            name: null,
            phone: null,
            address: null,
            region: null,

            modal: false,
            status: true,
            orderId: null,});
        this.props.push("/");
    };



    render() {
        console.log(this.props)
        const state = this.state;
        return (
            <ProductConsumer>
                {data => {
                    return (
                    <Fragment>
                            {data.cart.length > 0
                                ? <div className="container-fluid my-5 ">
                                    <div className="row mb-5">
                                        <div className="wrapper_items col-md-11 mx-auto p-3 ">
                                            <div className="item_title row my-2 mx-0 p-0 ">
                                             <div className="col-md-2">
                                                 <p>Фото</p>
                                             </div>
                                             <div className="col-md-3">
                                                 <p>Продукт</p>
                                             </div>
                                             <div className="col-md-2">
                                                 <p>Модел</p>
                                             </div>
                                             <div className="col-md-1">
                                                 <p>Количество</p>
                                             </div>
                                             <div className="col-md-2">
                                                 <p>Цена</p>
                                             </div>
                                             <div className="col-md-2">
                                                 <p>Сумма</p>
                                             </div>
                                            </div>
                                        {data.cart.map((item,index) => {
                                            return (
                                                <div className={`item row my-2 mx-0 p-0 ${index === 0 && "top_item"}`} key={index}>
                                                    <div className="product_img col-md-2 position-relative m-0 p-0 ">
                                                        <button onClick={()=>data.removeItem(item.id)}>&#10005;</button>
                                                        <img src={`${item.img[0].img}`} className="img-fluid w-50" alt=""/>
                                                    </div>
                                                    <div className="product_title col-md-3">
                                                       <p>{item.title}</p>
                                                    </div>
                                                    <div className="product_model col-md-2">
                                                        <p>MECHTA</p>
                                                    </div>
                                                    <div className="product_amount col-md-1">
                                                        <div className="item_amount w-100 h-100">
                                                            <div className="d-flex  clearfix justify-content-between">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => data.operationCartItem(item.id,"--") }
                                                                >
                                                                    <span>&#8722;</span>
                                                                </button>
                                                                <input
                                                                    className="mx-1"
                                                                    type="number"
                                                                    name="amount"
                                                                    value={item.count}
                                                                    onChange={(e) => data.changeCartItemCount(item.id,e)}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => data.operationCartItem(item.id,"++")}
                                                                >
                                                                    <span>&#43;</span>
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="product_price col-md-2">
                                                        <p>{new Intl.NumberFormat('en-US').format(item.price)} Сум </p>
                                                    </div>
                                                    <div className="product_sum col-md-2">
                                                        <p>{new Intl.NumberFormat('en-US').format(item.total)} Сум</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <div className="d-flex justify-content-between align-items-end wrapper_clear">
                                            <div className="total">
                                                    <span className="key p-2 ">Сумма : </span>
                                                    <span className="value p-2 ">{new Intl.NumberFormat('en-US').format(data.cartTotal)} Сум</span>
                                            </div>
                                            <div className="d-flex justify-content-between p-0 m-0 payVsShopping">
                                               <Link to="/" className="btn btn-secondary mx-1">Добавить товар</Link>
                                                <button className="btn btn-success mx-1" onClick={this.toggle}>Купить</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                 <SimilarItem />
                                    <Modal isOpen={state.modal}>
                                        <ModalBody className="my-0">
                                            {state.status ?
                                                <RegistrationForm addUser={this.addUser}/> :
                                                state.orderId === null ? <div className="text-center"><Spin /></div> : <SuccessOrder
                                                    toggle={this.theEnd}
                                                    orderId={state.orderId}
                                                    message={data.location === LOCALES.RUSSIAN ? "Заказ был принят" : "Buyurtma qabul qilindi"}/>
                                            }
                                        </ModalBody>
                                    </Modal>
                                </div>
                                : <Redirect to="/"/>
                              }
                        </Fragment>
                    )
                }}
            </ProductConsumer>
        );
    }
}

export default Cart;