import { Container, Row, Col, Card } from "react-bootstrap";

import React from 'react'

const FormContainer = ({children}) => {
  return (
  <Card  className='m-3 p-3 rounded my-auto'>
      <Container>
          <Row className="justify-content-md-center">
              <Col xs={12} md={6}>
                  {children}
              </Col>
          </Row>
      </Container>
  </Card>
  )
}

export default FormContainer