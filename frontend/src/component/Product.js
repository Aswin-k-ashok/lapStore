import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating'



function Product ({product}) {
    return (
       

          <>
          
          
          <Card className='my-3 p-3 rounded h-100 m-3 '>
                   
                   <Link to={`/product/${product._id}`}/>
                   <Card.Img src={product.image} variant = 'top'/>
   
                   <Card.Body>
                       <Link to={`/product/${product._id}`}>
                           <Card.Title as='div'>
                               <strong style={{fontWeight:'700'}}>{product.name}</strong>
                           </Card.Title>
   
                       </Link>
   
                   <Card.Text as='div'>
   
                      <Rating value={product.rating}
                      text={`${product.numReviews}reviews` }
                       /> 
   
                   </Card.Text>
   
                   <Card.Text as='div'>
                       <div className='my3'>
                           <p>{product.price} rs</p>
                       </div>
                   </Card.Text>
   
   
                  
                   </Card.Body>
                  </Card>
          </>
           

    
    );
}

export default Product;