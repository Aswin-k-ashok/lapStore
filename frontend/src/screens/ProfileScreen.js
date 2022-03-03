import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Form, Button, Table, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listMyOrders } from '../actions/orderActions'
import { showReferralCode, showWalletBalance } from '../actions/userAction'

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

  const referralId = useSelector((state) => state.referralId)
  const { id } = referralId

  const wallet = useSelector((state) => state.wallet)
  const { data } = wallet

  const genrateReferalId = async () => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${userInfo.token}`,
    //   },
    //   const {data} = await axios.post('/api/referral',config)
    // }
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(showReferralCode())
        dispatch(showWalletBalance())
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
    userInfo,
    success,
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
      <Row>
        <Col md={12} sm={12}>
          <div>
            <Row className='profileCard'>
              <Col>
                <ul>
                  <li>
                    <i className='fas fa-user' />
                  </li>
                  <li className='uName'> HELLO {user.name}</li>
                  <li>Name : {user.name}</li>
                  <li>Email : {user.email}</li>
                  <li>Phone : {user.phone}</li>
                  {user.isAdmin ? (
                    <>
                      <li>
                        <Link to='/test'>
                          <Button className='btn btn-light cardButtons'>
                            {' '}
                            Dashboard
                          </Button>
                        </Link>
                        <Link to='/profileupdate'>
                          <Button className='btn btn-light cardButtons'>
                            {' '}
                            Update Profile
                          </Button>
                        </Link>

                        {/* <h4>Your referral code</h4>
                        {id.map((id) => (
                          <p
                            key={id._id}
                            style={{ fontSize: '2rem', color: 'green' }}
                          >
                            {id.referralId}
                          </p>
                        ))} */}
                      </li>
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </Col>
              <Col className='userPanel'>
                <h4 style={{ color: 'white' }}>
                  Your Referral Code{' '}
                  <p>share this code to get 100 in your wallet</p>
                </h4>

                {id.map((id) => (
                  <p
                    key={id._id}
                    style={{
                      fontSize: '2rem',
                      color: '#03898F',
                      // backgroundColor: '#401144',
                      padding: '10px',
                    }}
                  >
                    {id.referralId}
                  </p>
                ))}
                <h2>Wallet</h2>
                <h5>Balance</h5>
                <p style={{ fontSize: '2rem', color: 'green' }}>
                  &#x20b9;{data ? data : 0}
                </p>
              </Col>
              <Col
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <Link to='/address'>
                  <Button className='cardButtons'>Manage Addresses</Button>
                </Link>
                <Link to='/profileupdate'>
                  <Button className='cardButtons'>Update Profile</Button>
                </Link>
                <Link to='/myorder'>
                  <Button className='cardButtons'>View Orders</Button>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
