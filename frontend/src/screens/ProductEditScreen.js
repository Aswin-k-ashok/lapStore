import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Image } from 'cloudinary-react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../component/Message'
import Loader from '../component/Loader'
import ImageUpload from '../component/ImageUpload'
import FormContainer from '../component/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { listCategory } from '../actions/categoryActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import CropImage from '../component/CropImage'

function ProductEditScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [showCropper, setShowCropper] = useState(false)
  const [cropImage, setCropImage] = useState(false)
  const [imageOne, setImageOne] = useState(null)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: categoryLoading,
    error: categoryError,
    category: categories,
  } = categoryList

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
        setImage(product.image)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    const Test = new FormData()
    Test.set('name', name)
    Test.set('price', price)
    Test.set('countInStock', countInStock)
    Test.set('image', image)
    Test.set('brand', brand)
    Test.set('category', category)
    Test.set('description', description)
    images.forEach((image) => {
      Test.append('images', image)
    })
    dispatch(updateProduct(Test, productId))
  }

  const uploadFileHandler = async (image) => {
    // const file = e.target.files[0]
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
  return (
    <>
      <FormContainer>
        <Row>
          <Col>
            <Button>
              <Link to='/admin/productlist'>go back</Link>
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

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='enter Image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                id='image-file'
                Label='choose a file'
                type='file'
                name='imageOne'
                // onChange={(e) => {
                //   setCropImage(e.target.files[0])
                //   setShowCropper(true)
                // }}
                accept='.jpg,.jpeg,.png,'
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group className='py-1'>
              <Form.Label>Add extra images</Form.Label>
              <FormControl
                type='file'
                id='image-files'
                label='Choose Files'
                custom
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
                    value='select'
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

        {/* {showCropper && (
          <CropImage
            src={cropImage}
            imageCallback={(image) => {
              setImageOne(image)
              setShowCropper(false)
              uploadFileHandler(image)
            }}
            closeHander={() => {
              setShowCropper(false)
            }}
          />
        )} */}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
