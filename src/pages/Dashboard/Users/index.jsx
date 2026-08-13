import { useEffect, useState } from "react"
import { Col, Row, Typography, Table, Dropdown, Button, Modal, Form, Input, Select, message, Tag, Popconfirm } from "antd"
import { DeleteOutlined, EditOutlined, MoreOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import axios from "axios"

const { Title, Text } = Typography
const { Option } = Select

const initialState = { fullName: "", role: "", status: "" }
const Users = () => {

  const [documents, setDocuments] = useState([])
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


  // Get All Users
  useEffect(() => {
    setIsProcessing(true)
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/auth/users`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          setDocuments(data.users)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error("Something went wrong while fetching users")
      })
      .finally(() => {
        setIsProcessing(false)
      })

  }, [])


  // Show Modal or Open Modal Button
  const showModal = (_id) => {
    setIsModalOpen(true);
    const jwt = localStorage.getItem("token")

    axios.get(`${import.meta.env.VITE_API_URL}/auth/single/user/${_id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setState(data.singleUser)
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }

  // Handle Ok Button
  const handleOk = () => {
    setIsModalOpen(false);

    let { fullName, role, status } = state

    if (fullName === "" || role === "" || status === "") { return message.error("All fields are required") }

    const formData = { fullName, role, status }

    const jwt = localStorage.getItem("token")

    axios.patch(`${import.meta.env.VITE_API_URL}/auth/update-user-by-admin/${state._id}`, formData, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          setDocuments(prevUser => prevUser.map(user => user.uid === state.uid ? data.updatedUser : user))
        }
      })
      .catch((err) => {
        console.log(err)
        message.error("Something went wrong while updating a user")
      })

  };

  // Handle Cancel Button
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  // Delete User Button
  const deleteUser = (_id) => {

    const jwt = localStorage.getItem("token")

    axios.delete(`${import.meta.env.VITE_API_URL}/auth/delete-user-by-admin/${_id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) => {
        const { status, data } = res
        if (status === 200) {
          message.success(data.message)
          const filteredDocuments = documents.filter(item => item._id !== _id)
          setDocuments(filteredDocuments)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error("Something went wrong while deleteing a user")
      })

  }


  const columns = [
    { title: 'Email', dataIndex: 'email' },
    { title: 'Full Name', dataIndex: 'fullName' },
    { title: 'Role', dataIndex: 'role', render: text => <Tag color={text === 'customer' ? 'blue' : 'orange'} className="text-capitalize">{text}</Tag> },
    { title: 'Status', dataIndex: 'status', render: text => <Tag color={text === 'active' ? 'green' : 'red'} className="text-capitalize">{text}</Tag> },
    { title: 'Created At', dataIndex: 'createdAt', render: text => <Text className="text-capitalize">{dayjs(text).format("DD-MMM-YYYY, hh:mm:ss A")}</Text> },
    { title: 'Updated At', dataIndex: 'updatedAt', render: text => <Text className="text-capitalize">{dayjs(text).format("DD-MMM-YYYY, hh:mm:ss A")}</Text> },
    {
      title: 'Action',
      render: (_, record) => (
        <Dropdown menu={{
          items: [
            { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { showModal(record._id) } },
            { label: <Popconfirm title="Delete" description="Are you sure to delete this user?" onConfirm={() => deleteUser(record._id)} icon={<QuestionCircleOutlined />}>Delete</Popconfirm>, key: "delete", icon: <DeleteOutlined />, danger: true }
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
            <Title level={1} className="my-4 text-center">Users</Title>
            <div className="container">
              <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={documents} rowKey={(record) => record.uid} loading={isProcessing} />
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal Box will always be just before the closing fragment */}
      <Modal
        title="Edit User"
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
              <Form.Item label="Name" required>
                <Input size="large" value={state.fullName} name="fullName" onChange={handleChange} disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Role" required>
                <Select size="large" value={state.role} onChange={(value) => { setState({ ...state, role: value }) }}>
                  <Option value="customer">Customer</Option>
                  <Option value="superAdmin">Super Admin</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Status" required>
                <Select size="large" value={state.status} onChange={(value) => { setState({ ...state, status: value }) }}>
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal >
    </>
  )
}

export default Users