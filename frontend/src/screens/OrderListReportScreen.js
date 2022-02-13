import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  Link,
  useNavigate,
  useLocation,
  Navigate,
  useParams,
} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderListReportScreen() {
  const { id } = useParams()
  const [sdkReady, setSdkReady] = useState(false)
  const orderId = id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

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
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <Row>
      <h1>Order no: {order._id}</h1>
      <Col md={7}>
        <ListGroup variant='flush'>
          <ListGroup.Item className=''>
            <h2>Shipping</h2>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},
              {order.shippingAddress.postalCode},{order.shippingAddress.country}
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
                        <Image src={item.Image} alt={item.name} fluid rounded />
                      </Col>

                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
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
        </ListGroup>
      </Col>
    </Row>
  )
}

export default OrderListReportScreen
