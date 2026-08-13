import { Col, Row, Typography } from 'antd'
import Aos from 'aos'
import { useEffect } from 'react'

const { Title } = Typography

const Map = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    return (
        <>
            <div className="container my-4" data-aos="fade-up">
                <Row>
                    <Col span={24}>
                        <Title level={2} className='text-center text-primary pb-2 pt-5'>Find Us On Map</Title>
                    </Col>
                    <Col span={24}>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.089128545836!2d73.08623897469153!3d31.411670352506036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922681d444b32e1%3A0xc3887a0e53e91f7!2sSaylani%20Mass%20IT%20Training%20FSD!5e0!3m2!1sen!2s!4v1784019894480!5m2!1sen!2s" width="100%" height="500" allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Map