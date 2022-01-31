import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { userUpdateProfileReducer } from '../reducers/userReducers'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const userDetails = useSelector((state) => state.userDetails)

  const { error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address)
      }
    }
  }, [userDetails, location, navigate, dispatch, userLogin])

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
      <Col md={3}>
        <Form className='form-body' onSubmit={submitHandler}>
          <h2>Profile</h2>
          <Form.Group contolId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              rounded
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
            ></Form.Control>
          </Form.Group>

          <Form.Group contolId='password'>
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              placeholder='your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group contolId='confirmPassword'>
            <Form.Label>confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder=' confirm your password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>

          {error && <Message>{error}</Message>}
          {message && <Message>{message}</Message>}
          {success && <Message variant='success'>user updated</Message>}
        </Form>
      </Col>

      <Col md={9}>
        <h2>my orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
