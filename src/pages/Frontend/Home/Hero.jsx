import { useEffect } from 'react'
import { Col, Row, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import Aos from 'aos'

const { Title, Paragraph } = Typography

const Hero = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out"
        })
    }, [])
    return (
        <>
            <div className="container mt-4" data-aos="fade-up">
                <Row>
                    <Col xs={24} lg={12} className='m-auto px-4'>
                        <Title level={1} className='mt-5' style={{ fontSize: "44px" }}>Shop Smarter with <span style={{ color: '#4338CA' }}>ShopNest</span></Title>
                        <Paragraph style={{ color: "#555", fontSize: "20px" }}>Discover thousands of products at unbeatable prices. Fast delivery, easy returns, and a seamless shopping experience — all in one place.</Paragraph>

                        <Space>
                            <Link to="/auth/login" className='btn btn-warning fw-semibold px-4'>Shop Now</Link>
                            <Link to="/auth/register" className='btn btn-outline-primary px-4'>Create Account</Link>
                        </Space>
                    </Col>
                    <Col xs={24} lg={12} className='py-5'>
                        <img src="/hero-pic.jpeg" alt="hero-pic" className='img-fluid rounded-4 shadow' style={{ height: "500px", objectFit: "cover" }} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Hero