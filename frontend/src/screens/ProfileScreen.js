import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import ProfileCard from '../component/ProfileCard'
import { getUserDetails, updateUserProfile } from '../actions/userAction'

function ProfileScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [message, setMessage] = useState(null)
  const [profileCard, setProfileCard] = useState(true)

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
  }, [userDetails, location, navigate, dispatch, userLogin, profileCard])

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
                <li>Address : {user.address}</li>
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
            className='rounded my-3 auto '
            onClick={() => setProfileCard(!profileCard)}
          >
            {profileCard ? <i>update Profile</i> : <i>show profile</i>}
          </Button>
        </Row>
      </Col>

      <Col md={8}>
        <h2>my orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
