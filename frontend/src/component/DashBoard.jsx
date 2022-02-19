import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import '../component/component_css/DashBoard.css'



function DashBoard() {
    const [userCount, setUserCount] = useState()
    const [productCount, setProductCount] = useState()
    const [orderCount, setOrderCount] = useState()
    const [profit, setProfit] = useState()

    useEffect(() => {

        const count = async () => {
            const { data: countUser } = await axios.get('/api/dashboard/user')
            const { data: countProduct } = await axios.get('/api/dashboard/product')
            const { data: countOrder } = await axios.get('/api/dashboard/order')
            const { data: productProfit } = await axios.get('/api/dashboard/profit')

            setUserCount(countUser)
            setProductCount(countProduct)
            setOrderCount(countOrder)
            setProfit(productProfit)
        }
        count()
    }, [])


    return (
        <Container className='bg-secondary rounded'>

            <h1>Dashboard</h1>

            <Row>

                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#FFE5CB" }}>
                        <ul>
                            <li>Total Users</li>
                            <h1>{userCount}</h1>

                        </ul>
                    </div>
                </Col>
                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#E9E7FD" }}>
                        <ul>
                            <li>Total Orders</li>
                            <h1>{orderCount}</h1>

                        </ul>
                    </div>
                </Col>

                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#C8F6DD" }}>
                        <ul>
                            <li>Total Stock</li>
                            <h1>{productCount}</h1>
                        </ul>
                    </div>
                </Col>

            </Row>

            <Row>

                <Col lg={4} md={6} sm={12}>
                    <div className="card" style={{ backgroundColor: "#FED2E2" }}>
                        <ul>
                            <li>Total Sales</li>
                            <h1>₹ {profit}</h1>

                        </ul>
                    </div>
                </Col>

                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#096C86" }}>
                        <ul>
                            <li>Total users</li>

                        </ul>
                    </div>
                </Col>

                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#E9E7FD" }}>
                        <ul>
                            <li>Total users</li>

                        </ul>
                    </div>
                </Col>

            </Row>




        </Container >


    )
}

export default DashBoard