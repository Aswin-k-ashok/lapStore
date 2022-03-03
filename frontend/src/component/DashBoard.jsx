import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import '../component/component_css/DashBoard.css'
import {
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
    Legend,
    Tooltip,
    CartesianGrid,
    Line,
    LineChart,
    PieChart,
    Pie,
    Sector,
    Cell,
} from 'recharts'



function DashBoard() {
    const [userCount, setUserCount] = useState()
    const [productCount, setProductCount] = useState()
    const [orderCount, setOrderCount] = useState()
    const [profit, setProfit] = useState()
    const [block, setBlock] = useState()
    const [data, setData] = useState({ categoryReport: null })
    const [orderData, setOrderData] = useState([])
    const [userData, setUserData] = useState([])

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }



    useEffect(() => {

        const count = async () => {
            const { data: countUser } = await axios.get('/api/dashboard/user')
            const { data: countProduct } = await axios.get('/api/dashboard/product')
            const { data: countOrder } = await axios.get('/api/dashboard/order')
            const { data: productProfit } = await axios.get('/api/dashboard/profit')
            const { data: blockedUser } = await axios.get('/api/dashboard/userblock')
            const { data: orderData } = await axios.get('/api/orders/report')

            setUserCount(countUser)
            setProductCount(countProduct)
            setOrderCount(countOrder)
            setProfit(productProfit)
            setBlock(blockedUser)
            setOrderData(orderData)
        }
        count()
    }, [])

    console.log(orderData)
    const orderSample = [
        {
            name: 'year',
            total: orderData && orderData.totalPrice,
            paid: orderData && orderData.paidprice,
            unpaid: orderData && orderData.unpaid,
        }
    ]


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
                            <li>Blocked users</li>
                            <h1>{block}</h1>
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

            <Row>
                <Col>
                    <Container>
                        <h3 className="text-center pt-4">Monthly Sales</h3>
                        <ResponsiveContainer width="75%" height={400} className="m-auto">
                            <BarChart data={orderSample}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="total" fill="#8884d8" />
                                <Bar dataKey="paid" fill="#82ca9d" />
                                <Bar dataKey="unpaid" fill="#e63d00" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Container>
                </Col>
                <Col>
                </Col>
            </Row>




        </Container >


    )
}

export default DashBoard