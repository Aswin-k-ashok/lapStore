import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import ProfileCard from '../component/ProfileCard'
import UserListScreen from '../screens/UserListScreen'
import ProductListScreen from './ProductListScreen'
import AddCategoryScreen from './AddCategoryScreen'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [message, setMessage] = useState(null)
  const [profileCard, setProfileCard] = useState(true)

  const [usermanage, setUsermanage] = useState(false)
  const [productmanage, setProductmanage] = useState(false)
  const [categorymanagement, setCategorymanagement] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const userDetails = useSelector((state) => state.userDetails)

  const { error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address)
      }
    }
  }, [
    userDetails,
    location,
    navigate,
    dispatch,
    userLogin,
    profileCard,
    userUpdateProfile,
  ])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('paswords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          phone,
          address,
        })
      )
    }
  }

  return (
    <Row>
      <Col md={4}>
        {profileCard ? (
          <div>
            <Row className='profileCard'>
              <ul>
                <li>
                  <i className='fas fa-user' />
                </li>
                <li className='uName'> HELLO {user.name}</li>
                <li>Name : {user.name}</li>
                <li>Email : {user.email}</li>
                <li>Phone : {user.phone}</li>
                {user.isAdmin ? (
                  <Row>
                    <li>
                      <Button
                        className='w-100'
                        onClick={() => setUsermanage(!usermanage)}
                      >
                        user manage
                      </Button>
                    </li>
                    <li>
                      <Button
                        className='w-100'
                        onClick={() => setProductmanage(!productmanage)}
                      >
                        product manage
                      </Button>
                    </li>

                    <li>
                      <Button
                        className='w-100'
                        onClick={() =>
                          setCategorymanagement(!categorymanagement)
                        }
                      >
                        Category Management
                      </Button>
                    </li>
                  </Row>
                ) : (
                  <Row></Row>
                )}
              </ul>
            </Row>
          </div>
        ) : (
          <Form
            className='form-body'
            onSubmit={submitHandler}
            style={{
              backgroundColor: '#fc7670',
              padding: '2em',
              width: '400px',
              borderRadius: '10px',
            }}
          >
            <h2>Update Profile</h2>
            <Form.Group contolId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                rounded
                className='m-0 my-1'
              ></Form.Control>
            </Form.Group>

            <Form.Group contolId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='eg: example@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                rounded
                className='m-0 my-1'
              ></Form.Control>
            </Form.Group>

            <Form.Group contolId='phone'>
              <Form.Label>phone number</Form.Label>
              <Form.Control
                type='number'
                placeholder='phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                rounded
                className='m-0 my-1'
              ></Form.Control>
            </Form.Group>

            <Form.Group contolId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rounded
                className='m-0 my-1'
              ></Form.Control>
            </Form.Group>

            <Form.Group contolId='password'>
              <Form.Label>password</Form.Label>
              <Form.Control
                type='password'
                placeholder='your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='m-0 my-1'
              ></Form.Control>
            </Form.Group>

            <Form.Group contolId='confirmPassword'>
              <Form.Label>confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder=' confirm your password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='m-0 my-1'
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ boxShadow: 'none' }}
            >
              Update
            </Button>

            {error && <Message>{error}</Message>}
            {message && <Message>{message}</Message>}
            {success && <Message variant='success'>user updated</Message>}
          </Form>
        )}

        <Row className='d-flex align-items-center justify-content-center'>
          <Button
            className='rounded my-3 auto btn-sm w-50'
            onClick={() => setProfileCard(!profileCard)}
          >
            {profileCard ? <i>update Profile</i> : <i>show profile</i>}
          </Button>
        </Row>
      </Col>

      <Col md={8}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm rounded'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm rounded' variant='info'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {user.isAdmin ? <Row></Row> : <Row></Row>}
      </Col>

      <Col md={8}>
        {usermanage ? (
          <UserListScreen />
        ) : productmanage ? (
          <ProductListScreen />
        ) : categorymanagement ? (
          <AddCategoryScreen />
        ) : (
          <></>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
