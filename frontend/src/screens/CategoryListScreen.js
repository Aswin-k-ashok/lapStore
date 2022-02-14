import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import { listCategory } from '../actions/categoryActions'

const CategoryListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log('categorylist screen')

  const categoryList = useSelector((state) => state.categoryList)
  console.log(categoryList)
  const { loading, error, category } = categoryList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    } else {
      console.log('dispatching action')
      dispatch(listCategory())
    }
  }, [dispatch, userInfo])

  return (
    <>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  )
}

export default CategoryListScreen
