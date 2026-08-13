import { Col, Row, Typography } from 'antd'
import { useEffect } from 'react'
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
            <section style={{ background: 'linear-gradient(135deg, #312e81 0%, #4338CA 50%, #6d28d9 100%)' }}>
                <div className="container" data-aos="fade-up">
                    <Row>
                        <Col span={24}>
                            <Title className='text-center text-white pt-5'>Contact Us</Title>
                            <Paragraph className='text-white text-center pb-5 fs-5'>Have a question about your order, a product, or need help? Our support team is here for you.</Paragraph>
                        </Col>
                    </Row>
                </div>
            </section>
        </>
    )
}

export default Hero