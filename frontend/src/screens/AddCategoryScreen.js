import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../component/FormContainer'
import Message from '../component/Message'
import Loader from '../component/Loader'
import CategoryListScreen from './CategoryListScreen'
import { addCategory } from '../actions/categoryActions'

function AddCategoryScreen() {
  const [name, setName] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categoryCreate = useSelector((state) => state.categoryCreate)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { loading, error, category } = categoryCreate

  //   const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(addCategory(name, userInfo))
  }

  return (
    <div className='LoginBody'>
      <Row>
        {loading && <Loader />}

        <Col className='rightCol'>
          <Row>
            <FormContainer>
              <Form className='form-body' onSubmit={submitHandler}>
                <h1>Add a new Category</h1>
                <Form.Group contolId='name'>
                  <Form.Label>category name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    rounded
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                  Add Category
                </Button>
              </Form>
            </FormContainer>
          </Row>
        </Col>
        <Col>
          <CategoryListScreen />
        </Col>
      </Row>
    </div>
  )
}

export default AddCategoryScreen
