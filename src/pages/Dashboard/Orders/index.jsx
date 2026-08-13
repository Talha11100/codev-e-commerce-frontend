import { useEffect, useState } from "react"
import { Col, Row, Typography, Table, Dropdown, Button, Modal, Form, Input, Select, message, Tag, Popconfirm } from "antd"
import { DeleteOutlined, EditOutlined, EyeOutlined, MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import { useAuth } from "@/context/Auth"
import dayjs from "dayjs"
import axios from "axios"

const { Title, Text } = Typography
const { Option } = Select

const initialState = { id: "", status: "" }
const Orders = () => {

  const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

  const handleViewProducts = (order) => {
    setSelectedOrder(order)
    setIsViewModalOpen(true)
  }

  const { user } = useAuth()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


  // Get All Orders
  useEffect(() => {
    setIsProcessing(true)
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/orders/all`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setDocuments(data.orders)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error("Something went wrong while fetching orders")
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }, [])


  // Show Modal or Open Modal Button
  const showModal = (id) => {
    setIsModalOpen(true);
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/orders/single/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setState(data.order)
        }
      })
      .catch((error) => {
        console.error(error)
        message.error("Something went wrong while fetching the order")
      })

  }

  // Handle Ok Button
  const handleOk = () => {
    setIsModalOpen(false);

    let { id, status } = state

    if (id === "" || status === "") { return message.error("All fields are required") }

    const formData = { id, status }

    const jwt = localStorage.getItem("token")

    axios.patch(`${import.meta.env.VITE_API_URL}/orders/update/${state.id}`, formData, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setDocuments(prevOrder => prevOrder.map(order => order.id === state.id ? data.updatedOrder : order))
        }
      })
      .catch((error) => {
        console.error(error)
        message.error("Something went wrong while updating an order")
      })

  };

  // Handle Cancel Button
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // Delete Order Button
  const deleteOrder = (id) => {

    const jwt = localStorage.getItem("token")

    axios.delete(`${import.meta.env.VITE_API_URL}/orders/delete/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          const filteredDocuments = documents.filter(item => item.id !== id)
          setDocuments(filteredDocuments)
        }
      })
      .catch((error) => {
        console.error(error)
        message.error("Something went wrong while deleteing an order")
      })

  }


  const columns = [
    { title: 'Order ID', dataIndex: 'id', render: text => <Text copyable>{text}</Text> },
    { title: 'Total Amount', dataIndex: 'totalAmount', render: text => <Text className="fw-bold text-success">Rs. {text?.toLocaleString()}</Text> },
    { title: 'Shipping Address', dataIndex: 'shippingAddress', render: text => <Text>{text}</Text> },
    { title: 'Status', dataIndex: 'status', render: text => <Tag color={text === "pending" ? "warning" : text === "processing" ? "processing" : text === "shipped" ? "blue" : text === "delivered" ? "green" : text === "cancelled" ? "error" : "default"} className="text-uppercase">{text}</Tag> },
    { title: 'Payment', dataIndex: 'paymentStatus', render: text => <Tag color={text === 'paid' ? 'green' : (text === 'failed' ? 'red' : 'orange')} className="text-uppercase">{text}</Tag> },
    { title: 'Created Time', dataIndex: 'createdAt', render: text => <Text className="text-capitalize">{dayjs(text).format("DD-MMM-YYYY, hh:mm A")}</Text> }
    // Add Product ID and name and quantity from Products Array
  ]

  if (user.role === "superAdmin") {
    columns.push({
      title: 'Action',
      render: (_, record) => (
        <div className="d-flex align-items-center gap-2">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewProducts(record)}
            title="View Products"
          />
          <Dropdown menu={{
            items: [
              { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { showModal(record.id) } },
              { label: <Popconfirm title="Delete" description="Are you sure to delete this order?" onConfirm={() => deleteOrder(record.id)} icon={<QuestionCircleOutlined />}>Delete</Popconfirm>, key: "delete", icon: <DeleteOutlined />, danger: true }
            ]
          }} trigger={['click']}>
            <Button className="border-0" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      )
    })
  }


  return (
    <>
      <div className="container">
        <Row>
          <Col span={24}>
            <Title level={1} className="my-4 text-center">Orders</Title>
            <div className="container">
              <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={documents} rowKey="id" loading={isProcessing} />
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal Box will always be just before the closing fragment */}
      <Modal
        title="Update Order Status"
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
          <Row>
            <Col span={24}>
              <Form.Item label="Order ID" required>
                <Input size="large" value={state.id} name="id" onChange={handleChange} disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Status" required>
                <Select size="large" value={state.status} onChange={(value) => { setState({ ...state, status: value }) }}>
                  <Option value="pending">Pending</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="shipped">Shipped</Option>
                  <Option value="delivered">Delivered</Option>
                  <Option value="cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >

      {/* View Order Products Modal */}
      <Modal
        title={`Order Details (ID: ${selectedOrder?.id})`}
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>
        ]}
        width={700}
        centered
      >
        {selectedOrder && (
          <div className="p-2">
            <Row gutter={[16, 16]} className="mb-4">
              <Col xs={24} sm={12}>
                <Text type="secondary">Status: </Text>
                <Tag color={selectedOrder.status === "pending" ? "warning" : selectedOrder.status === "processing" ? "processing" : selectedOrder.status === "shipped" ? "blue" : selectedOrder.status === "delivered" ? "green" : selectedOrder.status === "cancelled" ? "error" : "default"} className="text-uppercase">
                  {selectedOrder.status}
                </Tag>
              </Col>
              <Col xs={24} sm={12}>
                <Text type="secondary">Payment Status: </Text>
                <Tag color={selectedOrder.paymentStatus === 'paid' ? 'green' : (selectedOrder.paymentStatus === 'failed' ? 'red' : 'orange')} className="text-uppercase">
                  {selectedOrder.paymentStatus}
                </Tag>
              </Col>
              <Col xs={24}>
                <Text type="secondary">Shipping Address: </Text>
                <Text>{selectedOrder.shippingAddress || "N/A"}</Text>
              </Col>
              <Col xs={24}>
                <Text type="secondary">Total Amount: </Text>
                <Text className="fw-bold text-success fs-5">Rs. {selectedOrder.totalAmount?.toLocaleString()}</Text>
              </Col>
            </Row>

            <Typography.Title level={5} className="mb-2">Ordered Products</Typography.Title>
            <Table
              dataSource={selectedOrder.products}
              columns={[
                { title: 'Product ID', dataIndex: 'productId', render: text => <Text copyable>{text}</Text> },
                { title: 'Product Name', dataIndex: 'name', render: text => <Text className="fw-semibold">{text}</Text> },
                { title: 'Price', dataIndex: 'price', render: text => <Text>Rs. {text?.toLocaleString()}</Text> },
                { title: 'Quantity', dataIndex: 'quantity', render: text => <Text>{text}</Text> },
                { title: 'Total', render: (_, item) => <Text className="fw-bold">Rs. {(item.price * item.quantity)?.toLocaleString()}</Text> }
              ]}
              pagination={false}
              rowKey="productId"
              size="small"
              bordered
            />
          </div>
        )}
      </Modal>
    </>
  )
}

export default Orders