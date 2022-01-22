import {React,useState,useEffect} from 'react';
import {Row,Col} from 'react-bootstrap'
import Product from '../component/Product'
import axios from 'axios'
// import products from '../products




function HomeScreen() {

    const [products,setProducts] = useState([])

    useEffect(()=>{
        const fetchProducts = async()=>{
            const {data} = await axios.get('/api/products')
            setProducts (data)
        }

        fetchProducts()
        console.log(products)

    },[])

return(
    <>
    <h2>new collection</h2>
    <Row className='my-3'>
            {products.map((product)=>(
        <Col sm={12} md={6} lg={4} xl={3}>
        
               <Product product ={product}/>
        </Col>
            ))}
    </Row>
    
    </>
)
}

export default HomeScreen;
