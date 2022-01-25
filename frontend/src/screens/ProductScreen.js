import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../component/Rating'
import { listProductDetails } from '../actions/productActions'
import './screen_css/productScreen.css'

function ProductScreen() {
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()

  const { id } = useParams()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(id))
  }, [dispatch, id])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  // const product = {}

  return (
    <>
      <Row className='py-5'>
        <Col md={4}>
          <Image src={product.image} fluid />
        </Col>

        <Col md={4}>
          <ListGroup className='py-5' variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <p>{product.price} ₹</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value={product.rating} />
              <p>from {product.numReviews} reviews</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup className='py-5'>
            <ListGroup.Item>
              <h1>₹ {product.price}</h1>
            </ListGroup.Item>

            <ListGroup.Item>
              {product.stock > 0 ? 'In stock' : 'out of stock'}
            </ListGroup.Item>

            {product.stock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>QTY</Col>
                  <Col>
                    <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(parseInt(product.stock)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <Row>
                <Col className='button-group'>
                  <Button className='custom-btn btn-5'>Buy now</Button>
                </Col>

                <Col className='button-group'>
                  <Button
                    className='custom-btn btn-5'
                    onClick={addToCartHandler}
                  >
                    add to cart
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
