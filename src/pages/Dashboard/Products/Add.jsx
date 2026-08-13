import { useEffect, useState } from "react"
import { Row, Col, Typography, Form, Input, Select, Button, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import Aos from "aos"
import axios from "axios"
import { EyeOutlined } from "@ant-design/icons"

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

const initialState = { name: "", price: "", stock: "", category: "", description: "" }

const Add = () => {

    useEffect(() => {
        Aos.init({
            duration: 1000,
            offset: 200,
            easing: "ease-in-out",
            delay: 100,
            once: true
        })
    }, [])

    const [state, setState] = useState(initialState)
    const [image, setImage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {

        let { name, price, stock, category, description } = state

        if (name === "" || price === "" || stock === "" || category === "" || description === "") { return message.error("All fields are required") }
        if (!image) { return message.error("Please select an image") }

        const product = { name, price, stock, category, description }

        const formData = new FormData()
        for (const key in product) { formData.append(key, product[key]) }

        formData.append("image", image)

        setIsProcessing(true)

        const token = localStorage.getItem("token")

        axios.post(`${import.meta.env.VITE_API_URL}/products/create`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    message.success(data.message)
                    setState(initialState)
                    setImage(null)
                    navigate("/dashboard/products")
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while creating a product")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">

                <div className="card shadow p-4 border-0" data-aos="zoom-in" style={{ width: "100%", maxWidth: "700px" }}>
                    <Row>
                        <Col span={24}>
                            <Title level={2} className="my-4 d-flex justify-content-between align-items-center">Add Products <Link to="/dashboard/products" className="text-decoration-none btn btn-primary"><EyeOutlined /> All Products</Link></Title>
                        </Col>
                    </Row>
                    <Form layout="vertical" className="p-3">
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Name" required>
                                    <Input size="large" placeholder="Enter product name" name="name" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Price" required>
                                    <Input type="number" size="large" placeholder="Enter product price" name="price" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Stock" required>
                                    <Input type="number" size="large" placeholder="Enter product stock" name="stock" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Category" required>
                                    <Select size="large" placeholder="Select a category" onChange={(value) => { setState({ ...state, category: value }) }}>
                                        <Option value="electronics">Electronics</Option>
                                        <Option value="glasses">Glasses</Option>
                                        <Option value="furnitures">Furnitures</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Description" required>
                                    <TextArea rows={6} placeholder="Enter product description" name="description" onChange={handleChange} style={{ resize: "none" }}></TextArea>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Image" required>
                                    <input type="file" name="image" className="form-control" onChange={(e) => { setImage(e.target.files[0]) }} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Button type="primary" htmlType="submit" className="mt-4" size="large" block loading={isProcessing} onClick={handleSubmit}>Add Product</Button>
                            </Col>
                        </Row>
                    </Form>

                </div>

            </div>
        </>
    )
}

export default Add