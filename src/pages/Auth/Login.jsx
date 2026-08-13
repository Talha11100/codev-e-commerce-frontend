import { useEffect, useState } from "react"
import { Col, Row, Form, Input, Button, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/Auth"
import axios from "axios"
import Aos from "aos"

const { Title, Paragraph } = Typography
const initialState = { email: "", password: "" }
const Login = () => {

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    })
  },[])

  const [isProcessing, setIsProcessing] = useState(false)
  const [state, setState] = useState(initialState)
  const navigate = useNavigate()
  const {readProfile} = useAuth()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
  const handleSubmit = () => {
    let { email, password } = state

    const userData = { email, password }
    setIsProcessing(true)

    axios.post("http://localhost:8000/auth/login", userData)
      .then((res) => {
        const { status, data } = res
        if (status === 201) {
          localStorage.setItem("token", data.token)
          message.success(data.message)
          readProfile(data.token)
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
          message.error("Something went wrong while login")
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
          <Title level={1} className="text-center mb-0">Login</Title>
          <Paragraph className="text-center mb-0 pt-2">Don't have an account? <Link to="/auth/register" className="text-decoration-none">Register</Link></Paragraph>
        </div>
        <Form layout="vertical">
          <Row>
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
              <Form.Item className="mb-0">
                <Button size="large" type="primary" htmlType="submit" block loading={isProcessing} onClick={handleSubmit}>Login</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Login