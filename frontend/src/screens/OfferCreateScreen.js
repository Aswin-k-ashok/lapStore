import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  FormControl,
  ListGroup,
  Container,
} from 'react-bootstrap'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from '../component/FormContainer'
import { useParams } from 'react-router-dom'
import { listCategory } from '../actions/categoryActions'
import { createOffer } from '../actions/offerActions'

const OfferCreateScreen = () => {
  const { id } = useParams()
  const offerId = id
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [active, setActive] = useState(false)
  const [category, setCategory] = useState('all')

  const dispatch = useDispatch()

  const offerList = useSelector((state) => state.offerList)
  const { loading, error, offers } = offerList

  const categoryList = useSelector((state) => state.categoryList)
  const { category: categories } = categoryList

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createOffer({
        title,
        discountPercentage,
        active,
        category,
      })
    )
    navigate('/admin/offers')
  }

  useEffect(() => {
    dispatch(listCategory())
  }, [])

  return (
    <Container>
      <Link to='/admin/offers' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create An Offer</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='py-3' controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                className='mx-0'
                placeholder='Enter the title for the offer'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='py-3' controlId='discountPercentage'>
              <Form.Label>Discount percentage</Form.Label>
              <Form.Control
                type='Number'
                className='mx-0'
                placeholder='Enter the discount percentage'
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <ListGroup.Item className='py-3 mb-3'>
              <Form.Label>Offer Active status</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    as='select'
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                  >
                    <option key={1} value={true}>
                      Active
                    </option>
                    <option key={2} value={false}>
                      Inactive
                    </option>
                    ))
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item className='py-3 mb-3'>
              <Form.Label>Category</Form.Label>

              <Row>
                <Col>
                  <Form.Control
                    as='select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((x) => (
                      <option key={x._id} value={x.name}>
                        {x.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>

            <Button type='submit' variant='info'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default OfferCreateScreen
