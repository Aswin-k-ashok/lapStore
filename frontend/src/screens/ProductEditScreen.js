import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import FormContainer from '../component/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import { listCategory } from '../actions/categoryActions'
import ImageUpload from '../component/ImageUpload'
import CropImage from '../component/CropImage'

function ProductEditScreen() {
  const { id } = useParams()
  const productId = id
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [discountPrice, setDiscountPrice] = useState(0)
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [cropImage, setCropImage] = useState(null)
  const [imageOne, setImageOne] = useState(null)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: categoryLoading,
    error: categoryError,
    category: categories,
  } = categoryList

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
        dispatch(listCategory())
      } else {
        setName(product.name)
        setPrice(product.price)
        setDiscountPrice(product.discountPrice)
        setImage(product.image)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, productId, product, successUpdate, navigate])

  const uploadFileHandler = async (image) => {
    //const file = e.target.files[0]
    const formData = new FormData()
    // formData.append('image', file)
    formData.append('image', image, image.originalname)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const multiFileUploadHandler = async (e) => {
    const files = Array.from(e.target.files)
    setImages([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const formData = new FormData()
    formData.set('name', name)
    formData.set('price', price)
    formData.set('discountPrice', discountPrice)
    formData.set('countInStock', countInStock)
    console.log(imageOne.originalname)
    formData.append('image', image)
    formData.set('brand', brand)
    formData.set('category', category)
    formData.set('description', description)
    images.forEach((image) => {
      formData.append('images', image)
    })
    dispatch(updateProduct(formData, productId))
    setSubmitted(false)
  }
  return (
    <>
      <FormContainer>
        <Row>
          <Col>
            <Button>
              <Link to='/test'>go back</Link>
            </Button>
          </Col>
        </Row>
        <h1>Edit Product</h1>

        {loadingUpdate ? (
          <Loader />
        ) : errorUpdate ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='Name'
                placeholder='Enter Product Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>price</Form.Label>
              <Form.Control
                type='number'
                placeholder='enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='py-1' controlId='discountPrice'>
              <Form.Label>Discount Rate in Percentage</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter the discount rate'
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image-text'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='enter Image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='image-file'>
              <Form.Control
                label='choose a file'
                type='file'
                name='imageOne'
                onChange={(e) => {
                  console.log('here')
                  return setCropImage(e.target.files[0])
                }}
                accept='.jpg,.jpeg,.png,'
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className='py-1' controlId='image-files'>
              <Form.Label>Add extra images</Form.Label>
              <FormControl
                type='file'
                label='Choose Files'
                multiple
                onChange={multiFileUploadHandler}
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='enter the product description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Product Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Label>category</Form.Label>
            <ListGroup.Item className='py-1 bg-transparent border-0'>
              <Row>
                <Col>
                  <Form.Control
                    as='select'
                    value={category}
                    placeholder='select'
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((x) => (
                      <option key={x._id} value={x.name}>
                        {x.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>

            <Form.Group controlId='countInStock'>
              <Form.Label>Stock Count</Form.Label>
              <Form.Control
                type='number'
                placeholder='stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              update
            </Button>
          </Form>
        )}
        {cropImage && (
          <CropImage
            src={cropImage ? cropImage : ''}
            imageCallback={(image) => {
              setImageOne(image)
              uploadFileHandler(image)
              setCropImage(null)
            }}
            closeHander={() => {
              setCropImage(null)
            }}
          />
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
