import React from 'react'
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Nav,
} from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import UserListScreen from './UserListScreen'
import ProductListScreen from './ProductListScreen'
import OrderListScreen from './OrderListScreen'
import CategoryListScreen from './CategoryListScreen'
import OfferlistScreen from './OfferlistScreen'
import AddCategoryScreen from './AddCategoryScreen'
import DashBoard from '../component/DashBoard'

function Dashboard() {
  return (
    <div>
      <h1 className='mx-4'>ADMIN PAGE</h1>
      <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
        <Row>
          <Col md={2} className='bg-light py-5'>
            <Nav.Item>
              <Nav.Link eventKey='first'>Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='second'>User Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='third'>Product Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='fourth'>Order Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='fifth'>Category Management</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='sixth'>Offer Management</Nav.Link>
            </Nav.Item>
          </Col>

          <Col md={10}>
            <Tab.Content>
              <Tab.Pane eventKey='first'>
                <DashBoard />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey='second'>
                <UserListScreen />
              </Tab.Pane>
            </Tab.Content>

            <Tab.Content>
              <Tab.Pane eventKey='third'>
                <ProductListScreen />
              </Tab.Pane>
            </Tab.Content>

            <Tab.Content>
              <Tab.Pane eventKey='fourth'>
                <OrderListScreen />
              </Tab.Pane>
            </Tab.Content>
            <Tab.Content>
              <Tab.Pane eventKey='fifth'>
                <AddCategoryScreen />
              </Tab.Pane>
            </Tab.Content>

            <Tab.Content>
              <Tab.Pane eventKey='sixth'>
                <OfferlistScreen />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Dashboard
