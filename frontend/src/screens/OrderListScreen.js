import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form, FormControl, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { listOrders } from '../actions/orderActions'

function OrderListScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handler = (order) => {
    navigate(`/order/${order}`)
  }

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login')
    } else {
      dispatch(listOrders())
    }
  }, [dispatch, navigate, userInfo, Link])
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1> Orders</h1>
        </Col>
        <Col className='text-right'>
          <Link to='/profile'>
            <Button>go back</Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped borderless hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>ordered by</th>
              <th>Payment Method</th>
              <th>Orderd placed</th>
              <th>Order paid status</th>
              <th>Order Cancelation status</th>
              <th>Order Details</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isCanceled ? (
                    <p style={{ color: 'crimson' }}>Order canceld</p>
                  ) : (
                    <p style={{ color: 'green' }}>ready to ship</p>
                  )}
                </td>
                <td>
                  {/* <LinkContainer to={`/order/${order._id}`}> */}
                  <Button
                    onClick={(e) => {
                      handler(order._id)
                    }}
                    variant='light'
                    className='btn-sm'
                  >
                    view order
                  </Button>
                  {/* </LinkContainer> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
