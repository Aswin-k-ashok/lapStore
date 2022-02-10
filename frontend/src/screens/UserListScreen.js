import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { blockUser, listUsers } from '../actions/userAction'
import { USER_BLOCK_RESET } from '../constants/userConstants'

function UserListScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState(true)

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userBlock = useSelector((state) => state.userBlock)
  const {
    loading: loadingBlock,
    error: errorBlock,
    success: successBlock,
  } = userBlock

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successBlock) {
        dispatch({ type: USER_BLOCK_RESET })
      } else {
        dispatch(listUsers())
      }
    } else {
      navigate('/')
    }
  }, [dispatch, navigate, isActive, blockUser])

  const blockHandler = (id) => {
    if (window.confirm('do you want to block this user')) {
      dispatch(blockUser(id))
      window.location.reload()
    }
  }

  return (
    <>
      <h1>users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped borderless hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Admin</th>
              <th>Block status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {user.isActive ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => blockHandler(user._id)}
                  >
                    block / unblock user
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
