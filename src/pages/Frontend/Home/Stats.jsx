import { useEffect } from 'react';
import { Col, Row, Typography } from 'antd'
import { FaUserGroup, FaBookOpen, FaLocationDot, FaHandHoldingDollar, FaGraduationCap, FaHeartPulse, FaHandHoldingHeart } from "react-icons/fa6";
import Aos from 'aos';
import * as RC from "react-countup";

const { Title, Paragraph } = Typography
const CountUp = RC.default.default;

const Stats = () => {

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    return (
        <>
            <div className="container">
                <Row gutter={[24, 36]}>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaUserGroup size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 py-2'>
                                <CountUp end={300} duration={3} enableScrollSpy scrollSpyOnce />K+
                            </Title>
                            <Paragraph className='fs-6'>Happy Customers</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaBookOpen size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 py-2'>
                                <CountUp end={12000} duration={3} enableScrollSpy scrollSpyOnce />+
                            </Title>
                            <Paragraph className='fs-6'>Products Listed</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaLocationDot size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 py-2'>
                                <CountUp end={50} duration={3} enableScrollSpy scrollSpyOnce />+
                            </Title>
                            <Paragraph className='fs-6'>Cities Delivered</Paragraph>
                        </div>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <div className="card p-4 shadow text-center border-0" data-aos="fade-up">
                            <FaHandHoldingDollar size={50} color="#4338CA" className='mx-auto' />
                            <Title level={1} className='mb-0 py-2'>
                                <CountUp end={150} duration={3} enableScrollSpy scrollSpyOnce />K+
                            </Title>
                            <Paragraph className='fs-6'>Orders Completed</Paragraph>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Stats