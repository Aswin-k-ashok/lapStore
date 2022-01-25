
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header  from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import NotFound from './screens/NotFound';

function App() {
  return (
    <Router>
      <Header/>
    <Container>
      <Routes>

    <Route path='/' element={<HomeScreen/>} exact/>
    <Route path='/product/:id' element={<ProductScreen/>}  />
    <Route path='/cart' element={<CartScreen/>}/>
    <Route path='/cart/:id' element={<CartScreen/>}/>


    <Route path= '*' element={<NotFound/>}/>

      </Routes>
    </Container>
      <Footer/>
    </Router>
  );
}

export default App;
