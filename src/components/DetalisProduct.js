import React, {Component} from 'react';
import ReactImageMagnify from "react-image-magnify";
import {Modal, ModalBody} from "reactstrap";
import axios from "axios";
import YouTube from "react-youtube";
import parser from "html-react-parser";
import SimilarItem from "./SimilarItem/similarItem";
import {ProductConsumer, ProductContext} from "../context/Context";
import {ReloadOutlined, CheckOutlined, CloseOutlined} from "@ant-design/icons"
import {Link, Redirect} from "react-router-dom";
import mainImg from "../images/projects/skavarodka/item_skavarodka_img_1.jpg";
import "../style/projectShow.scss"
import img from "../images/img.jpg"
import RegistrationForm from "./test";
import SuccessOrder from "./successOrder";
import {Spin} from "antd";
import {LOCALES} from "../i18nProvider";

const optsOfYoutube = {
    width: 740,
    height: 450,
    playerVars: {
        controls: 0,
    },
};

class DetailProduct extends Component {
    static contextType = ProductContext;

    constructor(props) {
        super(props);
        this.state = {
            whichImg: mainImg,
            whichDiameter: 0,
            img_id: 1,

            name: null,
            phone: null,
            address: null,
            region: null,

            modal: false,
            conditionAgree: true,
            successResponse: false,
            responseModal: false,
            status: true,
            orderId: null,
            responseIcon: <ReloadOutlined spin/>,
        };
        console.log(props)
    }


    changeValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };


    toggle = () => {
        this.setState(prev => {
            return {modal: !prev.modal}
        });
    };

    toInputEmpty = () => {
        this.setState({name: "", phone: "", address: ""});
    };

    handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            this.toggle();
            this.toInputEmpty();
        }
    };

    changeColor = img_id => {
        const {detailProduct} = this.context;
        const img = detailProduct.img.find(item => item.id === img_id).img;
        this.setState({whichImg: img});
        this.setState({img_id});
    };

    HandleBuy = () => {
        // this.setState({responseModal: true});
        const {detailProduct: {total, price, count, categoryId, id}} = this.context;
        const {colorId, name, phone, address, region} = this.state;

        const bodyRes = {
            name,
            phone,
            address,
            region,
            totalPrice: total,
            num: count,
            products: [
                {
                    productId: id,
                    productNum: count,
                    price,
                    categoryId,
                    colorId
                }
            ]
        };
        this.setState({orderId: "15"}, () => {
            console.log(this.state.orderId)
        });

        console.log(bodyRes)
        // const response = await axios.post("http://server.mechta-posuda.uz:3000/api/orders", {...bodyRes});
        // this.toggle();

        // this.setState({successResponse: res.data.message.toLowerCase() === "success"}, () => {
        //     if (this.state.successResponse)
        //         setTimeout(this.toggle, 2000);
        // });
    };

    responseSuccessMethod = () => {
        setTimeout(() => {
            return this.state.successResponse ? this.setState({
                responseIcon: <CheckOutlined/>
            }) : this.setState({responseIcon: <CloseOutlined/>});
        }, 1300)
    };

    componentWillUnmount() {
        this.context.clearDetailProduct();
    }

    componentDidMount() {
        this.changeCurrentImg();
    }

    changeCurrentImg = () => {
        const {detailProduct} = this.context;
        if (detailProduct !== null) {
            const {current_img, colors} = detailProduct;
            this.setState({whichImg: current_img, img_id: colors[0].img_id})
        }
    };

    addUser = user => {
        const {name, address, region, phone} = user;
        this.setState({name, address, region, phone, status: false})
        this.HandleBuy();
    };

    theEnd = () => {
        this.setState({
            name: null,
            phone: null,
            address: null,
            region: null,
            modal: false,
            status: true,
            orderId: null
        });
        this.props.push("/");
    };

    render() {
        const state = this.state;
        return (
            <ProductConsumer>
                {data => {
                    const {detailProduct} = data;
                    return (
                        detailProduct !== null
                            ? <div className="container-fluid ">
                                <div className="row project_info mb-4">
                                    <div className="col-md-5 col-6 p-3 pr-4">
                                        <div className="item_img row">
                                            <div className="item_imgs col-md-2">
                                                {detailProduct.img.map(item => {
                                                    return <div className="p-1" key={item.id}>
                                                        <div className={`${(item.img === state.whichImg) ? 'shadow' : ''}`}>
                                                            <a href="#" onMouseOver={(e) => {
                                                                e.preventDefault();
                                                                this.setState({whichImg: `${item.img}`})
                                                            }}>
                                                                <div className="p-1 ">
                                                                    <img src={item.img} className="img-fluid"/></div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                            <div className="col-10 p-0 m-0" style={{zIndex: 1}}>
                                                <ReactImageMagnify {...{
                                                    smallImage: {
                                                        alt: 'Wristwatch by Ted Baker London',
                                                        isFluidWidth: true,
                                                        src: state.whichImg,
                                                        sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                                    },
                                                    largeImage: {
                                                        src: state.whichImg,
                                                        width: 2044,
                                                        height: 1738
                                                    },
                                                    enlargedImageContainerDimensions: {
                                                        width: '150%',
                                                        height: '100%'
                                                    }
                                                }} />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-7 p-2 pt-0 px-0">
                                        <div className="item_info  ">
                                            <h3 className="font-weight-bold">{detailProduct.title}</h3>
                                            <div className="row mr-0">
                                                <div className="col-md-8">
                                                    {[
                                                        {key: "Размеры (Ш х В х Д)", value: detailProduct.size},
                                                        {key: "Веc (брутто)", value: detailProduct.weight},
                                                        {key: "Диаметр дна", value: `${detailProduct.diametr} мм`},
                                                        // {key: "Антипригарное покрытие", value: "Есть"},
                                                        {key: "Диаметр изделия", value: `${detailProduct.diz} мм`},
                                                    ].map((item, index) => {
                                                        return <div key={index}
                                                                    className="d-flex justify-content-between align-items-center table_key_value">
                                                            <span>{item.key}:</span>
                                                            <span>{item.value}</span>
                                                        </div>
                                                    })}
                                                    <span><Link to="/" className="link text-success text-decoration-none">Есть в наличии</Link></span>
                                                </div>
                                            </div>
                                            <div className="row mr-0">
                                                <div className="col-md-7">
                                                    <div
                                                        className="d-flex justify-content-between align-items-center table_key_value">
                                                        <span className="mt-3">Выберите цвет:</span>
                                                        <span><div className="choose_color p-0 m-0">
                                            {detailProduct.colors.map(item => {
                                                return <span className="pl-1" key={item.img_id}>
                                                    <input
                                                        style={{background: `url(${item.img})`}}
                                                        className={item.img_id === state.img_id ? 'checked' : ''}
                                                        onClick={() => this.changeColor(item.img_id)}
                                                        name="color"
                                                        type="radio"/>
                                                </span>
                                            })}
                                        </div>
                                                        </span>
                                                    </div>
                                                    {/*            <div*/}
                                                    {/*                className="d-flex justify-content-between align-items-center table_key_value">*/}
                                                    {/*                <span className="mt-2">Другие диаметры:</span>*/}
                                                    {/*                <span>*/}
                                                    {/*    <div className="bx_size m-0 p-0 d-flex">*/}
                                                    {/*        {new Array(4).fill(0).map((item, index) => {*/}
                                                    {/*            return <label key={index}*/}
                                                    {/*                          htmlFor={`diameter${index + 1}`}*/}
                                                    {/*                          className={`diameter ${(index === state.whichDiameter) && " styleLabel"}`}*/}
                                                    {/*            >*/}
                                                    {/*                {22 + index * 3} см*/}
                                                    {/*                <input*/}
                                                    {/*                    id={`diameter${index + 1}`}*/}
                                                    {/*                    type="radio"*/}
                                                    {/*                    className="p-0 m-0 d-none" name="diameter"*/}
                                                    {/*                    onClick={() => this.setState({whichDiameter: index})}*/}
                                                    {/*                />*/}
                                                    {/*            </label>*/}
                                                    {/*        })}*/}
                                                    {/*    </div>*/}
                                                    {/*</span>*/}
                                                    {/*            </div>*/}
                                                    <div
                                                        className="d-flex justify-content-between align-items-center table_key_value">
                                                        <span className="mt-2">Количество:</span>
                                                        <span>
                                                <div className="item_amount">
                                                        <div className="d-flex justify-content-between">
                                                            <button
                                                                type="button"
                                                                onClick={() => (detailProduct.count > 1) && data.detailOperation()}>
                                                              <i className="fas fa-minus-circle"
                                                                 name="decrement"
                                                              />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                value={detailProduct.count}
                                                                name="amount"
                                                                onChange={(e) => data.changeDetailCount(e)}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => data.detailOperation("++")}>
                                                                <i className="fas fa-plus-circle"
                                                                   name="increment"
                                                                />
                                                            </button>
                                                        </div>
                                                </div>
                                            </span>
                                                    </div>
                                                    <div className="d-flex justify-content-start  table_key_value">
                                    <span>
                                        <div className="price">
                                            <span>Сумма: </span>
                                         <span>{new Intl.NumberFormat('en-US').format(detailProduct.total)} Сум </span>
                                        </div>
                                    </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mx-0 p-0">
                                                <div className="col-md-10 d-flex justify-content-end p-0 m-0">
                                                    <div className="btns">
                                                        <button className="btn d-inline"
                                                                onClick={() => data.detailProductToCardAdded(detailProduct.id)}>
                                                            <i className="fas fa-cart-plus"/> В корзину
                                                        </button>
                                                        <button className="btn d-inline"
                                                                onClick={this.toggle}>
                                                            <i className="fas fa-check"/> Заказать В Один Клик
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row project_property p-3">
                                    <div className="w-100">
                                        <ul className="nav p-0 m-0 d-flex justify-content-end" role="tablist">
                                            <li>
                                                <a className="active" data-toggle="tab" href="#Описание">Описание</a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#Характеристика">Характеристика</a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#Видео">Видео</a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#ИнсПоЭкс">Инструкция по
                                                    эксплуатации</a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab" href="#Отзывы">Отзывы (8)</a>
                                            </li>
                                        </ul>
                                        <div className="tab-content p-0 m-0 w-100">
                                            <div id="Описание" className="tab-pane active"><br/>
                                                <h3>Описание</h3>
                                                {parser(detailProduct.description)}
                                            </div>
                                            <div id="Характеристика" className="tab-pane fade"><br/>
                                                <h3>Характеристика</h3>
                                                {parser(detailProduct.characteristic)}
                                            </div>
                                            <div id="Видео" className="tab-pane fade"><br/>
                                                <h3>Видео</h3>
                                                <div className="row">
                                                    <div className="col-8 offset-2  d-flex justify-content-center p-2">
                                                        <YouTube videoId={detailProduct.video} opts={optsOfYoutube}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="ИнсПоЭкс" className="tab-pane fade"><br/>
                                                <h3>Инструкция по эксплуатации</h3>
                                                {parser(detailProduct.instruction)}
                                            </div>
                                            <div id="Отзывы" className="tab-pane fade"><br/>
                                                <h3>Отзывы</h3>
                                                <p>Сковорода из литого толстостенного алюминия «Мечта» станет незаменимым
                                                    инструментом и надежным помощником на вашей кухне.
                                                    Многофункциональная сковорода отлично подойдет для приготовления
                                                    разнообразных
                                                    блюд из мясо, рыбы и овощей. Благодаря термоаккумулирующим свойствам
                                                    пищевого
                                                    алюминия пища не пригорает а томится, а благодаря новейшей формуле
                                                    сверхпрочного
                                                    антипригарного покрытия готовить можно при минимальном количестве масла
                                                    не
                                                    переживая за то что пища может пригореть. На посуде ТМ «Мечта» можно
                                                    жарить,
                                                    тушить и варить без потерь вкусовых и полезных качеств продуктов.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <SimilarItem changeCurrentImg={this.changeCurrentImg}/>
                                <Modal isOpen={state.modal}>
                                    <ModalBody className="my-0">
                                        {state.status ?
                                            <RegistrationForm addUser={this.addUser}/> :
                                            state.orderId === null ? <Spin/> : <SuccessOrder
                                                toggle={this.theEnd}
                                                orderId={state.orderId}
                                                message={data.location === LOCALES.RUSSIAN ? "Заказ был принят" : "Buyurtma qabul qilindi"}/>
                                        }
                                    </ModalBody>
                                </Modal>
                            </div>
                            : <Redirect to="/"/>);
                }}
            </ProductConsumer>
        );
    }
}

export default DetailProduct;