import React, { Children } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './component_css/FormContainer.css'

function FormContainer({ children }) {
  return (
    <Container className='blurred-box'>
      <Row>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  )
}

export default FormContainer
