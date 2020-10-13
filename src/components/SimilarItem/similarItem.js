import React, {useContext} from "react";
import {ProductConsumer, ProductContext} from "../../context/Context";
import {Link, NavLink} from "react-router-dom";
import {animateScroll as scroll} from "react-scroll";
import "../../style/SimilarItems/similarItem.scss";

function SimilarItem({changeCurrentImg}) {
    const myContext = useContext(ProductContext);

    const handleDetail = async (productID) => {
        await myContext.handleDetail(productID);
         changeCurrentImg();
        scroll.scrollToTop();
    };

    return (
        <ProductConsumer>
            {data => {
                return (
                    <div className="similarItem mb-5">
                        <div className="col-md-12 p-0 m-0  newItems ">
                            <div className="container-fluid p-0 mb-3 mx-0 draw_title ">
                                <div className="title text-left">Похожие товары</div>
                                <div className="underline"></div>
                            </div>
                            <ul className="d-flex flex-row flex-wrap list-unstyled p-0 m-0">
                                {data.products.slice(0,12).map((item, index) => {
                                    return <li className="col-xl-2 col-md-4 col-lg-3 col-sm-4  col-6 mx-auto"
                                               key={index}>
                                        <div className="">
                                            <span className="new text-center">Новинки</span>
                                            <div className="img_box">
                                                <Link
                                                    to={`/product/${item.slug}`}
                                                    onClick={() => handleDetail(item.id)}
                                                    className="text-decoration-none d-flex justify-content-center align-items-center"><img
                                                    src={item.current_img} className="img-fluid"
                                                    alt=""/>
                                                </Link>
                                            </div>
                                            <p className="information">{item.title}</p>
                                            <span className="Sergr">Серия Granit</span>
                                            <div className="buy d-flex justify-content-between align-items-end">
                                                        <span
                                                            className="price">{new Intl.NumberFormat('en-US').format(item.price)} Сум </span>
                                                <button
                                                    onClick={()=>data.addToCart(item.id)}
                                                    className="btn">
                                                    <i className="fas fa-cart-plus"
                                                    /> В корзину
                                                </button>
                                            </div>
                                        </div>
                                    </li>;
                                })}
                            </ul>
                        </div>

                    </div>
                )
            }}
        </ProductConsumer>
    );
}

export default SimilarItem;