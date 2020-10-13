import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import { LOCALES , I18nPropvider } from "../i18nProvider";
import translate from "../i18nProvider/translate";
import { animateScroll } from "react-scroll";
import "../style/header.scss";
import "../style/headerMobile.scss"
import logo from "../images/logo.png"
import flagRuss from "../images/icons/flag/flag_russian.png";
import flagUzb from "../images/icons/flag/flag_uzb.png"
import {Modal, ModalBody} from "reactstrap";

const activeStyle = {
    fontWeight: "bold",
    color: "yellow ",
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            mainImg: flagRuss,
            firstDraw: true
        }
    }

    toggle = () => {
        this.setState(prev => {
            return {
                ...prev,
                modal: !prev.modal,
            }
        })
    };

    changeFlag = flag => {
        this.setState({
            mainImg: flag,
        })
    };

    menuDraw = () => {
        const menu = [
            {
                iconClass: "fas fa-home",
                redirect: '/home'
            },
            {
                iconClass: "fas fa-layer-group",
                redirect: '/1'
            },
            {
                iconClass: "fas fa-info-circle",
                redirect: '/2'
            },
            {
                iconClass: "far fa-bookmark",
                redirect: '/3'
            },
            {
                iconClass: "fab fa-shopify",
                redirect: '/4'
            },
            {
                iconClass: "fas fa-photo-video",
                redirect: '/5'
            },
            {
                iconClass: "far fa-address-card",
                redirect: '/about'
            },
            {
                iconClass: "fas fa-bullhorn",
                redirect: '/7'
            },
            {
                iconClass: "far fa-comment-dots",
                redirect: '/8'
            },
            {
                iconClass: "fas fa-coins",
                redirect: '/9'
            },
        ];

        return (
            menu.map((item, index) => {
                return <li key={index} className="d-flex justify-content-center nav-item"><NavLink
                    onClick={animateScroll.scrollToTop} to={item.redirect}
                    className="nav-link text-capitalize text-decoration-none m-0 p-0" exact activeStyle={activeStyle}><i
                    className={item.iconClass}></i>{translate(`header_menu.menu_${index + 1}`)}</NavLink></li>
            })
        )
    };

    render() {
        if (this.state.firstDraw){
            this.setState({firstDraw: false})
            window.addEventListener("scroll", () => {
            const menu = document.querySelector(".stick");
            if (menu !== null && !menu.classList.contains("rootStick") && window.scrollY >= 128) {
                menu.className += " rootStick";
            } else if (menu !== null && window.scrollY < 128) {
                menu.classList.remove("rootStick");
            }
        });
        }
        const {locale,changeLanguage} = this.props;

        const modalSearch = <Modal isOpen={this.state.modal} toggle={this.toggle} id="modal_video">
            <button onClick={this.toggle}>
                <i className="fas fa-times-circle"></i>
            </button>
            <ModalBody>
                <div className="search row">
                    <form className="col-md-10 offset-md-1 col-sm-6 offset-sm-3 col-6 offset-3" onSubmit={() => {
                        this.toggle();
                    }}>
                        <input type="text" placeholder="поиск..."/>
                        <input type="submit" value="поиск"/>
                    </form>
                </div>
            </ModalBody>
        </Modal>;

        return (
                    <div className="container-fluid p-0 m-0 mb-2">
                        <header className="row p-0 m-0">
                            <div className="col-md-3 col-8 text-center  container-sm">
                                <Link to="/">
                                    <img src={logo} className="img-fluid  w-100 m-0 p-0"/>
                                </Link>
                            </div>

                            <div className="col-md-6 col-12 p-0 m-0 text-center mt-4">
                                <h2 className="ExBold text-uppercase">{translate("header_title.title_1")}</h2>
                                <p className="d-block p-0 m-0 medium">{translate("header_title.title_2")}</p>
                            </div>

                            <div className="col-md-3 col-12 text-center row container-sm m-0 p-0 mt-2">
                                <ul className="d-flex justify-content-center w-100 align-items-center list-unstyled my-0 p-0">
                                    <li>
                                        <div className="dropdown">
                                            <a type="button" data-toggle="dropdown"
                                               className="d-flex justify-content-center align-items-center">
                                                <img src={this.state.mainImg} className="img-fluid" alt=""/>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <a href="#"
                                                   onClick={(e) => {e.preventDefault();changeLanguage(LOCALES.RUSSIAN);this.changeFlag(flagRuss)}}
                                                   className="dropdown-item">
                                                    <img src={flagRuss} className="img-fluid p-2" alt=""/>
                                                </a>
                                                <a href="#" onClick={(e) => {e.preventDefault();changeLanguage(LOCALES.UZBEK);this.changeFlag(flagUzb)}}
                                                   className="dropdown-item ">
                                                    <img src={flagUzb} className="img-fluid p-2" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="ml-2"><Link to="/cart" href="#"><i className="fas fa-cart-plus"></i></Link>
                                    </li>
                                    <li className="ml-2">
                                        <a href="#" className="" onClick={this.toggle}><i className="fas fa-search"></i></a>
                                    </li>
                                </ul>
                                <p className="col-md-12">+998-99-329-14-04</p>
                            </div>
                        </header>
                        <div className="menu_root">
                            <div className=" navbar navbar-expand-lg p-0 m-0 navbar-dark stick">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className="d-flex justify-content-around w-100 list-unstyled navbar-nav">
                                        {this.menuDraw()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {modalSearch}
                    </div>
        );




    }
}


export default Header;