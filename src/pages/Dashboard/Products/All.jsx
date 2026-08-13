import { useEffect, useState } from "react"
import { Col, Row, Typography, Table, Dropdown, Button, Modal, Form, Input, Select, message, Popconfirm, Image, Tag } from "antd"
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import axios from "axios"

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const initialState = { name: "", price: "", stock: "", category: "", description: "", status: "" }
const All = () => {

    const [documents, setDocuments] = useState([])
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    // Get All Products
    useEffect(() => {
        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.get(`${import.meta.env.VITE_API_URL}/products/all`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    setDocuments(data.products)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while fetching products")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }, [])


    // Show Modal or Open Modal Button
    const showModal = (id) => {
        setIsModalOpen(true);
        setIsProcessing(true)

        const token = localStorage.getItem("token")

        axios.get(`${import.meta.env.VITE_API_URL}/products/single/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    setState(data.product)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while fetching product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Handle Ok Button
    const handleOk = () => {
        setIsModalOpen(false);

        let { id, uid, name, price, stock, category, description, status } = state

        if (name == "" || price == "" || stock == "" || category == "" || description == "" || status == "") {
            return message.error("All fields are required")
        }

        const formData = { id, uid, name, price, stock, category, description, status }

        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.patch(`${import.meta.env.VITE_API_URL}/products/update/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    message.success(data.message)
                    const updatedDocuments = documents.map(document => document.id === id ? data.updatedProduct : document)
                    setDocuments(updatedDocuments)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while updating a product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    };

    // Handle Cancel Button
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    // Delete User Button
    const deleteProduct = (id) => {
        setIsProcessing(true)
        const token = localStorage.getItem("token")

        axios.delete(`${import.meta.env.VITE_API_URL}/products/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const filteredDocuments = documents.filter(document => document.id !== id)
                    setDocuments(filteredDocuments)
                    message.success(data.message)
                }
            })
            .catch((error) => {
                console.error(error)
                message.error("Something went wrong while deleting a product")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }


    const columns = [
        { title: 'Image', dataIndex: 'imageURL', render: (text) => <Image src={text} alt="Product" width={64} height={64} style={{ borderRadius: "50%" }} /> },
        { title: 'Name', dataIndex: 'name', render: text => <Text className="text-capitalize">{text}</Text> },
        { title: 'Price', dataIndex: 'price', render: text => <Text className="text-capitalize">Rs. {text.toLocaleString()}</Text> },
        { title: 'Stock', dataIndex: 'stock', render: text => <Text className="text-capitalize">{text.toLocaleString()}</Text> },
        { title: "Status", dataIndex: "status", render: text => <Tag className="text-capitalize" color={text === "active" ? "green" : "red"}>{text}</Tag> },
        { title: 'Category', dataIndex: 'category', render: text => <Text className="text-capitalize">{text}</Text> },
        { title: 'Description', dataIndex: 'description', render: text => <Text className="text-capitalize">{text}</Text> },
        { title: 'Created Time', dataIndex: 'createdAt', render: text => <Text className="text-capitalize">{dayjs(text).format("DD-MMM-YYYY, hh:mm:ss A")}</Text> },
        {
            title: 'Action',
            render: (_, record) => (
                <Dropdown menu={{
                    items: [
                        { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { showModal(record.id) } },
                        { label: <Popconfirm title="Delete" description="Are you sure to delete this product?" onConfirm={() => deleteProduct(record.id)} icon={<QuestionCircleOutlined />}>Delete</Popconfirm>, key: "delete", icon: <DeleteOutlined />, danger: true }
                    ]
                }} trigger={['click']}>
                    <Button className="border-0" icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ]


    return (
        <>
            <div className="container">
                <Row>
                    <Col span={24}>
                        <Title level={1} className="my-4 d-flex justify-content-between align-items-center">All Products <Link to="/dashboard/products/add" className="text-decoration-none btn btn-primary"><PlusOutlined /> Add Product</Link></Title>
                        <div className="container">
                            <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={documents} rowKey="id" loading={isProcessing} />
                        </div>
                    </Col>
                </Row>
            </div>

            {/* Modal Box will always be just before the closing fragment */}
            <Modal
                title="Edit Product"
                closable={{ 'aria-label': 'Custom Close Button' }}
                confirmLoading={isProcessing}
                loading={false}
                centered={true}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                mask={{ enabled: true, blur: true }}
            >
                <Form layout="vertical" className="p-3">
                    <Row gutter={20}>
                        <Col span={24}>
                            <Form.Item label="Name" required>
                                <Input size="large" value={state.name} placeholder="Enter product name" name="name" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Price" required>
                                <Input type="number" size="large" value={state.price} placeholder="Enter product price" name="price" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Stock" required>
                                <Input type="number" size="large" value={state.stock} placeholder="Enter product stock" name="stock" onChange={handleChange} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Category" required>
                                <Select size="large" value={state.category} placeholder="Select a category" onChange={(value) => { setState({ ...state, category: value }) }}>
                                    <Option value="electronics">Electronics</Option>
                                    <Option value="glasses">Glasses</Option>
                                    <Option value="furnitures">Furnitures</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Status" required>
                                <Select size="large" value={state.status} placeholder="Select a status" onChange={(value) => { setState({ ...state, status: value }) }}>
                                    <Option value="active">Active</Option>
                                    <Option value="inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Description" required>
                                <TextArea rows={3} placeholder="Enter product description" value={state.description} name="description" onChange={handleChange} style={{ resize: "none" }}></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}

export default All