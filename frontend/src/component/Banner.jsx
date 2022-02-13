import React from 'react';
import { Row, Col } from 'react-bootstrap'
import './component_css/Banner.css'

function Banner() {
    return (
        <div className='Banner'>
            <Row>
                <Col md={6} sm={12} id='motto'>
                    <h1>Portble. <br />convenient. <br />Laptop 💻️</h1>
                </Col>

                <Col md={6} sm={12} >
                    <iframe src="https://embed.lottiefiles.com/animation/63783"></iframe>
                    {/* <iframe src="https://embed.lottiefiles.com/animation/44377"></iframe> */}
                    {/* <iframe src="https://embed.lottiefiles.com/animation/15203"></iframe> */}
                </Col>
            </Row>
        </div>
    )
}

export default Banner;
