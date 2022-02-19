import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../component/Product'
import { listProducts } from '../actions/productActions'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Banner from '../component/Banner'
// import products from '../products

function HomeScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Container>
      <Container>
        <Banner />
      </Container>

      <h2 className=''>new collection</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <Row className=''>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default HomeScreen
