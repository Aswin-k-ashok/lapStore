import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Container, Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import '../component/component_css/Header.css'
import { logout } from '../actions/userAction'
import { set } from 'mongoose'
// import '../slate.css'

function Header() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {}, [logoutHandler])
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  return (
    <header
      style={{
        backgroundColor: '#EBECF0',
        position: 'sticky',
        top: '0',
        zIndex: '700',
        marginBottom: '2%',
      }}
    >
      <Navbar
        varient='light'
        expand='lg'
        collapseOnSelect
        style={{ padding: '0' }}
      >
        <Container>
          <LinkContainer to='/' style={{ margin: 'auto' }}>
            <Navbar.Brand>The Lap Store</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/cart' style={{ margin: 'auto' }}>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'> cart</i>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <LinkContainer to='/profile' style={{ margin: 'auto' }}>
                  <Nav.Link>
                    <i className='fas fa-user'> {userInfo.name} </i>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to='/profile' style={{ margin: 'auto' }}>
                  <Nav.Link>
                    <i className='fas fa-user'> user</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo ? (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <Button
                      className='greenMini rounded'
                      onClick={logoutHandler}
                    >
                      log out
                    </Button>
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <Button className='greenMini rounded'>log in</Button>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
