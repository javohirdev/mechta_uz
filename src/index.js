import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css"
import "antd/dist/antd"
import { ProductProvider } from "./context/Context";

ReactDOM.render(
    <ProductProvider>
        <Router>
            <App/>
        </Router>
    </ProductProvider>,
    document.getElementById('root')
);
