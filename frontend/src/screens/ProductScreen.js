import React,{useState,useEffect} from 'react';
import {Link,useParams} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'
import Rating from '../component/Rating';
// import products from '../products';
import axios from 'axios';


 function ProductScreen({match})  {
     //     //  const product = products.find((p)=> p._id === match.params.id) old code version 5 wont work
     //    const product = products.find((p)=> p._id === (id))
     
     const {id} = useParams()
     const [product,setProducts] = useState({})

    useEffect(()=>{

        const fetchProducts = async ()=>{
            const {data} = await axios.get(`/api/products/${(id)}`)
            setProducts(data)
        }

        fetchProducts()


    },[])

  return(
      <>
   

        <Row>

        <Col md={6}>
            <Image src={product.image} fluid/>
        </Col>

        <Col md={3}>
            <ListGroup className='py-5'> 

            <ListGroup.Item>
                <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
                <h4>{product.description}</h4>
            </ListGroup.Item>

            <ListGroup.Item>
                <h1>{product.price} rs</h1>
            </ListGroup.Item>


            <ListGroup.Item>
            <Rating/>    
            </ListGroup.Item>

            <ListGroup.Item>
                <h1>{product.price} rs</h1>
            </ListGroup.Item>  

            <ListGroup.Item>
                <Row>
                    <Col>
                    <Button>Buy now</Button>
                    </Col>

                    <Col>
                    <Button>add to cart</Button>
                    </Col>
                </Row>
            </ListGroup.Item>          

            </ListGroup>
        </Col>


        </Row>

      
      </>
  )
}

export default ProductScreen;
