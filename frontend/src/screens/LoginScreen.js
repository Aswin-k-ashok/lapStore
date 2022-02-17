import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Row, Button, Form, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import FormContainer from '../component/FormContainer'
import Loader from '../component/Loader'
import { login } from '../actions/userAction'
import './screen_css/login.css'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div className='LoginBody'>
      <Container>
        <Row>
          {loading && <Loader />}
          <Col md={6} sm={12} className='loginBanner'>
            <iframe src='https://embed.lottiefiles.com/animation/41621'></iframe>{' '}
          </Col>

          <Col className='rightCol'>
            <Row>
              <FormContainer>
                <Form className='form-body' onSubmit={submitHandler}>
                  <h1>sign in</h1>
                  <Form.Group contolId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='eg: example@gmail.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      rounded
                      id='shadowInput'
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group contolId='password'>
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id='shadowInput'
                    ></Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Log In
                  </Button>

                  <Form.Label>
                    Need an Account ?
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : '/register'
                      }
                    >
                      {' '}
                      Join Now
                    </Link>
                  </Form.Label>
                  {error && <Message>{error}</Message>}
                </Form>
              </FormContainer>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginScreen
