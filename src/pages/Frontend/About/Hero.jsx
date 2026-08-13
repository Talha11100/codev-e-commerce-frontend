import { useEffect } from 'react'
import { Col, Row, Typography } from 'antd'
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
            <div className="container" >
                <Row>
                    <Col span={24}>
                        <Title level={1} className='text-primary pt-5' data-aos="fade-up">About ShopNest</Title>
                        <Paragraph className='fs-5' data-aos="fade-up">ShopNest is your one-stop online marketplace offering thousands of products across electronics, fashion, home & living, sports, and more. We are committed to delivering a premium shopping experience with unbeatable prices, fast shipping, and outstanding customer service.</Paragraph>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Title level={3} data-aos="fade-up">Our Mission</Title>
                        <Paragraph className='fs-5' data-aos="fade-up">To make quality products accessible to everyone by providing a safe, seamless, and affordable online shopping platform.</Paragraph>
                    </Col>
                    <Col span={24}>
                        <Title level={3} data-aos="fade-up">Our Vision</Title>
                        <Paragraph className='fs-5' data-aos="fade-up">To become the most trusted and customer-loved e-commerce destination across Pakistan and beyond.</Paragraph>
                    </Col>
                </Row>
                <Row gutter={[24, 24]} className="pb-5 pt-3">
                    <Col span={24}>
                        <Title level={2} className='text-primary pt-4 text-center' data-aos="fade-up">Why Choose ShopNest?</Title>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="card shadow border-0 p-4 text-center h-100" data-aos="fade-up">
                            <Title level={3}>Quality Products</Title>
                            <Paragraph className='fs-6'>We ensure that every item listed on our platform meets strict quality standards to provide you with the best.</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="card shadow border-0 p-4 text-center h-100" data-aos="fade-up">
                            <Title level={3}>Fast & Secure</Title>
                            <Paragraph className='fs-6'>Enjoy swift deliveries and secure payment gateways that keep your data and transactions safe.</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={8}>
                        <div className="card shadow border-0 p-4 text-center h-100" data-aos="fade-up">
                            <Title level={3}>24/7 Support</Title>
                            <Paragraph className='fs-6'>Our dedicated customer support team is always available to help you with any queries or concerns you might have.</Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Hero