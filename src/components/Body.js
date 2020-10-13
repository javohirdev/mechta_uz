import React, {Component} from 'react';
import {Modal, ModalBody} from 'reactstrap';
import {ProductConsumer, ProductContext} from "../context/Context";
import "../style/body.scss";
import "../style/bodyMobile.scss";
import {Link, NavLink} from "react-router-dom";

import boilerIcon from "../images/icons/footer_top/boilerIcon.svg";
import helloIcon from "../images/icons/footer_top/helloIcon.svg";
import locationIcon from "../images/icons/footer_top/locationIcon.svg";
import deliveryIcon from "../images/icons/footer_top/deliveryIcon.svg";
import dailyIcon from "../images/icons/footer_top/dailyIcon.svg";
import paymentsIcon from "../images/icons/footer_top/paymentsIcon.svg";
import video from "../test_video/video.mp4";
import "@glidejs/glide/dist/css/glide.theme.css";
import "@glidejs/glide/dist/css/glide.core.css";
import Carousel from "./Carousel";
import carousel from "../images/carousel/carusel_img_2.png";
import {FormattedMessage} from "react-intl";
import {animateScroll} from "react-scroll";
import translate from "../i18nProvider/translate";
import axios from "axios"
import {Button, Form, Input, Spin} from "antd";
import RegistrationForm from "./test";
import SuccessOrder from "./successOrder";

class Body extends Component {
    static contextType = ProductContext;

    constructor(props, context) {
        super(props, context);
        this.state = {
            index: 2,
            modal: false,
            dataOfInteresting: [
                {
                    icon: boilerIcon,
                    info1: "Боле",
                    info2: "3500",
                    info3: "клиентов",
                },
                {
                    icon: helloIcon,
                    info1: "Боле",
                    info2: "3500",
                    info3: "торговых",
                },
                {
                    icon: locationIcon,
                    info1: "Боле",
                    info2: "3500",
                    info3: "торговых",
                },
                {
                    icon: paymentsIcon,
                    info1: "Форма",
                    info2: "оплата",
                    info3: "любоя",
                },
                {
                    icon: deliveryIcon,
                    info1: "Бесплатная",
                    info2: "доставка",
                    info3: "",
                },
                {
                    icon: dailyIcon,
                    info1: "Ежедневное",
                    info2: "обслуживание",
                    info3: "",
                }],
            title: "No",
            modal_1: false,
            productsOfCategory: null,
            categoryName: null,
            orderId: null,
            checkOrder: false,
            step: true
        };

    }

    toggle = () => {
        this.setState(prev => {
            return {
                ...prev,
                modal_1: !prev.modal_1,
            }
        })
    };
    carousel = () => {
        const state = this.state;
        const radioBtns = document.querySelectorAll("input[type=radio]");
        const slides = document.querySelectorAll(".slide");
        const prevBtn = document.querySelector(".prev_btn");
        const nextBtn = document.querySelector(".next_btn");
        radioBtns.forEach((item, index) => {
                if (item.checked) {
                    slides.forEach((slideItem, slideIndex) => {
                        if (slideIndex < index) {
                            slideItem.classList.add("prev");
                            slideItem.classList.remove("next", "current");

                        } else if (slideIndex > index) {
                            slideItem.classList.add("next");
                            slideItem.classList.remove("prev", "current");
                        }
                    });
                    if (state.index > index)
                        slides[index].classList.remove("prev", "next");
                    else if (state.index < index)
                        slides[index].classList.add("current");

                    slides[index].classList.add("current");

                    this.setState({index}, () => {
                        if (this.state.index === 0) {
                            prevBtn.classList.add("hid");
                            nextBtn.classList.remove("hid");
                        } else if (this.state.index === radioBtns.length - 1) {
                            nextBtn.classList.add("hid");
                            prevBtn.classList.remove("hid");
                        } else {
                            prevBtn.classList.remove("hid");
                            nextBtn.classList.remove("hid");
                        }
                    });
                }
            }
        );
    };
    next = () => {
        const radioBtns = document.querySelectorAll("input[type=radio]");
        if (radioBtns.length > 0) {
            const currentBtn = this.state.index;
            if (currentBtn === radioBtns.length - 1)
                radioBtns[0].checked = true;
            else
                radioBtns[currentBtn + 1].checked = true;
            this.carousel(false);
        }
    };
    prev = () => {
        const radioBtns = document.querySelectorAll("input[type=radio]");
        if (radioBtns.length > 0) {
            const currentBtn = this.state.index;
            if (currentBtn === 0)
                radioBtns[radioBtns.length - 1].checked = true;
            else
                radioBtns[currentBtn - 1].checked = true;
            this.carousel();
        }
    };
    drawTitle = (title = "test") => {
        return (
            <div className="container-fluid p-0  draw_title ">
                <div className="title text-left">{title}</div>
                <div className="underline"></div>
            </div>
        )
    };

    changeCategoryItem = e => {
        console.log("id = ", e.currentTarget.id)
        // axios.get("http://server.mechta-posuda.uz:3000/api/category").then(res => {
        //     this.setState({category: res.data}, () => {
        //     })
        // })
        this.setState({categoryItem: e.currentTarget.textContent})
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const radioBtns = document.querySelectorAll("input[type=radio]");
        if (radioBtns.length > 0 && this.state.index === radioBtns.length - 1) {
            clearInterval(this.interval);
            this.interval = setInterval(this.prev, 3000)
        } else if (this.state.index === 0) {
            clearInterval(this.interval);
            this.interval = setInterval(this.next, 3000)
        }
    }

    componentDidMount() {
        const radioBtns = document.querySelectorAll("input[type=radio]");
        if (radioBtns.length > 0) {
            radioBtns[2].setAttribute("checked", "");
            this.carousel();
            this.interval = setInterval(this.next, 3000);
            const advertising_carousel = document.querySelector(`.advertising_carousel`);
            advertising_carousel.addEventListener("mouseover", () => {
                clearInterval(this.interval)
            });
            advertising_carousel.addEventListener("mouseleave", () => {
                this.interval = setInterval(this.next, 3000)
            });
        }
    }

    checkOrder = () => {
        if (this.state.orderId) {
            this.setState({checkOrder: true,modal: true});
            setTimeout(() => {
                this.setState({step: false})
            }, 3000)
            // const {orderId} = this.state;
            // const res = await axios.get("url/orderId");
            //   console.log(res)
        }
    };

    setOrderId = (e) => {
        console.log("val = ", e.target.value)
        if (e.target.value.length < 1)
            this.setState({orderId: null, checkOrder: false});
        else
            this.setState({orderId: e.target.value})
    };

    checkPhone = phone => {
        console.log(phone);
        this.setState({modal: false})
    };

    drawModal = () => {
        return <Form
            name="register"
            onFinish={this.checkPhone}
            initialValues={{}}
            scrollToFirstError
        >
            <Form.Item
                className="my-2"
                name="phone"
                rules={[{required: true, message: 'Telfon raqam kiritilmagan!'}]}
            >
                <div className="btn-group" style={{width: "100%"}}>
                    <input disabled value="+998"
                           style={{
                               width: "44px",
                               outline: "none",
                               background: "#fafafa",
                               border: "1px solid #d9d9d9",
                               borderRight: "0"
                           }}/>
                    <Input
                        placeholder="Telfon raqam"
                        maxLength="9"
                    />
                </div>
            </Form.Item>
            <Form.Item className="mb-0">
                <Button
                    type="primary"
                    className="float-right"
                    htmlType="submit">{translate("signup.next")}
                </Button>
            </Form.Item>
        </Form>
    };


    componentWillUnmount() {
        clearInterval(this.interval);
        window.scrollTo(0, 0);
    }

    componentWillMount() {
        const {products, categoryName} = this.props;
        if (categoryName !== undefined && products !== undefined)
            this.setState({productsOfCategory: products, categoryName});
        animateScroll.scrollToTop();
    }


    render() {
        const state = this.state;
        const {products, categoryName} = this.props;
        const modalVideo = <Modal isOpen={this.state.modal_1} id="modal_video">
                <button onClick={this.toggle}>
                    <i className="fas fa-times-circle"></i>
                </button>
                <ModalBody>
                    <div className="help_modal">
                        <video className=" video-container-overlay" controls="controls" autoPlay>
                            <source src={video}/>
                        </video>
                    </div>
                </ModalBody>
        </Modal>;


        return <ProductConsumer>{
            data => {
                return <div className="container-fluid">
                    <div className="row root justify-content-between ">
                        {/*catalog_menu*/}
                        <div className="catalog_menu">
                            <ul className="d-flex list-unstyled">
                                <li className="border-0"><FormattedMessage id="catalog"/></li>
                                <li>
                                            <span>
                                                <Link to={{
                                                    pathname: "/category/1588964320505",
                                                    idCategory: "5eb5abe00bf2d933efb1a0d1"
                                                }}
                                                      // slug="1588964320505"
                                                      onClick={this.changeCategoryItem}>
                                                    {translate("catalogs.kazan")}
                                                </Link>
                                            </span>
                                </li>
                                <li>
                                            <span>
                                                <Link
                                                    to={{
                                                        pathname: "/category/1589200257868",
                                                        idCategory: "5eb9458109c87d09991898b8"
                                                    }}
                                                    // slug="1589200257868"
                                                    onClick={this.changeCategoryItem}>
                                                    Кастрюли
                                                </Link>
                                            </span>
                                </li>
                                <li>
                                            <span>
                                                <Link

                                                    to={{
                                                        pathname: "/category/1590601322932",
                                                        idCategory: "5ecea66a37be0c0cb4fa4fb3"
                                                    }}
                                                    onClick={this.changeCategoryItem}>
                                                    Жаровни
                                                </Link>
                                            </span>
                                </li>
                                <li>
                                            <span>
                                                <Link
                                                    to={{
                                                        pathname: "/category/1589130201006",
                                                        idCategory: "5eb833d9dde54828929b340b"
                                                    }}
                                                    // slug="1589130201006"
                                                    onClick={this.changeCategoryItem}>
                                                    Сковороды
                                                </Link>
                                            </span>
                                </li>
                                <li>
                                            <span>
                                                <Link
                                                    to={{
                                                        pathname: "/category/1590601339033",
                                                        idCategory: "5ecea67b37be0c0cb4fa4fb4"
                                                    }}
                                                    onClick={this.changeCategoryItem}>
                                                    Воки
                                                </Link>
                                            </span>
                                </li>
                                <li>
                                            <span>
                                                <Link
                                                    to={{
                                                        pathname: "/category/1590601346874",
                                                        idCategory: "5ecea68237be0c0cb4fa4fb5"
                                                    }}
                                                    onClick={this.changeCategoryItem}>
                                                    Грили</Link>
                                            </span>
                                </li>
                                <li><span><Link
                                    to={{
                                        pathname: "/category/1590601447578",
                                        idCategory: "5ecea6e737be0c0cb4fa4fb7"
                                    }}
                                    onClick={this.changeCategoryItem}>Блинницы</Link></span></li>
                                <li><span><Link to={{
                                    pathname: "/category/1590601458731",
                                    idCategory: "5ecea6f237be0c0cb4fa4fb8"
                                }}
                                                onClick={this.changeCategoryItem}>Ковши</Link></span></li>
                                <li><span><Link to={{
                                    pathname: "/category/1590601468326",
                                    idCategory: "5ecea6fc37be0c0cb4fa4fb9"
                                }} onClick={this.changeCategoryItem}>Противни</Link></span></li>
                                <li><span><Link to={{
                                    pathname: "/category/1590601480687",
                                    idCategory: "5ecea70837be0c0cb4fa4fba"
                                }} onClick={this.changeCategoryItem}>Наборы</Link></span></li>
                                <li><span><Link to={{
                                    pathname: "/category/1590601496281",
                                    idCategory: "5ecea71837be0c0cb4fa4fbb"
                                }} onClick={this.changeCategoryItem}>Комплектующие</Link></span>
                                </li>
                            </ul>
                        </div>
                        {/*advertising_carousel*/}
                        {
                            products === undefined ?
                                <div className="advertising_carousel">
                                    <div className="help">
                                        <button onClick={this.prev} className="prev_btn">
                                            <i className="fas fa-chevron-left"/>
                                        </button>
                                        <button onClick={this.next} className="next_btn">
                                            <i className="fas fa-chevron-right"/>
                                        </button>
                                        <ul>
                                            {new Array(5).fill(0).map((item, index) => {
                                                return <li key={index}>
                                                    <input type="radio" onClick={this.carousel} name="slide"/>
                                                    <div className={`slide ${index === 2 && "current"}`}
                                                         style={{
                                                             background: `url(${carousel}) no-repeat`,
                                                             backgroundSize: "cover"
                                                         }}>
                                                        <div className="additions">
                                                            <Link to="/product"><input type="button"
                                                                                       className="btn"
                                                                                       value="Узнать больше"/></Link>
                                                        </div>
                                                    </div>
                                                </li>;
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                : categoryName === undefined
                                ? <div className="advertising_carousel">
                                    <h1 className="text-center font-weight-bold">Malumot Aniqlanmadi...</h1>
                                </div>
                                : <div className="newItems advertising_carousel">
                                    {this.drawTitle(categoryName)}
                                    <ul className="d-flex flex-row flex-wrap list-unstyled p-0 m-0">
                                        {products.map((item, index) => {
                                            return <li key={index}
                                                       className="col-xl-3 col-md-4 col-lg-3 col-sm-4 col-6 m-0">
                                                <div className="">
                                                    {/* <span className="new text-center">Новинки</span> */}
                                                    <div className="img_box">
                                                        <NavLink
                                                            to={`/product/${item.slug}`}
                                                            onClick={() => data.handleDetail(item.id)}
                                                            className="d-flex justify-content-center align-items-center"><img
                                                            src={`${item.current_img}`}
                                                            className="img-fluid" alt=""/>
                                                        </NavLink>
                                                    </div>
                                                    <p className="information">{item.title}</p>
                                                    <span className="Sergr">Серия Granit</span>
                                                    <div
                                                        className="buy d-flex justify-content-between align-items-end">
                                                                <span className="price disabled">{new Intl.NumberFormat('en-US').format(item.price)} Сум</span>
                                                        <a data-toggle="tooltip"
                                                           data-placement="right"
                                                           data-original-title={data.getItemInCart(item.id) === null ? "No" : "Yes"}
                                                           className="red-tooltip"
                                                           onClick={(e) => {
                                                               data.addToCart(item.id)
                                                           }} className="btn">
                                                            <i className="fas fa-cart-plus"></i> В корзину</a>
                                                    </div>
                                                </div>
                                            </li>;
                                        })}
                                    </ul>
                                </div>}
                        {/*newItems*/}
                        { products===undefined && <div className="col-md-12 p-0 m-0  newItems mt-3">
                            {this.drawTitle("Новинки   продаж")}
                            <ul className="d-flex flex-row flex-wrap list-unstyled py-0 pr-0 m-0">
                                {data.products.filter((item,index)=>index < 18).map((item, index) => {
                                    return <li key={index}
                                               className="col-xl-2 col-md-4 col-lg-3 col-sm-4  col-6">
                                        <div className="h-100">
                                            {/* <span className="new text-center">Новинки</span> */}
                                            <div className="img_box">
                                                <NavLink
                                                    to={`/product/${item.slug}`}
                                                    onClick={() => data.handleDetail(item.id)}
                                                    className="d-flex justify-content-center align-items-center">
                                                    <img
                                                        src={`${item.current_img}`}
                                                        className="img-fluid"
                                                        style={{maxWidth: "70% !important"}}
                                                        alt=""/>
                                                </NavLink>
                                            </div>
                                            <p className="information">{item.title}</p>
                                            <span className="Sergr">Серия Granit</span>
                                            <div className="buy d-flex justify-content-between align-items-end">
                                                        <span
                                                            className="price">{new Intl.NumberFormat('en-US').format(item.price)} Сум</span>
                                                <a data-toggle="tooltip"
                                                   data-placement="right"
                                                    // data-original-title={data.getItemInCart(item.id) === null ? "No" : "Yes"}
                                                   className="red-tooltip"
                                                   onClick={() => data.addToCart(item.id)} className="btn"><i
                                                    className="fas fa-cart-plus"></i> В
                                                    корзину</a>
                                            </div>
                                        </div>
                                    </li>;
                                })}
                            </ul>
                        </div>}
                        
                        {/*hitItemsAndAdvertisement*/}

                        { products===undefined && <div className="row col-md-12 m-0 p-0 hitItemsAndAdvertisement mt-3 clearfix">
                            <div className="Advertisement_left col-lg-4 col-xl-3 col-md-4 w-100 ">
                                <div className="checkOrderStatus row m-0  mb-3 ">
                                    <span className="title col-12">Проверить </span><br/>
                                    <span className="title col-12">статус заказа</span><br/>
                                    <div className="row col-10 offset-1  p-0">
                                        <div className="col-md-8 m-0 p-1">
                                            <input
                                                type="text"
                                                onChange={this.setOrderId}
                                                className="form-control"
                                                placeholder="Номер заказа"/>
                                        </div>
                                        <div className="col-md-4 m-0 p-1">
                                            <button onClick={this.checkOrder} className="btn">Проверит</button>
                                        </div>

                                    </div>
                                </div>
                                <div className="advertisement ">
                                    {this.drawTitle("Реклама")}
                                    <div className="text-center box text-wrap p-3 h-100">
                                        <h3>Advertisement</h3>
                                    </div>
                                </div>
                            </div>
                            {state.checkOrder ? <div className="p-0 m-0 hitItems_right col-lg-8 col-xl-9 col-md-8">
                                    {this.drawTitle("check order")}
                                    {state.step ? <div className="text-center"><Spin/></div>
                                        : <div><h4>Checked</h4></div>
                                    }
                                </div> :
                                <div className="p-0 m-0 hitItems_right col-lg-8 col-xl-9 col-md-8">
                                    {this.drawTitle("Хит товары")}
                                    <ul className="row list-unstyled p-0 m-0">
                                        {[...data.products,].map((item, index) => {
                                            return <li key={index}
                                                       className="col-xl-3 col-lg-4 col-md-6 col-sm-4 col-6">
                                                <div className="h-100">
                                                    <span className="new text-center newBg">Хит</span>
                                                    <div className="img_box d-flex align-items-center">
                                                        <NavLink
                                                            to={`/product/${item.slug}`}
                                                            onClick={() => data.handleDetail(item.id)}
                                                            className="d-flex justify-content-center align-items-center">
                                                            <img
                                                                src={`${item.current_img}`}
                                                                className="img-fluid"
                                                                alt=""/>
                                                        </NavLink>
                                                    </div>
                                                    <p className="information">{item.title}</p>
                                                    <span className="Sergr">Серия Granit</span>
                                                    <div
                                                        className="buy d-flex justify-content-between align-items-end ">
                                                            <span
                                                                className="price">{new Intl.NumberFormat('en-US').format(item.price)} Сум</span>
                                                        <a data-toggle="tooltip"
                                                           data-placement="right"
                                                           className="red-tooltip"
                                                           onClick={() => data.addToCart(item.id)}
                                                           className="btn"><i className="fas fa-cart-plus"></i> В
                                                            корзину</a>
                                                    </div>
                                                </div>
                                            </li>;
                                        })}
                                    </ul>
                                </div>
                            }
                        </div>}

                        {/*carousel_sale*/}
                        {/*<div className="carousel_sale">*/}
                        {/*    {this.drawTitle("Акция и скидки")}*/}
                        {/*    {data.products.length !== 0 && <Carousel*/}
                        {/*        addToCart={data.addToCart}*/}
                        {/*        handleDetail={data.handleDetail}*/}
                        {/*        products={data.products}*/}
                        {/*        title="hello"*/}
                        {/*        element="test"/>*/}
                        {/*    }*/}
                        {/*</div>*/}
                        {/*video_content*/}
                        <div className="video_content">
                            {this.drawTitle("Видео обзоры")}
                            <ul className="row list-unstyled m-0 p-0">
                                {new Array(4).fill(0).map((item, index) => {
                                    return <li key={index}
                                               className="col-xl-3 col-lg-4 col-md-6 col-12 col-sm-6">
                                        <button onClick={this.toggle}>
                                            <div
                                                className="item d-flex justify-content-center align-items-center">
                                                <i className="far fa-play-circle"></i>
                                            </div>
                                        </button>
                                        <p className="description text-center">Видео обзор - {index + 1}</p>
                                    </li>
                                })}
                            </ul>
                            {modalVideo}
                        </div>
                        {/*Interesting*/}
                        <div className="Interesting d-block justify-content-center flex-wrap flex-row mt-3">
                            <h1 className="text-center text-light m-0 p-0">Интересный</h1>
                            <ul className="row justify-content-center list-unstyled text-center  ">
                                {this.state.dataOfInteresting.map((item, index) => {
                                    return <li key={index}
                                               className="col-xl-2 col-md-2 col-lg-2 col-4 d-flex flex-column align-items-center">
                                        <img src={item.icon} className="img-fluid " alt=""/>
                                        <p className="m-0 p-0 info text-center">{item.info1}</p>
                                        <p className="m-0 p-0 info  text-center">{item.info2}</p>
                                        <p className="m-0 p-0 info text-center">{item.info3}</p>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                    <Modal isOpen={state.modal}>
                        <ModalBody className="my-0">
                            {state.orderId && this.drawModal()}
                        </ModalBody>
                    </Modal>
                </div>
            }}
        </ProductConsumer>
    }
}

export default Body;