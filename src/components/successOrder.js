import React, {useContext} from 'react';
import {Button} from "antd";
import translate from "../i18nProvider/translate";
import  {ProductConsumer} from "../context/Context";

function SuccessOrder({orderId, message, toggle}) {
    return (
        <div>
            <h4 className="text-center" className={styleHeader}>{message}</h4>
            <p>Siz buyurtmangizni ushbu kod : <b>{orderId}</b> orqali tekshirishingiz mumkin</p>
            <Button onClick={toggle} className="float-right bg-success text-light">{translate("signup.ok")}</Button>
        </div>
    );
}

const styleHeader = {
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "25px"
}

export default SuccessOrder;