import React from 'react';

export default  function CartColumns(props) {
    return (
        <div className="container-fluid pt-2 text-center d-none d-lg-block">
        <div className="row">
            <div className="col-10 mx-auto col-lg-2">
                <p className="text-uppercase">Products</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <p className="text-uppercase">name of product</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <p className="text-uppercase">price</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <p className="text-uppercase">quantitiy</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <p className="text-uppercase">remove</p>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <p className="text-uppercase">total</p>
            </div>
        </div>
        </div>
    );
}
