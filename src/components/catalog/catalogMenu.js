import React, {Component} from 'react';
import axios from "axios";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
class CatalogMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:[],
        }
    }


    componentDidMount() {
        axios.get("http://server.mechta-posuda.uz:3000/api/category").then(res => {
            this.setState({category: [...this.state.category,res.data]})
        })    }

    render() {
        return (
            <div className="catalog_menu">
                <ul className="d-flex list-unstyled">
                    <li className="border-0"><FormattedMessage id="catalog"/></li>
                    <li><span><Link className="text-decoration-none" to={{pathname: "/qazon",items: this.state.category}}>Казаны</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Кастрюли</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Жаровни</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Сковороды</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Воки</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Грили</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Блинницы</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Ковши</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Противни</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Наборы</Link></span></li>
                    <li><span><Link className="text-decoration-none" to="/">Комплектующие</Link></span></li>
                </ul>
            </div>
        );
    }
}

export default CatalogMenu;