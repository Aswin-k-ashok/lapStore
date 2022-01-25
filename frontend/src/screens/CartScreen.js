import React, { useEffect } from 'react'
import { Link ,useNavigate,useLocation,useParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../component/Message'
import { addToCart } from '../actions/cartActions'

function CartScreen() {

  const {id} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

const productId = (id)
const qty = location.search ? Number(location.search.split('=')[1]) : 1
console.log(id, qty)


const cart = useSelector((state) => state.cart)
const {cartItems} = cart

console.log(cartItems);


useEffect(()=>{
  if(productId){
    dispatch(addToCart(productId,qty))
  } 
},[dispatch,productId,qty])

const removeFromCartHandler = (id)=>{
  console.log('item removed')
}

const checkoutHandler = ()=>{
  console.log('proceed to checkout')
}


  return (
    <>
      <Row>

        <Col md={8}>
          <h1>SHOPPING CART</h1>
          {cartItems.length === 0 ? <Message>your cart is empty <Link to='/'>go back</Link></Message>: (
            <ListGroup variant='flush'>

              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded/>
                        </Col>
                        
                        <Col md={3}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>

                        <Col md={3}>
                          <p>₹ {item.price}</p>
                        </Col>

                        <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {[...Array(parseInt(item.stock)).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={()=> removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                      </Row>

                </ListGroup.Item>
              ))}

            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc,item)=> acc + item.qty, 0)}) items</h2>
              ₹{cartItems.reduce((acc,item)=> acc + item.qty * item.price,0).toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled= {cartItems.length === 0} onClick={checkoutHandler}> proceed to checkout</Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>


      </Row>
    </>
  )
}

export default CartScreen
