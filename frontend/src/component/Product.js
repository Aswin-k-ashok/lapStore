import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import './component_css/Product.css'

function Product({ product }) {
  return (
    <>
      <Card className='my-3 p-3 rounded  ' fluid id='card'>
        <Link to={`/product/${product._id}`} className='card-image'>
          <Card.Img
            className='card-image'
            src={product.image}
            variant='top'
            fluid
          />
        </Link>

        <Card.Body>
          <Link
            to={`/product/${product._id}`}
            className='card-title'
            style={{ textDecoration: 'none' }}
          >
            <Card.Title as='h4' className='card-title'>
              <p className='card-title' style={{ fontWeight: '700' }}>
                {product.name}
              </p>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews}reviews`}
            />
          </Card.Text>

          <Card.Text as='div'>
            <div className='my3'>
              {product.discountPrice > 0 ? <></> : <></>}
              {product.discountPrice > 0 ? (
                <div className='d-flex m-2 justify-content-between'>
                  <p>{product.discountPrice} % off : </p>
                  <p
                    style={{
                      textDecoration: 'line-through',
                    }}
                  >
                    {product.price} ₹
                  </p>
                  <p
                    style={{
                      color: 'red',
                    }}
                  >
                    {' '}
                    {product.price -
                      product.price * 0.01 * product.discountPrice}{' '}
                    ₹
                  </p>
                </div>
              ) : (
                <p>{product.price} ₹</p>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
