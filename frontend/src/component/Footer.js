import React from 'react';
import {Container,Row,Col} from 'react-bootstrap'
import './component_css/Footer.css'

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center ">
            <p>The LapStore &copy;</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
