import React, {Component} from 'react';
import "../style/footer.scss";
import logo from "../images/logo.png"


class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="d-flex flex-row flex-wrap  justify-content-around align-items-center footer">
                    <div className="logo d-flex justify-content-center align-items-start">
                        <img src={logo} className="img-fluid" alt=""/>
                    </div>
                    <div className="data">
                        <span className="text-light">
                            УAловите свое руки мощные вдохновениевкладывает в ваши творческие инструменты, которые
                            обеспечивают абсолютный контроль над текстом. их помощью вы любым элементам тени, эффекты с
                            использованием прозрачности. Они позволят вам создавать элегантные таблицы. И не бойтесь
                            экспериментировать у вас всегда ть отменить или выполнить повторно действия.
                        </span>
                    </div>
                    <div className="contact">
                        <h2 className="text-center title text-light">Контакты</h2>
                        <ul className="d-flex flex-wrap justify-content-start flex-column list-unstyled">
                            <li className="d-flex flex-wrap justify-content-between">
                                <span className="key">Телефон:</span>
                                <span>
                                <span className="value d-block">+998-99-999-99-99</span>
                                <span className="value d-block">+998-99-999-99-99</span>
                            </span>
                            </li>
                            <li className="d-flex flex-wrap justify-content-between">
                                <span className="key">E-mail:</span>
                                <span className="value">info@mechta.uz</span>
                            </li>
                            <li className="d-flex flex-wrap justify-content-between">
                                <span className="key">Адрес:</span>
                                <span className="value">г. Ташкент</span>
                            </li>
                        </ul>
                        <div className="portal">
                            <button className="btn"><i className="fab fa-facebook-f"></i></button>
                            <button className="btn"><i className="fab fa-whatsapp"></i></button>
                            <button className="btn"><i className="fab fa-twitter"></i></button>
                            <button className="btn"><i className="fab fa-instagram"></i></button>
                        </div>
                    </div>


                </div>

            </React.Fragment>
        );
    }
}

export default Footer;