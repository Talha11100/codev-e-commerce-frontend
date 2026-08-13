import { useState } from "react"
import { Typography, Button, Modal, Form, Input, message, Image, Row, Col, Card, Empty, Space } from "antd"
import { ShoppingCartOutlined, DeleteOutlined, PlusOutlined, MinusOutlined, CreditCardOutlined } from "@ant-design/icons"
import { useAuth } from "@/context/Auth"
import { Link } from "react-router-dom"
import axios from "axios"

const { Title, Text } = Typography
const { TextArea } = Input

const Cart = () => {
    const { cart, updateQuantity, removeFromCart } = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [shippingAddress, setShippingAddress] = useState("")
    const [checkoutQty, setCheckoutQty] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)

    // Handle Open Checkout Modal
    const handleOpenCheckout = (item) => {
        setSelectedItem(item)
        setCheckoutQty(item.quantity)
        setShippingAddress("")
        setIsModalOpen(true)
    }

    // Handle Cancel Checkout
    const handleCancel = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
    }

    // Handle Place Order
    const handlePlaceOrder = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            return message.error("Please login to complete your order")
        }

        if (!shippingAddress.trim()) {
            return message.error("Please enter a shipping address")
        }

        const qty = Number(checkoutQty)
        if (!qty || qty < 1) {
            return message.error("Please enter a valid quantity")
        }

        if (qty > selectedItem.stock) {
            return message.error(`Quantity cannot exceed available stock (${selectedItem.stock})`)
        }

        const orderData = {
            products: [{
                productId: selectedItem.id,
                name: selectedItem.name,
                quantity: qty,
                price: selectedItem.price
            }],
            totalAmount: selectedItem.price * qty,
            shippingAddress
        }

        setIsProcessing(true)

        axios.post("http://localhost:8000/orders/create", orderData, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                const { status, data } = res
                if (status === 200 || status === 201) {
                    message.success(data.message || "Order placed successfully!")
                    // Remove product from cart upon checkout success
                    removeFromCart(selectedItem.id)
                    setIsModalOpen(false)
                }
            })
            .catch((err) => {
                console.error(err)
                message.error(err.response?.data?.message || "Something went wrong while placing order")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    // Increment qty
    const handleIncrement = (item) => {
        if (item.quantity >= item.stock) {
            return message.warning(`Cannot exceed available stock (${item.stock})`)
        }
        updateQuantity(item.id, item.quantity + 1)
    }

    // Decrement qty
    const handleDecrement = (item) => {
        if (item.quantity <= 1) {
            return
        }
        updateQuantity(item.id, item.quantity - 1)
    }

    return (
        <main style={{ backgroundColor: "#f4f6f8", minHeight: "80vh" }}>
            <div className="container py-5">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <ShoppingCartOutlined style={{ fontSize: "32px", color: "#4338CA" }} />
                    <Title level={2} style={{ margin: 0, color: "#4338CA" }}>Your Shopping Cart</Title>
                </div>

                {!cart || cart.length === 0 ? (
                    <Card style={{ borderRadius: 12, padding: "40px 0" }}>
                        <Empty
                            description={
                                <span className="fs-5 text-secondary">
                                    Your cart is currently empty.
                                </span>
                            }
                        >
                            <Link to="/products">
                                <Button type="primary" size="large">Shop Now</Button>
                            </Link>
                        </Empty>
                    </Card>
                ) : (
                    <Row gutter={[24, 24]}>
                        {/* Cart Items List */}
                        <Col xs={24} lg={16}>
                            <Space orientation="vertical" style={{ width: "100%" }} size={16}>
                                {cart.map((item) => (
                                    <Card
                                        key={item.id}
                                        hoverable
                                        style={{ borderRadius: 12 }}
                                    >
                                        <Row gutter={[16, 16]} align="middle">
                                            {/* Product Image */}
                                            <Col xs={24} sm={6} md={4} className="text-center">
                                                <Image
                                                    src={item.imageURL}
                                                    alt={item.name}
                                                    width={80}
                                                    height={80}
                                                    style={{ objectFit: "cover", borderRadius: 8 }}
                                                />
                                            </Col>

                                            {/* Product Details */}
                                            <Col xs={24} sm={10} md={10}>
                                                <Title level={5} style={{ margin: 0 }}>{item.name}</Title>
                                                <Text type="secondary" className="text-capitalize">{item.category}</Text>
                                                <div className="mt-1">
                                                    <Text type="secondary">Stock: {item.stock}</Text>
                                                </div>
                                            </Col>

                                            {/* Quantity Selector */}
                                            <Col xs={12} sm={4} md={5} className="text-center">
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <Button
                                                        type="text"
                                                        shape="circle"
                                                        icon={<MinusOutlined />}
                                                        onClick={() => handleDecrement(item)}
                                                        disabled={item.quantity <= 1}
                                                    />
                                                    <span className="fw-semibold fs-5 px-2">{item.quantity}</span>
                                                    <Button
                                                        type="text"
                                                        shape="circle"
                                                        icon={<PlusOutlined />}
                                                        onClick={() => handleIncrement(item)}
                                                        disabled={item.quantity >= item.stock}
                                                    />
                                                </div>
                                            </Col>

                                            {/* Subtotal & Actions */}
                                            <Col xs={12} sm={4} md={5} className="text-end">
                                                <div className="fw-semibold text-info fs-5 mb-2">
                                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                                </div>
                                                <div className="d-flex justify-content-end gap-2">
                                                    <Button
                                                        type="primary"
                                                        onClick={() => handleOpenCheckout(item)}
                                                    >
                                                        Checkout
                                                    </Button>
                                                    <Button
                                                        type="text"
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => removeFromCart(item.id)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                            </Space>
                        </Col>

                        {/* Cart Summary Panel */}
                        <Col xs={24} lg={8}>
                            <Card style={{ borderRadius: 12, borderTop: "4px solid #F59E0B" }}>
                                <Title level={4}>Cart Summary</Title>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <Text type="secondary">Total Items</Text>
                                    <Text className="fw-semibold">
                                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                    </Text>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <Text type="secondary">Total Products</Text>
                                    <Text className="fw-semibold">{cart.length}</Text>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <Text className="fs-5 fw-semibold">Grand Total</Text>
                                    <Text className="fs-4 fw-bold text-primary">
                                        Rs. {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()}
                                    </Text>
                                </div>
                                <Text type="secondary" className="d-block text-center mb-3">
                                    * Checkout products individually from the list to place respective orders.
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                )}
            </div>

            {/* Checkout Modal */}
            <Modal
                title={
                    <span className="d-flex align-items-center gap-2">
                        <CreditCardOutlined /> Checkout Product
                    </span>
                }
                centered
                open={isModalOpen}
                onOk={handlePlaceOrder}
                onCancel={handleCancel}
                confirmLoading={isProcessing}
                okText="Place Order"
            >
                {selectedItem && (
                    <Form layout="vertical" className="pt-3">
                        <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                            <div className="d-flex align-items-center gap-3">
                                <Image
                                    src={selectedItem.imageURL}
                                    alt={selectedItem.name}
                                    width={48}
                                    height={48}
                                    style={{ objectFit: "cover", borderRadius: 4 }}
                                />
                                <div>
                                    <div className="fw-semibold">{selectedItem.name}</div>
                                    <Text type="secondary">
                                        Rs. {selectedItem.price.toLocaleString()} x {checkoutQty}
                                    </Text>
                                </div>
                            </div>
                            <div className="fw-semibold fs-5 text-primary">
                                Rs. {(selectedItem.price * checkoutQty).toLocaleString()}
                            </div>
                        </div>

                        <Form.Item label="Quantity" required>
                            <div className="d-flex align-items-center gap-2">
                                <Button
                                    icon={<MinusOutlined />}
                                    onClick={() => setCheckoutQty(q => Math.max(1, q - 1))}
                                    disabled={checkoutQty <= 1}
                                />
                                <Input
                                    type="number"
                                    value={checkoutQty}
                                    onChange={(e) => {
                                        const val = Number(e.target.value)
                                        if (val >= 1 && val <= selectedItem.stock) {
                                            setCheckoutQty(val)
                                        }
                                    }}
                                    style={{ width: 80, textAlign: "center" }}
                                />
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={() => setCheckoutQty(q => Math.min(selectedItem.stock, q + 1))}
                                    disabled={checkoutQty >= selectedItem.stock}
                                />
                                <Text type="secondary" className="ms-2">Max stock: {selectedItem.stock}</Text>
                            </div>
                        </Form.Item>

                        <Form.Item label="Shipping Address" required>
                            <TextArea
                                rows={4}
                                value={shippingAddress}
                                placeholder="Enter full shipping address"
                                onChange={(e) => setShippingAddress(e.target.value)}
                                style={{ resize: "none" }}
                            />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </main>
    )
}

export default Cart
