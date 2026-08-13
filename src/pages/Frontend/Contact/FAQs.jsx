import { useEffect } from 'react'
import { Col, Form, Input, Row, Typography, Button } from 'antd'
import Aos from 'aos'

const { Title, Paragraph } = Typography

const FAQs = () => {

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
                <Row>
                    <Col xs={24} lg={12}>
                        <section className='pt-5'>
                            <div id='contact' className="container">
                                <div className="card border-0 shadow p-4" data-aos="fade-up">
                                    <Row>
                                        <Col span={24}>
                                            <Title level={2} className='text-primary py-3'>Send Us a Message</Title>
                                        </Col>
                                    </Row>
                                    <Form layout='vertical'>
                                        <Row gutter={[15]}>
                                            <Col span={12}>
                                                <Form.Item label="Full Name" required>
                                                    <Input type="text" placeholder='Enter your full name' size='large' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item label="Phone No." required>
                                                    <Input type="text" placeholder='03XX - XXXXXXX' size='large' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Email" required>
                                                    <Input type="text" placeholder='Enter your email address' size='large' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Subject" required>
                                                    <Input type="text" placeholder='Enter your subject name' size='large' />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Form.Item label="Message" required>
                                                    <Input.TextArea rows={13} placeholder='Write your message here' style={{ resize: "none" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={24}>
                                                <Button type='primary' size='large' style={{ marginBottom: "12px" }}>Send Message</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </section>
                    </Col>


                    <Col xs={24} lg={12}>
                        <section>
                            <div className="container pt-5">
                                <div className="card p-4 border-0 shadow" data-aos="fade-up">
                                    <Title level={3} className='text-primary'>Contact Information</Title>
                                    <Title level={5} className='mb-0'>Address:</Title>
                                    <Paragraph className='mb-0 pb-1 fs-6'>Plot 14, DHA Phase 6, Lahore, Pakistan</Paragraph>
                                    <Title level={5} className='mb-0'>Phone:</Title>
                                    <Paragraph className='mb-0 pb-1 fs-6'>+92 300 000 0000</Paragraph>
                                    <Title level={5} className='mb-0'>Email:</Title>
                                    <Paragraph className='mb-0 pb-1 fs-6'>support@shopnest.pk</Paragraph>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container pt-5">
                                <div className="card p-4 border-0 shadow" data-aos="fade-up">
                                    <Title level={3} className='text-primary'>Office Hours</Title>
                                    <Paragraph className='fs-6'>Monday - Saturday: 9:00 AM - 9:00 PM</Paragraph>
                                    <Paragraph className='fs-6'>Sunday: 10:00 AM - 6:00 PM</Paragraph>
                                    <Paragraph className='fs-6'>Public Holidays: 12:00 PM - 5:00 PM</Paragraph>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="container pt-5">
                                <div className="card p-4 border-0 shadow" data-aos="fade-up">
                                    <Title level={3} className='text-primary'>24/7 Customer Support</Title>
                                    <Paragraph className='fs-6'>Need help with an order or a return? Our dedicated support team is available around the clock.</Paragraph>
                                    <div>
                                        <button className='btn btn-outline-primary'> Chat Now</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default FAQs