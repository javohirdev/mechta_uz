import React, {useEffect, useState,useContext} from 'react';
import {Link} from "react-router-dom";
import {animateScroll as scroll} from "react-scroll";
import {ProductConsumer, ProductContext} from "../context/Context";
import {AvField, AvForm} from "availity-reactstrap-validation";
import YouTube from 'react-youtube';
import "../style/projectShow.scss";
import mainImg from "../images/projects/skavarodka/item_skavarodka_img_1.jpg";
import kozon from "../images/items/img3.png";
import imgSecond from "../images/projects/skavarodka/item_skavarodka_img_2.png";
import color_1 from "../images/icons/itemColors/black-150x150.jpg";
import color_2 from "../images/icons/itemColors/granit-150x150.jpg";
import color_3 from "../images/icons/itemColors/gold1-150x150.jpg";
import color_4 from "../images/icons/itemColors/star-150x150.jpg";
import skavarodka from "../images/items/skavarodka.png";
import mainImg1 from "../images/items/img_1.jpg";
import kozon1 from "../images/items/img2.jpg";
import imgSecond1 from "../images/items/img3.jpg";
import {Button, Modal, ModalBody} from "reactstrap";
import {detailProduct} from "../data";


function ProjectShowFun(props) {
    const {product, title} = props.location;

    const images = [mainImg, kozon, imgSecond, mainImg1, kozon1, imgSecond1];
    const [whichImg, setwhichImg] = useState(mainImg);
    const [whichDaimeter, setwhichDaimeter] = useState(0);
    const [amountItem, setAmountItem] = useState(product.count);
    const [chooseColor, setChooseColor] = useState(color_1);
    const [total, setTotal] = useState(product.total);
    const [modal, setModal] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [adress, setAdress] = useState("");
    const [conditionAgree, setConditionAgree] = useState(true);
    const changeNameValue = e => {
        setName(e.currentTarget.value)
    };
    const changeLastNameValue = e => {
        setLastName(e.currentTarget.value)
    };
    const changeAddressValue = e => {
        setAdress(e.currentTarget.value)
    };
    const changePhoneNumberValue = e => {
        setPhoneNumber(e.currentTarget.value)
    };
    const toggle = () => {
        setModal(!modal);
        setConditionAgree(true);
    };
    const toInputEmpty = () => {
        setName("");
        setLastName("");
        setAdress("");
        setPhoneNumber("");
    };
    const handleSubmit = (event, errors, values) => {
        if (!errors.length) {
            toggle();
            toInputEmpty();
        }

    };


    useEffect(() => {
        const amount = document.querySelector("input[name='amount']");
        amount.value = amountItem;
    }, [amountItem]);

    useEffect(() => {
        setAmountItem(product.count);
        setTotal(product.total);
    });

    const optsOfYoutube = {
        width: 540,
        height: 300,
        playerVars: {
            controls: 0,
        },
    };

    const itemAmountDECvsINC = e => {
        if (e.target.getAttribute("name") === "increment") {
            setAmountItem(parseInt(amountItem) + 1);
            setTotal(9000 * (parseInt(amountItem) + 1));
        } else if (amountItem !== 0 && e.target.getAttribute("name") === "decrement") {
            setTotal(9000 * (parseInt(amountItem) - 1));
            setAmountItem(parseInt(amountItem) - 1);
        }

        if (e.target.name === "amount" && e.target.value !== null) {
            setTotal(9000 * e.target.value);
            setAmountItem(parseInt(e.target.value));
        }
    };
    const drawItemAmount = () => {
        return <div className="item_amount">
            <div className="d-flex justify-content-between">
                <button type="button" onClick={itemAmountDECvsINC}>
                    <i className="fas fa-minus-circle" name="decrement"/>
                </button>
                <input type="number" name="amount" onKeyUp={itemAmountDECvsINC}/>
                <button type="button" onClick={itemAmountDECvsINC}>
                    <i className="fas fa-plus-circle" name="increment"/>
                </button>
            </div>
        </div>
    };
    return (
        <ProductConsumer>{data => {
            console.log("data.detailProduct = ",data.detailProduct);
            return (
                <div className="container-fluid ">
                    <div className="row project_info mb-4">
                        <div className="col-xl-5 p-3 pr-4">
                            <div className="item_img row">
                                <div className="item_imgs col-md-2">
                                    {images.map(item => {
                                        return <div className="p-1">
                                            <div className={`${(item === whichImg) && "shadow"}`}>
                                                <a href="#" onMouseOver={(e) => {
                                                    e.preventDefault();
                                                    setwhichImg(item)
                                                }}>
                                                    <div className="p-1 ">
                                                        <img src={item} className="img-fluid"/></div>
                                                </a>
                                            </div>
                                        </div>
                                    })}
                                </div>
                                <div className="img colmd-10 py-3">
                                    <img src={whichImg} className="img-fluid" alt=""/>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-7 p-2 pt-0 px-0">
                            <div className="item_info  ">
                                <h4 className="font-weight-bold">Сковорода 28см АП Гранит с ручкой и стекл. крышкой</h4>
                                <div className="row mr-0">
                                    <div className="col-md-8">
                                        {[
                                            {key: "Размеры (Ш х В х Д)", value: "290 x 65 x 480"},
                                            {key: "Веc (брутто)", value: "1.6 кг"},
                                            {key: "Диаметр дна", value: "245 мм"},
                                            {key: "Антипригарное покрытие", value: "Есть"},
                                            {key: "Диаметр изделия", value: "280 мм"},].map((item, index) => {
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
                                            <span>
                                        <div className="choose_color p-0 m-0">
                                            {[color_1, color_2, color_3, color_4].map((item, index) => {
                                                return <span className="pl-1"><input
                                                    style={{background: `url(${item})`}}
                                                    className={(item === chooseColor) && " checked"} onClick={() => {
                                                    setChooseColor(item)
                                                }} name="color" type="radio"/></span>
                                            })}
                                        </div>
                                    </span>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between align-items-center table_key_value">
                                            <span className="mt-2">Другие диаметры:</span>
                                            <span>
                                            <div className="bx_size m-0 p-0 d-flex">
                                                {new Array(4).fill(0).map((item, index) => {
                                                    return <label
                                                        htmlFor={`diameter${index + 1}`}
                                                        className={`diameter ${(index === whichDaimeter) && " styleLabel"}`}
                                                    >
                                                        {22 + index * 3} см
                                                        <input
                                                            id={`diameter${index + 1}`}
                                                            type="radio"
                                                            className="p-0 m-0 d-none" name="diameter"
                                                            onClick={() => setwhichDaimeter(index)}
                                                        />
                                                    </label>
                                                })}
			                                </div>
                                        </span>
                                        </div>
                                        <div
                                            className="d-flex justify-content-between align-items-center table_key_value">
                                            <span className="mt-2">Количество:</span>
                                            <span>
                                                <div className="item_amount">
                                                        <div className="d-flex justify-content-between">
                                                            <button
                                                                type="button"
                                                                onClick={() => (product.count > 1 && data.decrement(product.id))}>
                                                              <i className="fas fa-minus-circle"
                                                                 name="decrement"
                                                              />
                                                            </button>
                                                            <input
                                                                type="number"
                                                                maxlength="3"
                                                                placeholder={amountItem}
                                                                name="amount"
                                                                onChange={(e) => data.setCount(product.id, e)}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => data.increment(product.id)}>
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
                                         <span>{new Intl.NumberFormat('en-US').format(total)} Сум </span>
                                        </div>
                                    </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mx-0 p-0">
                                    <div className="col-md-10 d-flex justify-content-end p-0 m-0">
                                        <div className="btns">
                                            <button className="btn d-inline"><i className="fas fa-cart-plus"/> В корзину
                                            </button>
                                            <button className="btn d-inline" onClick={toggle}><i
                                                className="fas fa-check"/> Заказать В Один Клик
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
                                    <p>
                                        Сковорода из литого толстостенного алюминия «Мечта» станет незаменимым
                                        инструментом и надежным помощником на вашей кухне.
                                        Многофункциональная сковорода отлично подойдет для приготовления разнообразных
                                        блюд из мясо, рыбы и овощей. Благодаря термоаккумулирующим свойствам пищевого
                                        алюминия пища не пригорает а томится, а благодаря новейшей формуле сверхпрочного
                                        антипригарного покрытия готовить можно при минимальном количестве масла не
                                        переживая за то что пища может пригореть. На посуде ТМ «Мечта» можно жарить,
                                        тушить и варить без потерь вкусовых и полезных качеств продуктов.</p>
                                </div>
                                <div id="Характеристика" className="tab-pane fade"><br/>
                                    <h3>Характеристика</h3>
                                    <p>Сковорода из литого толстостенного алюминия «Мечта» станет незаменимым
                                        инструментом и надежным помощником на вашей кухне.
                                        Многофункциональная сковорода отлично подойдет для приготовления разнообразных
                                        блюд из мясо, рыбы и овощей. Благодаря термоаккумулирующим свойствам пищевого
                                        алюминия пища не пригорает а томится, а благодаря новейшей формуле сверхпрочного
                                        антипригарного покрытия готовить можно при минимальном количестве масла не
                                        переживая за то что пища может пригореть. На посуде ТМ «Мечта» можно жарить,
                                        тушить и варить без потерь вкусовых и полезных качеств продуктов.</p>
                                </div>
                                <div id="Видео" className="tab-pane fade"><br/>
                                    <h3>Видео</h3>
                                    <div className="row">
                                        <div className="col-6 d-flex justify-content-center p-2">
                                            <YouTube videoId="jeBxS-eDL3M" opts={optsOfYoutube}/>
                                        </div>
                                        <div className="col-6 d-flex justify-content-center p-2">
                                            <YouTube videoId="-fsruxr8mQw" opts={optsOfYoutube}/>
                                        </div>
                                    </div>
                                </div>
                                <div id="ИнсПоЭкс" className="tab-pane fade"><br/>
                                    <h3>Инструкция по эксплуатации</h3>
                                    <p>Сковорода из литого толстостенного алюминия «Мечта» станет незаменимым
                                        инструментом и надежным помощником на вашей кухне.
                                        Многофункциональная сковорода отлично подойдет для приготовления разнообразных
                                        блюд из мясо, рыбы и овощей. Благодаря термоаккумулирующим свойствам пищевого
                                        алюминия пища не пригорает а томится, а благодаря новейшей формуле сверхпрочного
                                        антипригарного покрытия готовить можно при минимальном количестве масла не
                                        переживая за то что пища может пригореть. На посуде ТМ «Мечта» можно жарить,
                                        тушить и варить без потерь вкусовых и полезных качеств продуктов.</p>
                                </div>
                                <div id="Отзывы" className="tab-pane fade"><br/>
                                    <h3>Отзывы</h3>
                                    <p>Сковорода из литого толстостенного алюминия «Мечта» станет незаменимым
                                        инструментом и надежным помощником на вашей кухне.
                                        Многофункциональная сковорода отлично подойдет для приготовления разнообразных
                                        блюд из мясо, рыбы и овощей. Благодаря термоаккумулирующим свойствам пищевого
                                        алюминия пища не пригорает а томится, а благодаря новейшей формуле сверхпрочного
                                        антипригарного покрытия готовить можно при минимальном количестве масла не
                                        переживая за то что пища может пригореть. На посуде ТМ «Мечта» можно жарить,
                                        тушить и варить без потерь вкусовых и полезных качеств продуктов.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="similarItem mb-5">
                        <div className="col-md-12 p-0 m-0  newItems ">
                            <div className="container-fluid p-0 mb-3 mx-0 draw_title ">
                                <div className="title text-left">Похожие товары</div>
                                <div className="underline"></div>
                            </div>
                            <ul className="d-flex flex-row flex-wrap list-unstyled p-0 m-0">
                                {new Array(6).fill(0).map((item, index) => {
                                    return <li className="col-xl-2 col-md-4 col-lg-3 col-sm-4  col-6 mx-auto">
                                        <div className="">
                                            <span className="new text-center">Новинки</span>
                                            <div className="img_box">
                                                <Link to="/project" onClick={scroll.scrollToTop}
                                                      className="text-decoration-none d-flex justify-content-center align-items-center"><img
                                                    src={index % 2 === 0 ? kozon : skavarodka} className="img-fluid"
                                                    alt=""/></Link>
                                            </div>
                                            <p className="information">Котел походный с крышкой 8л</p>
                                            <span className="Sergr">Серия Granit</span>
                                            <div className="buy d-flex justify-content-between align-items-end">
                                                <span className="price">{new Intl.NumberFormat('en-US').format(1000000)} Сум </span>
                                                <button
                                                    onClick={scroll.scrollToTop}
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
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalBody>
                            <AvForm onSubmit={handleSubmit} vertical>
                                <AvField
                                    value={name}
                                    label="Имя :"
                                    name="name"
                                    onChange={changeNameValue}
                                    type="text"
                                    errorMessage="Недействительным Имя"
                                    validate={{required: {value: true},}}
                                />
                                <AvField
                                    value={lastName}
                                    label="Фамилия :"
                                    name="lastName"
                                    onChange={changeLastNameValue}
                                    type="text"
                                    errorMessage="Недействительным Фамилия"
                                    validate={{required: {value: true},}}
                                />
                                <AvField
                                    value={adress}
                                    label="Адрес :"
                                    name="adress"
                                    onChange={changeAddressValue}
                                    type="text"
                                    errorMessage="Недействительным Адрес"
                                    validate={{required: {value: true},}}
                                />
                                <AvField
                                    label="Номер Телефона :"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={changePhoneNumberValue}
                                    type="text"
                                    errorMessage="Недействительным Номер Телефона"
                                    validate={{required: {value: true},}}
                                />
                                <div className="d-flex justify-content-between align-items-center">
                                    <a href="#" className="text-decoration-none mr-2 text-primary agreeCheck">Я согласен
                                        с условиями</a><input onClick={() => {
                                    setConditionAgree(!conditionAgree);
                                }} type="checkbox"/>
                                    <Button type="submit" disabled={conditionAgree}
                                            className="btn-success w-50 m-2 ml-0">Заказать</Button>
                                </div>

                            </AvForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }}
        </ProductConsumer>
    );
}

export default ProjectShowFun;