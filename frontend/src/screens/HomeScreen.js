import {React,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../component/Product'
import {listProducts} from '../actions/productActions'

// import products from '../products




function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList
    useEffect(()=>{
        dispatch(listProducts())
       
    },[dispatch])



return(
    <>
    <h2>new collection</h2>
    {loading ? <h1>loading..</h1> : error ? <h1>{error}</h1>:<Row className='my-3'>
            {products.map((product)=>(
        <Col sm={12} md={6} lg={4} xl={3}>
        
               <Product product ={product}/>
        </Col>
            ))}
    </Row>
    }
    
    </>
)
}

export default HomeScreen;
