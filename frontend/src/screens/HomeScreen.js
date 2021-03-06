import { React, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../component/Product'
import { listProducts } from '../actions/productActions'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Banner from '../component/Banner'
import Paginate from '../component/Paginate'
import Meta from '../component/Meta'
// import products from '../products

function HomeScreen() {
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, dispatch))
  }, [dispatch, keyword, pageNumber])

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
        <>
          <Row className=''>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </Container>
  )
}

export default HomeScreen
