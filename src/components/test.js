import React, {Component} from 'react';
import {Button, Checkbox, Form, Input, Select,} from 'antd';
import axios from "axios";
import translate from "../i18nProvider/translate";

const {Option} = Select;


class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            address: "",
            name: "",
            region: "",
            step: true
        }
    }

    nextStep = async item => {
        const {phone} = item;

        // const res = await axios.post("http://server.mechta-posuda.uz:3000/api/product", {phone: item.phone})

        this.setState({
            phone: phone,
            name: "arslonbek",
            region: 1,
            address: 'toshkent yunusobod',
            step: false
        }, () => {
            console.log(this.state)
        });
    };
    tempAddUser = item => {
        const {addUser} = this.props;
        const {region, phone} = this.state;

        if (isNaN(item.region))
            item.region = region;

        addUser({...item, phone})
    };

    findRegion = id => {
        let region = ["Toshkent shahar",
            "Toshkent viloyati",
            "Andijon viloyati",
            "Buxoro viloyati",
            "Fargʻona viloyati",
            "Jizzax viloyati",
            "Xorazm viloyati",
            "Namangan viloyati",
            "Navoiy viloyati",
            "Qashqadaryo viloyati",
            "Qoraqalpogʻiston Respublikasi",
            "Samarqand viloyati",
            "Sirdaryo viloyati",
            "Surxondaryo viloyati",
        ].find((item, index) => index + 1 === id);
        return region;
    };

    render() {
        console.log("renden= ", this.state)
        const {step, phone, address, region, name} = this.state;
        return (
            <>
                {step ? <Form
                        name="register"
                        onFinish={this.nextStep}
                        initialValues={{}}
                        scrollToFirstError
                    >
                        <Form.Item
                            className="my-2"
                            name="phone"
                            rules={[{required: true, message: 'Telfon raqam kiritilmagan!'}]}
                        >
                            <div className="btn-group" style={{width: "100%"}}>
                                <input disabled value="+998"
                                       style={{
                                           width: "44px",
                                           outline: "none",
                                           background: "#fafafa",
                                           border: "1px solid #d9d9d9",
                                           borderRight: "0"
                                       }}/>
                                <Input
                                    placeholder="Telfon raqam"
                                    maxLength="9"
                                />
                            </div>
                        </Form.Item>
                        <Form.Item className="mb-0">
                            <Button type="primary" className="float-right"
                                    htmlType="submit">{translate("signup.next")}</Button>
                        </Form.Item>
                    </Form>
                    :
                    <Form
                        name="register"
                        onFinish={this.tempAddUser}
                        initialValues={{'name': name, 'address': address, 'region': this.findRegion(region)}}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="name"
                            type="text"
                            rules={[
                                {
                                    required: true,
                                    message: 'To`liq ism kiritilmagan!',
                                },
                            ]}
                        >
                            <Input placeholder="To`liq ism"/>
                        </Form.Item>


                        <Form.Item
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Manzil kiritilmagan!'
                                }
                            ]}
                        >
                            <Input placeholder="Manzil"/>
                        </Form.Item>
                        <Form.Item
                            name="region"
                            hasFeedback
                            rules={[{required: true, message: 'Viloyat tanlanmagan!'}]}
                        >
                            <Select placeholder="Region">
                                {
                                    ["Toshkent shahar",
                                        "Toshkent viloyati",
                                        "Andijon viloyati",
                                        "Buxoro viloyati",
                                        "Fargʻona viloyati",
                                        "Jizzax viloyati",
                                        "Xorazm viloyati",
                                        "Namangan viloyati",
                                        "Navoiy viloyati",
                                        "Qashqadaryo viloyati",
                                        "Qoraqalpogʻiston Respublikasi",
                                        "Samarqand viloyati",
                                        "Sirdaryo viloyati",
                                        "Surxondaryo viloyati",
                                    ].map((item, index) => <Option value={index + 1}>{item}</Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            className="mb-0"
                            rules={[
                                {validator: (_, value) => value ? Promise.resolve() : Promise.reject('Rozilik bildirilmagan!')},
                            ]}
                        >
                            <Checkbox>
                                <a href="">Shartnoma</a>ga ro`ziman
                            </Checkbox>
                        </Form.Item>
                        <Form.Item className="mb-0">
                            <Button className="float-right" type="primary" htmlType="submit">
                                {translate("signup.end")}
                            </Button>
                        </Form.Item>
                    </Form>}
            </>
        );
    }
}

export default RegistrationForm;