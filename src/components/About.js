import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import "../style/about.scss";

class About extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md="4" className="mt-5 mb-5">
                            <h4>
                                Мы открыты для сотрудничества и 
                                предоставляем взаимовыгодные условия партнерства. 
                                Мы готовы рассмотреть варианты совместной
                                работы, которые будут способствовать расширению и оптимизации 
                                ассортимента гипермаркетов, повышению качества услуг и
                                открытию новых магазинов.
                            </h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default About;