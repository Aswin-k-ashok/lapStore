import React from 'react';
import {Nav,Container,Navbar} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useNavigate} from 'react-router-dom'
// import '../slate.css'

function Header() {

  // const navigate = useNavigate()

  return(
<header>
<Navbar bg="light" varient='light'  expand="lg" collapseOnSelect >
    <Container >
      <LinkContainer to="/">
      <Navbar.Brand >The Lap Store</Navbar.Brand>
      </LinkContainer>


      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className='ms-auto'>
          <LinkContainer to="/cart">
          <Nav.Link ><i className='fas fa-shopping-cart'></i></Nav.Link>
          
          </LinkContainer>

          <LinkContainer to="/login">   
          {/* <Nav.Link ><i className='fas fa-user' onClick={()=>{navigate='/login'}}></i></Nav.Link> */}
          
          <Nav.Link ><i className='fas fa-user'></i></Nav.Link>
          </LinkContainer>




        </Nav>
      
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>

  );
}

export default Header;
