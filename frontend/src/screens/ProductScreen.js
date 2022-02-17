import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import InnerImageZoom from 'react-inner-image-zoom'
import Message from '../component/Message'

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import Rating from '../component/Rating'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import './screen_css/productScreen.css'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')

  const navigate = useNavigate()

  const { id } = useParams()

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  useEffect(
    () => {
      if (successProductReview) {
        alert('Review Submited !')
        setRating(0)
        setComment('')
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      }
      dispatch(listProductDetails(id))
    },
    [dispatch, id],
    successProductReview
  )

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }
  const productImg = product.image

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  // const product = {}

  return (
    <Container>
      <Row className='py-5 align-items-start'>
        <Col
          md={4}
          style={{
            backgroundColor: 'white',
            padding: '18px',
            borderRadius: '5px',
            marginTop: '3em',
          }}
        >
          <InnerImageZoom
            // src={imgPreview ? `${STATIC_BASE_URL}${imgPreview}` : ''}
            // zoomSrc={imgPreview ? `${STATIC_BASE_URL}${imgPreview}` : ''}
            src={productImg}
            zoomSrc={productImg}
            fullscreenOnMobile={false}
            hasSpacer={true}
            zoomScale={1.5}
            moveType='pan'
            zoomType='hover'
            hideHint={true}
            fadeDuration={280}
            className='p-2'
          />
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

      {/* Reviews */}
      <Row>
        <h3 className='align-center'>Reviews</h3>
        <Col md={6}>
          {product.reviews.length == 0 && (
            <Message>No Reviews For this Product</Message>
          )}
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>write a review</h2>
              {userInfo ? (
                <Form onSubmit={submitHandler} className='m-0'>
                  <Form.Group controlId='rating'>
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      className='w-100'
                      as='select'
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value=''>Select...</option>
                      <option value='1'>1 - Poor</option>
                      <option value='2'>2 - Fair</option>
                      <option value='3'>3 - Good</option>
                      <option value='4'>4 - Very Good</option>
                      <option value='5'>5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId='comment'>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      className='w-100'
                      as='textarea'
                      row='3'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type='submit'
                    variant='primary'
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  You need to <Link to='/login'>login</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          {product.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating}></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductScreen
