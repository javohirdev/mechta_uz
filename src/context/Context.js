import React, {Component,createContext} from 'react';
import {LOCALES} from "../i18nProvider";
import {detailProduct, storeProducts , category} from "../data";
const ProductContext = createContext(null);

class ProductProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            test: [],
            cart: [],
            modalOpen: false,
            locale: LOCALES.RUSSIAN,
            cartTotal: 0,
            category:[],
            detailProduct: null,
        };
    }

    componentDidMount() {
        this.setProducts();
        this.setCategory();
    }




    setCategory = ()=>{
        category().then(res => {
            let tempCategory = [];
            res.forEach(item => {
                tempCategory = [...tempCategory, item];
            });
            this.setState({
                category: tempCategory
            })
        });
    };
    setProducts = () => {
        storeProducts().then(res => {
            let tempProducts = [];
            res.forEach(item => {
                tempProducts = [...tempProducts, item];
            });
            this.setState({
                products: tempProducts
            })
        });
    };

    getItem = id => {
        let item =  this.state.products.find(item => item.id === id);
       return item;
    };

    handleDetail = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
const productInCart = this.getItemInCart(id);
        this.setProducts();
        if(productInCart === undefined){
            this.setState({detailProduct: product}, () => this.detailOperation("++"))
        }else {
            this.setState({detailProduct: productInCart})
        }
    };

    addToCart = (id) => {
        if (this.getItemInCart(id) === undefined) {
            let tempProducts = [...this.state.products];
            const index = tempProducts.indexOf(this.getItem(id));
            let product = tempProducts[index];
            product.inCart = true;
            product.count = 1;
            const price = product.price;
            product.total = price;
            this.setState(() => {
                return {products: tempProducts, cart: [...this.state.cart, product]};
            }, () => {
                this.addTotals();
            });
            alert("added Cart");
        }
    };
    addTotals = () => {
        let cartTotal = 0;
        this.state.cart.forEach(item => cartTotal += item.total);
        this.setState({cartTotal})
    };

    detailProductToCardAdded = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        if (this.getItemInCart(id) === undefined) {
            const detailProduct = this.state.detailProduct;
            this.setState( {cart: [...this.state.cart,detailProduct]}, () => {
                this.addTotals();
            });
            alert("added Cart");
        }else {

        }
    };

    clearDetailProduct = () => {this.setState({detailProduct: null})};

    detailOperation = report => {
        const {detailProduct} = this.state;
        report === "++" ? detailProduct.count++ : detailProduct.count--;
        detailProduct.total = detailProduct.count * detailProduct.price;
        this.setState(detailProduct);
    };
    changeDetailCount = e => {
        const product = this.state.detailProduct;
        if (!isNaN(parseInt(e.target.value))) {
            if (e.target.value.startsWith("0"))
                e.target.value = e.target.value.substring(1);
            product.count = parseInt(e.target.value);
            product.total = product.count * product.price;
        } else {
            product.count = 0;
            product.total = 0;
        }
        this.setState({detailProduct: product})
    };

    getItemInCart = id => {
        let product = this.state.cart.find(item => item.id === id);
        return product;
    };

    changeCartItemCount = (id,e) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        if (!isNaN(parseInt(e.target.value))) {
            if (e.target.value.startsWith("0"))
                e.target.value = e.target.value.substring(1);
            product.count = parseInt(e.target.value);
            product.total = product.count * product.price;
        } else {
            product.count = 1;
            product.total = product.price;
        }
        this.setState({
            cart: [...tempCart]
        }, () => {
            this.addTotals();
        })
    };


    operationCartItem = (id, report) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        if (report === "++") {
            product.count++;
            product.total +=product.price;
            this.setState({
                cart: [...tempCart]
            }, () => {
                this.addTotals();
            })
        } else if (report === "--") {
            product.count--;
            if (product.count === 0)
                this.removeItem(id);
            else {
                product.total = product.count * product.price;
                this.setState({
                    cart: [...tempCart]
                }, () => {
                    this.addTotals();
                })
            }
        }
    };
    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count++;
        product.total = product.count * product.price;

        this.setState({
            cart: [...tempCart]
        }, () => {
            this.addTotals();
        })
    };
    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.count--;
        if (product.count === 0)
            this.removeItem(id);
        else {
            product.total = product.count * product.price;
            this.setState({
                cart: [...tempCart]
            }, () => {
                this.addTotals();
            })
        }
    };
    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState({
            cart: [...tempCart],
            products: [...tempProducts]
        }, () => {
            this.addTotals();
        })
    };
    clearCart = () => {
        this.setState({
            cart: []
        }, () => {
            this.setProducts();
            this.addTotals();
        })
    };

    changeLanguage = (locale) => {
        this.setState({locale})
    };

    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
                changeLanguage: this.changeLanguage,
                changeDetailCount: this.changeDetailCount,
                getItemInCart: this.getItemInCart,
                detailOperation: this.detailOperation,
                operationCartItem: this.operationCartItem,
                detailProductToCardAdded: this.detailProductToCardAdded,
                clearDetailProduct: this.clearDetailProduct,
                changeCartItemCount: this.changeCartItemCount,

            }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer,ProductContext} ;