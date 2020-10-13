import React, {Component, Fragment} from 'react';
import Body from "./components/Body";
import Footer from "./components/Footer";
import {Redirect, Route, Switch} from "react-router-dom";
import {LanguageProvider, LOCALES} from "./i18nProvider";
import "./style/rootStyle.scss";
import Header from "./components/Header";
import {ProductConsumer} from "./context/Context";
import Cart from "./components/Cart";
import About from "./components/About";
import DetailProduct from "./components/DetalisProduct";
import RegistrationForm from "./components/test";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locale: LOCALES.RUSSIAN,
        }
    }

    changeLanguage = (lang) => {
        this.setState({
            locale: lang,
        })
    };

    render() {
        return (
            <ProductConsumer>
                {data => {
                    return (
                        <LanguageProvider locale={data.locale}>
                            <Header changeLanguage={data.changeLanguage} locale={data.locale}/>
                            <Switch>
                                <Route exact path="/" component={Body}/>
                                <Route exact path="/category/:categorySlug" render={props => {
                                        const {products, category} = data;
                                        if (products.length > 1) {
                                            if (category.length > 1) {
                                                const _category = category.find(item => item.slug === props.match.params.categorySlug);
                                                if (_category !== undefined) {
                                                    const _products = products.filter(item => item.categoryId === _category._id);
                                                    return <Body products={[..._products]}
                                                                 categoryName={_category.nameRu}/>
                                                } else
                                                    return <Body/>
                                            }
                                        }
                                    }}/>
                                <Route exact path="/product/:productId" render={props => {
                                    const product = data.products.find(item => item.slug === props.match.params.productId);
                                    if (data.products.length > 0)
                                        if (product !== undefined) {
                                            data.detailProduct === null && data.handleDetail(product.id);
                                            if (data.detailProduct !== null)
                                                return <DetailProduct push={props.history.push} product={product}/>;
                                        } else
                                            return <Redirect to="/"/>
                                }}/>
                                <Route exact path="/cart" render={props => {return <Cart push={props.history.push}/>}} />
                                <Route exact path="/about" component={About}></Route>
                                <Route render={() => <Redirect to="/" />}/>
                            </Switch>
                            <Footer locale={data.locale}/>
                        </LanguageProvider>
                    )
                }}
            </ProductConsumer>);


    }


}

export default App;
