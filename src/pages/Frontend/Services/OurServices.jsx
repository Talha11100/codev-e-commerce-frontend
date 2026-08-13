import { Col, Row, Typography } from 'antd'
import Aos from 'aos';
import { useEffect } from 'react';
import { FaShieldHalved, FaArrowsRotate, FaTruck, FaCartShopping, FaBoxOpen, FaHandshake, FaList, FaMapLocationDot, FaHeadset, FaStore, FaCreditCard, FaGift } from "react-icons/fa6";

const { Title, Paragraph } = Typography

const OurServices = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    })
  }, [])
  return (
    <>
      <div className="container mb-5">
        <Row>
          <Col span={24}>
            <Title level={1} style={{ color: '#4338CA' }} className='pt-5' data-aos="fade-up">Our Services</Title>
          </Col>
        </Row>

        <Row gutter={[24, 36]}>
          <Col xs={24} md={12} lg={8}>
            <div className="card shadow border-0 p-4" data-aos="fade-up">
              <FaList size={40} color="#4338CA" className='mb-3' />
              <Title level={3} className='mb-0'>Product Catalog</Title>
              <Paragraph className='fs-6'>Browse thousands of products across electronics, fashion, home & living, sports, and more.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="card shadow border-0 p-4" data-aos="fade-up">
              <FaMapLocationDot size={40} color="#4338CA" className='mb-3' />
              <Title level={3} className='mb-0'>Order Tracking</Title>
              <Paragraph className='fs-6'>Real-time order tracking so you always know where your package is, from checkout to doorstep.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="card shadow border-0 p-4" data-aos="fade-up">
              <FaHeadset size={40} color="#4338CA" className='mb-3' />
              <Title level={3} className='mb-0'>Customer Support</Title>
              <Paragraph className='fs-6'>24/7 live chat, email, and phone support to help you with orders, returns, and product queries.</Paragraph>
            </div>
          </Col>
        </Row>


        <div className="my-4">
          <Row gutter={[24, 36]}>
            <Col xs={24} md={12} lg={8}>
              <div className="card shadow border-0 p-4" data-aos="fade-up">
                <FaStore size={40} color="#4338CA" className='mb-3' />
                <Title level={3} className='mb-0'>Seller Portal</Title>
                <Paragraph className='fs-6'>Easily list your products and reach thousands of buyers through our intuitive seller dashboard.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <div className="card shadow border-0 p-4" data-aos="fade-up">
                <FaCreditCard size={40} color="#4338CA" className='mb-3' />
                <Title level={3} className='mb-0'>Secure Checkout</Title>
                <Paragraph className='fs-6'>Multiple payment methods including credit cards, bank transfer, JazzCash, and cash on delivery.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <div className="card shadow border-0 p-4" data-aos="fade-up">
                <FaGift size={40} color="#4338CA" className='mb-3' />
                <Title level={3} className='mb-0'>Loyalty Rewards</Title>
                <Paragraph className='fs-6'>Earn points on every purchase and redeem them for discounts, free shipping, and exclusive offers.</Paragraph>
              </div>
            </Col>
          </Row>
        </div>


        {/* Third Row of Services */}
        <div className="my-4">
          <Row gutter={[24, 36]}>
            <Col xs={24} md={12} lg={8}>
              <div className="card shadow border-0 p-4" data-aos="fade-up">
                <FaShieldHalved size={40} color="#4338CA" className='mb-3' />
                <Title level={3} className='mb-0'>Buyer Protection</Title>
                <Paragraph className='fs-6'>Shop with confidence. Every purchase is protected — if something goes wrong, we've got you covered with a full refund guarantee.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <div className="card shadow border-0 p-4" data-aos="fade-up">
                <FaArrowsRotate size={40} color="#4338CA" className='mb-3' />
                <Title level={3} className='mb-0'>Hassle-Free Returns</Title>
                <Paragraph className='fs-6'>Changed your mind? Return any product within 7 days, no questions asked. We make the return process simple and stress-free.</Paragraph>
              </div>
            </Col>
            <Col xs={24} md={12} lg={8}>
              <div className="card shadow border-0 p-4" data-aos="fade-up">
                <FaTruck size={40} color="#4338CA" className='mb-3' />
                <Title level={3} className='mb-0'>Express Delivery</Title>
                <Paragraph className='fs-6'>Get your orders delivered in as little as 24 hours with our express delivery service available in major cities across Pakistan and in other countries as well.</Paragraph>
              </div>
            </Col>
          </Row>
        </div>


        {/* How It Works Section */}
        <Row>
          <Col span={24}>
            <Title level={2} style={{ color: '#4338CA' }} className='pt-5 pb-3' data-aos="fade-up">How It Works</Title>
          </Col>
        </Row>
        <Row gutter={[24, 36]} className='mb-5'>
          <Col xs={24} md={12} lg={6}>
            <div className="card shadow border-0 p-4 text-center" data-aos="fade-up">
              <FaCartShopping size={45} color="#4338CA" className='mx-auto mb-3' />
              <Title level={4} className='mb-1'>1. Browse & Select</Title>
              <Paragraph className='fs-6 mb-0'>Explore our wide range of products and add your favourites to the cart.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div className="card shadow border-0 p-4 text-center" data-aos="fade-up">
              <FaShieldHalved size={45} color="#4338CA" className='mx-auto mb-3' />
              <Title level={4} className='mb-1'>2. Secure Checkout</Title>
              <Paragraph className='fs-6 mb-0'>Pay safely using your preferred method — cards, JazzCash, EasyPaisa, or COD.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div className="card shadow border-0 p-4 text-center" data-aos="fade-up">
              <FaBoxOpen size={45} color="#4338CA" className='mx-auto mb-3' />
              <Title level={4} className='mb-1'>3. Order Packed</Title>
              <Paragraph className='fs-6 mb-0'>Your order is carefully picked, quality-checked, and packed by our warehouse team.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <div className="card shadow border-0 p-4 text-center" data-aos="fade-up">
              <FaTruck size={45} color="#4338CA" className='mx-auto mb-3' />
              <Title level={4} className='mb-1'>4. Fast Delivery</Title>
              <Paragraph className='fs-6 mb-0'>Your package is dispatched and delivered right to your doorstep, tracked every step.</Paragraph>
            </div>
          </Col>
        </Row>

      </div>



      {/* CTA Banner */}
      <section style={{ background: 'linear-gradient(135deg, #312e81 0%, #4338CA 50%, #6d28d9 100%)' }}>
        <div className="container" data-aos="fade-up">
          <Row>
            <Col span={24}>
              <div className='text-center py-5'>
                <FaHandshake size={55} color="#F59E0B" className='mb-3' />
                <Title level={1} className='text-white'>Become a Seller Today</Title>
                <Paragraph className='fs-5 text-white'>Join thousands of sellers already growing their business on ShopNest. List your products for free and reach millions of buyers.</Paragraph>
                <button className='btn btn-warning btn-lg fw-semibold px-5'>Start Selling</button>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

export default OurServices