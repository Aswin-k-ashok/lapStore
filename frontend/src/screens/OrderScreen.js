import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  Link,
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from 'react-router-dom'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  cancelOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_CANCEL_RESET,
} from '../constants/orderConstants'

function OrderScreen() {
  const { id } = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver

  const orderCancel = useSelector((state) => state.orderCancel)
  const {
    loading: loadingCancel,
    success: successCancel,
    error: errorCancel,
  } = orderCancel

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //calculate prices

    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce(
        (acc, item) => acc + (item.price / 75) * item.qty,
        0
      )
    )

    console.log(Math.round(order.totalPrice / 75))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay || successDeliver) {
      console.log('entered')
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_CANCEL_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, successPay, successDeliver, order, navigate, sdkReady])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const cancelHandler = () => {
    dispatch(cancelOrder(order))
  }

  console.log(
    'order',
    order,
    'successPay',
    successPay,
    'successDeliver',
    successDeliver
  )

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Container>
      <Row>
        <Row>
          <Col>
            <h4>Order no: {order._id}</h4>
          </Col>
        </Row>
        <Col md={7}>
          <ListGroup variant='flush'>
            <ListGroup.Item className=''>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
                ,
                <br />
                {order.user.email}
                <br />
                {order.user.phone}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>delevered</Message>
              ) : (
                <Message variant='warning'>not delevered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {order.paymentMethod}
              <br />
              {order.isPaid ? (
                <Message variant='success'>paid</Message>
              ) : (
                <Message variant='warning'>not paid</Message>
              )}
            </ListGroup.Item>
            {order.isCanceled ? (
              <Message variant='danger'>order cancled</Message>
            ) : (
              <></>
            )}

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.Image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col>
                          <p>{item.price}</p>
                        </Col>
                        <Col>
                          <p>x {item.qty}</p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={5}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>{order.orderItems.qty}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>rs {order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>rs {order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>rs {order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {order.paymentMethod === 'PayPal'
              ? console.log('paypalaidsfiojsd')
              : console.log('other')}
            {console.log(order.paymentMethod)}

            {!order.isPaid && order.paymentMethod === 'PayPal' && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={Math.round(order.totalPrice / 75)}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}

            {!order.isPaid && order.paymentMethod === 'cashOnDelivery' && (
              <ListGroup.Item className='d-flex justify-content-center'>
                <Button
                  className='btn btn-info w-50 '
                  onClick={() => {
                    successPaymentHandler('cod')
                  }}
                >
                  cash on Delivery
                </Button>
                <Button
                  className='btn btn-danger w-50 '
                  onClick={cancelHandler}
                >
                  cancel order
                </Button>
              </ListGroup.Item>
            )}

            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  <Button onClick={deliverHandler}>product delivered</Button>
                </ListGroup.Item>
              )}

            {userInfo && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button onClick={cancelHandler} className='btn btn-danger'>
                  {' '}
                  cancel order
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderScreen
