import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button, Card, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listAddress } from '../actions/userAction'

function AddressScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const addressList = useSelector((state) => state.addressList)
  const { addresses } = addressList

  useEffect(() => {
    dispatch(listAddress())
  }, [])

  return (
    <Container>
      <Button
        onClick={() => {
          navigate('/profile')
        }}
      >
        go back
      </Button>
      <div>
        {' '}
        <Col>
          <h5>Saved Addresses</h5>
          {addresses.map((address) => (
            <Col key={address._id}>
              <Card className='my-1 p-3 bg-dark rounded mb-3'>
                <div className='addressOverlay'>
                  <Card.Body>
                    <Card.Text as='div'>address: {address.address}</Card.Text>
                    <Card.Text as='div'>city: {address.city}</Card.Text>
                    <Card.Text as='div'>pin: {address.postalCode}</Card.Text>
                    <Card.Text as='div'>country: {address.country}</Card.Text>
                  </Card.Body>
                  <h4>deliver to this address</h4>
                </div>
              </Card>
            </Col>
          ))}
        </Col>
      </div>
    </Container>
  )
}

export default AddressScreen
