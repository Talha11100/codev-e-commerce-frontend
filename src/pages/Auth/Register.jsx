import { useEffect, useState } from "react"
import { Col, Row, Form, Input, Button, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import Aos from "aos"

const { Title, Paragraph } = Typography
const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }
const Register = () => {

    useEffect(() => {
        Aos.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out"
        })
    }, [])

    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState(initialState)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        let { fullName, email, password, confirmPassword } = state

        if (fullName.length < 3) { return message.error("Please enter your full name") }
        if (!email) { return message.error("Please enter your email address") }
        if (password.length < 6) { return message.error("Password must be of at least 6 characters") }
        if (password !== confirmPassword) { return message.error("Password does not match") }
        fullName = fullName.trim()

        const formData = { fullName, email, password, confirmPassword }
        setIsProcessing(true)

        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData)
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    message.success(data.message)
                    navigate("/auth/login")
                }
            })
            .catch((error) => {
                console.error(error)
                if (error.response) {
                    const { status, data } = error.response
                    if (status === 401) {
                        message.error(data.message)
                    }
                } else {
                    message.error("Something went wrong while creating a new user")
                }
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <div id="main">
            <div className="card p-3 m-3" data-aos="zoom-in">
                <div className="my-3">
                    <Title level={1} className="text-center mb-0">Register</Title>
                    <Paragraph className="text-center mb-0 pt-2">Already have an account? <Link to="/auth/login" className="text-decoration-none">Login</Link></Paragraph>
                </div>
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Full Name" required>
                                <Input size="large" placeholder="Enter your full name" name="fullName" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Email" required>
                                <Input size="large" placeholder="Enter your email address" name="email" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Password" required>
                                <Input.Password size="large" placeholder="Enter your password" name="password" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Confirm Password" required>
                                <Input.Password size="large" placeholder="Enter your password again" name="confirmPassword" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item className="mb-0">
                                <Button size="large" type="primary" htmlType="submit" block loading={isProcessing} onClick={handleSubmit}>Register</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default Register