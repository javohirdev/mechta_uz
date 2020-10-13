import React, {useEffect, useState} from "react";
import Glide from '@glidejs/glide'
import {NavLink} from "react-router-dom";
import translate from "../i18nProvider/translate";
import {animateScroll as scroll} from "react-scroll";

const Carousel = ({element = 'glide', children, products, addToCart, handleDetail}) => {

    const [slider] = useState(new Glide(`.${element}`, {
            type: 'slide',
            perView: 5,
            startAt: 2,
            focusAt: "center",
            autoplay: 2000,
            hoverpause: true,
            bound: true,
            dragThreshold: false,
            breakpoints: {
                600: {perView: 1},
                800: {perView: 2},
                1000: {perView: 3},
                1200: {perView: 4},
            },
        }
    ));

    useEffect(() => {
        slider.mount()
    }, []);

    return (
        <div className={element}>
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {
                        [...products,...products,...products].map((item, index) => {
                            return <li className="glide__slide" key={index}>
                                <div className="item_glide">
                                    {<span
                                        className="new text-center">{(index !== 2) ? `${15 + index + 2} % Скидка` : "Акция"}</span>}
                                    <div className="img_box d-flex ">
                                        <NavLink
                                            to={`/product/${item.slug}`}
                                            onClick={() => handleDetail(item.id)}
                                            className="d-flex justify-content-center align-items-center"><img
                                            src={`${item.img[0].img}`}
                                            className="img-fluid" alt=""/>
                                        </NavLink>
                                    </div>
                                    <p className="information" style={{fontSize: "13px"}}>{item.title}</p>
                                    <span>Серия Granit</span>
                                    <div className="buy d-flex justify-content-between align-items-end mt-2">
                                        <span className="price">
                                            {new Intl.NumberFormat('en-US').format(item.price)} {translate("test.price")}
                                        </span>
                                        <a data-toggle="tooltip"
                                           data-placement="right"
                                           className="red-tooltip btn"
                                           onClick={() => {addToCart(item.id);scroll.scrollToTop()}}
                                        >
                                            <i className="fas fa-cart-plus"/> В
                                            корзину</a>
                                    </div>
                                </div>
                            </li>;
                        })
                    }
                </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
                <button className="changeBtn prevBtn" data-glide-dir="<"><i className="fas fa-chevron-left"/></button>
                <button className="changeBtn nextBtn" data-glide-dir=">"><i className="fas fa-chevron-right"/></button>
            </div>
        </div>


    )
};

export default Carousel;