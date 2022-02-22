import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Form, Button, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import ProfileCard from '../component/ProfileCard'
import UserListScreen from '../screens/UserListScreen'
import ProductListScreen from './ProductListScreen'
import AddCategoryScreen from './AddCategoryScreen'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderActions'

function ProfileUpdateScreen() {
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

  const prodManage = () => {
    setProductmanage(true)
    setUsermanage(false)
    setCategorymanagement(false)
  }

  const catManage = () => {
    setCategorymanagement(true)
    setProductmanage(false)
    setUsermanage(false)
  }

  const usemanage = () => {
    setUsermanage(true)
    setProductmanage(false)
    setCategorymanagement(false)
  }
  return (
    <Container>
      <Form
        className='form-body'
        onSubmit={submitHandler}
        style={{
          backgroundColor: '#fc7670',
          padding: '2em',
          width: '50%',
          borderRadius: '5px',
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

        <Button type='submit' variant='primary' style={{ boxShadow: 'none' }}>
          Update
        </Button>
        <Button>show addresses</Button>

        {error && <Message>{error}</Message>}
        {message && <Message>{message}</Message>}
        {success && <Message variant='success'>user updated</Message>}
      </Form>
    </Container>
  )
}

export default ProfileUpdateScreen
