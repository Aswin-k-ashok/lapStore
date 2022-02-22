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
                        <Button className='btn btn-light'> Dashboard</Button>
                      </Link>
                      <Link to='/profileupdate'>
                        <Button className='btn btn-light'>
                          {' '}
                          Update Profile
                        </Button>
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfileScreen
