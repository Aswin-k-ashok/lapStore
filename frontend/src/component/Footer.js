import React from 'react';
import {Container,Row,Col} from 'react-bootstrap'

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
