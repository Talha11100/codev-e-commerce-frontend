import { Col, Row, Typography } from 'antd'
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaLocationDot, FaEnvelope, FaPhone } from "react-icons/fa6";
import { Link } from 'react-router-dom';
const { Paragraph, Title } = Typography
const Copyright = () => {

    const year = new Date().getFullYear()

    return (
        <footer className='bg-primary'>
            <section>
                <div className="container pt-5">
                    <Row gutter={[36, 24]}>
                        <Col xs={24} md={12} lg={6}>
                            <Title level={2} className='text-warning'>ShopNest</Title>
                            <Paragraph className='text-white fs-6'>Your one-stop online marketplace for electronics, fashion, home & living, and much more. Shop smarter, save bigger — delivered right to your door.</Paragraph>
                            <div className='d-flex gap-3'>
                                <FaFacebookF size={20} color="#fcfcfc" />
                                <FaInstagram size={20} color="#fcfcfc" />
                                <FaYoutube size={20} color="#fcfcfc" />
                                <FaLinkedinIn size={20} color="#fcfcfc" />
                            </div>
                        </Col>
                        <Col xs={24} md={12} lg={6}>
                            <Title level={2} className='text-warning'>Links</Title>
                            <Paragraph className='text-white fs-6'> <Link to="/" className='text-white text-decoration-none'>Home</Link> </Paragraph>
                            <Paragraph className='text-white fs-6'> <Link to="/about" className='text-white text-decoration-none'>About</Link> </Paragraph>
                            <Paragraph className='text-white fs-6'> <Link to="/services" className='text-white text-decoration-none'>Services</Link> </Paragraph>
                            <Paragraph className='text-white fs-6'> <Link to="/contact" className='text-white text-decoration-none'>Contact</Link> </Paragraph>
                        </Col>
                        <Col xs={24} md={12} lg={6}>
                            <Title level={2} className='text-warning'>Categories</Title>
                            <Paragraph className='text-white fs-6'> <Link to="/" className='text-white text-decoration-none'>Electronics</Link> </Paragraph>
                            <Paragraph className='text-white fs-6'> <Link to="/" className='text-white text-decoration-none'>Fashion</Link> </Paragraph>
                            <Paragraph className='text-white fs-6'> <Link to="/" className='text-white text-decoration-none'>Home & Living</Link> </Paragraph>
                            <Paragraph className='text-white fs-6'> <Link to="/" className='text-white text-decoration-none'>Sports & Outdoors</Link> </Paragraph>
                        </Col>
                        <Col xs={24} md={12} lg={6}>
                            <Title level={2} className='text-warning'>Contact</Title>
                            <Paragraph className='text-white fs-6'><FaLocationDot size={16} color="#ffffff" /> Plot 14, DHA Phase 6, Lahore </Paragraph>
                            <Paragraph className='text-white fs-6'><FaPhone size={16} color="#ffffff" /> +92 300 000 0000 </Paragraph>
                            <Paragraph className='text-white fs-6'><FaEnvelope size={16} color="#ffffff" /> support@shopnest.pk </Paragraph>
                        </Col>
                    </Row>
                </div>
            </section>
            <section className='py-4'>
                <div className="container">
                    <hr className='text-white' />
                    <Row>
                        <Col span={24}>
                            <Paragraph className='mb-0 text-center text-white'>&copy;Copyright {year}. All Rights Reserved.</Paragraph>
                        </Col>
                    </Row>
                </div>
            </section>
        </footer>
    )
}

export default Copyright