import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './component/Header'
import HeaderNew from './component/HeaderNew'
import Footer from './component/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import NotFound from './screens/NotFound'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderListReportScreen from './screens/OrderListReportScreen'
import AddCategoryScreen from './screens/AddCategoryScreen'
import CategoryListScreen from './screens/CategoryListScreen'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/cart/:id' element={<CartScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route
            path='/admin/product/:id/edit'
            element={<ProductEditScreen />}
          />
          <Route path='/admin/order' element={<OrderListScreen />} />
          <Route
            path='/admin/orderDetails/:id'
            element={<OrderListReportScreen />}
          />
          <Route path='/admin/addcategory' element={<AddCategoryScreen />} />
          <Route path='/admin/listcategory' element={<CategoryListScreen />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Container>
      {/* <Footer /> */}
    </Router>
  )
}

export default App
