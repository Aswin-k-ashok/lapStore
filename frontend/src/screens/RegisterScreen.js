import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { register } from '../actions/userAction'

function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState()
  const [message, setMessage] = useState(null)
  // const [referralId, setReferralId] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('paswords do not match')
    } else {
      dispatch(register(name, email, password, phone))
    }
  }

  return (
    <div className='LoginBody'>
      <Container>
        <Row>
          {loading && <Loader />}

          <Col className='rightCol'>
            <Row>
              <FormContainer>
                <Form className='form-body' onSubmit={submitHandler}>
                  <h1>sign up</h1>
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
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='phone number'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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

                  {/* <Form.Group controlId='referralId' className='py-1'>
                    <Form.Label>Have a referral Id?</Form.Label>
                    <Form.Control
                      type='String'
                      placeholder='Enter referral Id'
                      value={referralId}
                      onChange={(e) => setReferralId(e.target.value)}
                    ></Form.Control>
                  </Form.Group> */}

                  <Button type='submit' variant='primary'>
                    Register
                  </Button>

                  <Form.Label>
                    Already have an Account ?
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    >
                      log in
                    </Link>
                  </Form.Label>
                  {error && <Message>{error}</Message>}
                  {message && <Message>{message}</Message>}
                </Form>
              </FormContainer>
            </Row>
          </Col>
          <Col md={6} sm={12} className='loginBanner'>
            <iframe src='https://embed.lottiefiles.com/animation/41620'></iframe>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RegisterScreen
