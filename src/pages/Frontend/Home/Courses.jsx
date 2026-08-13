import { Col, Row, Typography } from 'antd'
import { useEffect } from 'react';
import { FaLaptopCode } from "react-icons/fa6";
import Aos from 'aos';

const { Title, Paragraph } = Typography

const Courses = () => {
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
                        <Title className='text-center py-5' data-aos="fade-up">Shop by Category</Title>
                    </Col>
                </Row>

                <Row gutter={[24, 36]}>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card shadow p-4 text-center border-0" data-aos="fade-up">
                            <FaLaptopCode size={50} color="#4338CA" className='mx-auto py-2' />
                            <Title level={4} className=''>Electronics</Title>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card shadow p-4 text-center border-0" data-aos="fade-up">
                            <FaLaptopCode size={50} color="#4338CA" className='mx-auto py-2' />
                            <Title level={4} className=''>Fashion</Title>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card shadow p-4 text-center border-0" data-aos="fade-up">
                            <FaLaptopCode size={50} color="#4338CA" className='mx-auto py-2' />
                            <Title level={4} className=''>Home & Living</Title>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card shadow p-4 text-center border-0" data-aos="fade-up">
                            <FaLaptopCode size={50} color="#4338CA" className='mx-auto py-2' />
                            <Title level={4} className=''>Sports & Outdoors</Title>
                        </div>
                    </Col>
                </Row>
            </div>
            <section style={{ background: 'linear-gradient(135deg, #312e81 0%, #4338CA 50%, #6d28d9 100%)' }}>

                <div className="container mt-5">
                    <Row>
                        <Col span={24}>
                            <div className='text-center py-5' data-aos="fade-up">
                                <Title level={1} className='text-white'>Exclusive Deals Await You</Title>
                                <Paragraph className='fs-5 text-white'>Subscribe to our newsletter and be the first to know about flash sales, new arrivals, and special discounts.</Paragraph>
                                <button className='btn btn-warning btn-lg fw-semibold px-5'>Browse All Deals</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}

export default Courses