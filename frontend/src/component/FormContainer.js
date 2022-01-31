import React, { Children } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
  return (
    <Container>
      <Row>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  )
}

export default FormContainer
