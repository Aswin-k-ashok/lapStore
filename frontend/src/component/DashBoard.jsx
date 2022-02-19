import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import '../component/component_css/DashBoard.css'



function DashBoard() {
    const [userCount, setUserCount] = useState()
    const [productCount, setProductCount] = useState()

    useEffect(() => {

        const count = async () => {
            const { data: countUser } = await axios.get('/api/dashboard/user')
            const { data: countProduct } = await axios.get('/api/dashboard/product')

            setUserCount(countUser)
            setProductCount(countProduct)
        }
        count()
    }, [])


    return (
        <Container className=''>
            <Row className='bg-secondary rounded'>
                <h1>Dash Board</h1>
                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#FFE5CB" }}>
                        <ul>
                            <li>Total Users</li>
                            <h1>{userCount}</h1>

                        </ul>
                    </div>

                    <div className="card" style={{ backgroundColor: "#E9E7FD" }}>
                        <ul>
                            <li>Total Orders</li>
                            <h1></h1>

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

                    <div className="card" style={{ backgroundColor: "#FED2E2" }}>
                        <ul>
                            <li>Total Categories</li>

                        </ul>
                    </div>
                </Col>

                <Col lg={4} md={6} sm={12}>

                    <div className="card" style={{ backgroundColor: "#096C86" }}>
                        <ul>
                            <li>Total users</li>

                        </ul>
                    </div>

                    <div className="card" style={{ backgroundColor: "#E9E7FD" }}>
                        <ul>
                            <li>Total users</li>

                        </ul>
                    </div>
                </Col>


            </Row>


        </Container>


    )
}

export default DashBoard