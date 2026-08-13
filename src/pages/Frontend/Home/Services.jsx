import { useEffect } from 'react';
import { Col, Row, Typography } from 'antd'
import { FaGraduationCap, FaHeartPulse, FaHandHoldingHeart } from "react-icons/fa6";
import Aos from 'aos';

const { Title, Paragraph } = Typography

const Services = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out"
        })
    }, [])
    return (
        <>
            <div className="container my-5">
                <Row>
                    <Col span={24}>
                        <Title className='text-center py-5' data-aos="fade-up">Why Shop With Us</Title>
                    </Col>
                </Row>

                <Row gutter={[24, 36]}>
                    <Col xs={24} md={12} lg={8}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaGraduationCap size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 p-2'>Free Shipping</Title>
                            <Paragraph className='fs-6'>Enjoy free delivery on all orders above Rs. 2,000. Fast and reliable shipping nationwide.</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaHeartPulse size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 p-2'>Secure Payments</Title>
                            <Paragraph className='fs-6'>Shop with confidence using our 100% secure payment gateway and multiple payment options.</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={8}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaHandHoldingHeart size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 p-2'>Easy Returns</Title>
                            <Paragraph className='fs-6'>Not satisfied? Return any item within 7 days for a full refund — no questions asked.</Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Services