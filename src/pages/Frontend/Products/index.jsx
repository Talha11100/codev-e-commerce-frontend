import { useEffect, useState } from "react"
import { Card, Row, Col, Typography, Button, Modal, Form, Input, message, Image, Spin } from "antd"
import { useAuth } from "@/context/Auth"
import axios from "axios"

const { Title, Text } = Typography
const { TextArea } = Input

const initialState = { quantity: 1, shippingAddress: "", selectedProduct: null }

const Products = () => {

    const [products, setProducts] = useState([])
    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const { user, addToCart } = useAuth()

    // Get unique categories from products
    const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))]

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory)

    // Handle Input Change
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    // Get All Products
    useEffect(() => {
        setIsProcessing(true)

        axios.get("http://localhost:8000/products/public-all")
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    setProducts(data.products)
                }
            })
            .catch((err) => {
                console.log(err)
                message.error("Something went wrong while fetching products")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }, [])


    // Show Modal or Open Order Modal
    const handleOrderNow = (product) => {
        setState({ quantity: 1, shippingAddress: "", selectedProduct: product })
        setIsModalOpen(true)
    }


    // Handle Cancel Button
    const handleCancel = () => {
        setIsModalOpen(false)
        setState(initialState)
    }


    // Handle Pay / Place Order Button
    const handlePay = () => {
        const jwt = localStorage.getItem("token")
        if (!jwt) {
            return message.error("Please login to place an order")
        }

        const { quantity, shippingAddress, selectedProduct } = state
        const { id, price, stock, name } = selectedProduct

        const qty = Number(quantity)
        if (!qty || qty < 1) {
            return message.error("Please enter a valid quantity")
        }
        if (qty > stock) {
            return message.error(`Quantity cannot exceed available stock (${stock})`)
        }
        if (!shippingAddress) {
            return message.error("Please enter your shipping address")
        }

        if (user.role !== 'customer') {
            return message.error("Only customers can place orders")
        }

        const orderData = {
            products: [{ productId: id, name, quantity: qty, price }],
            totalAmount: price * qty,
            shippingAddress
        }

        setIsProcessing(true)

        axios.post("http://localhost:8000/orders/create", orderData, { headers: { Authorization: `Bearer ${jwt}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200 || status === 201) {
                    message.success(data.message)
                    // Merge updated stock into the products state without a page refresh
                    if (Array.isArray(data.updatedProducts)) {
                        setProducts(prev =>
                            prev.map(p => {
                                const upd = data.updatedProducts.find(u => u.id === p.id)
                                return upd ? { ...p, stock: upd.stock } : p
                            })
                        )
                    }
                    setIsModalOpen(false)
                }
            })
            .catch((err) => {
                console.error(err)
                message.error("Something went wrong while placing an order")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    const currentQty = Number(state.quantity) || 1
    const { selectedProduct } = state

    return (
        <>
            <main style={{ backgroundColor: "#f4f6f8" }}>
                <div className="container py-4">
                    {isProcessing && products.length === 0 ?
                        <>
                            <div className="text-center mt-5"><Spin size="large" /></div>
                        </>
                        :
                        <>
                            {/* Category Filter */}
                            <div className="mb-4 text-center">
                                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            type={selectedCategory === category ? "primary" : "default"}
                                            onClick={() => setSelectedCategory(category)}
                                            className="text-capitalize"
                                            size="large"
                                            style={{
                                                borderRadius: '20px',
                                                paddingLeft: '24px',
                                                paddingRight: '24px',
                                                fontWeight: selectedCategory === category ? '600' : 'normal',
                                                boxShadow: selectedCategory === category ? '0 4px 12px rgba(67, 56, 202, 0.35)' : 'none',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Row gutter={[24, 24]}>
                                {filteredProducts.map((product) => {
                                    return (
                                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                                            <Card hoverable cover={
                                                <div className="position-relative">
                                                    <img alt={product.name} src={product.imageURL} style={{ height: 200, width: '100%', objectFit: 'cover' }} />
                                                    <div className="position-absolute text-white px-2 py-1 rounded" style={{ top: 10, right: 10, backgroundColor: "#52c41a" }}>
                                                        In Stock
                                                    </div>
                                                </div>
                                            }>
                                                <Title level={5}>{product.name}</Title>
                                                <Text type="secondary" className="text-capitalize">{product.category}</Text>
                                                <div className="mt-2">
                                                    <Text className="fw-semibold text-info fs-5">Rs. {product.price.toLocaleString()}</Text>
                                                </div>
                                                <div className="mt-2">
                                                    <Text type="secondary">Stock: {product.stock.toLocaleString()}</Text>
                                                </div>
                                                <Button type="primary" block onClick={() => handleOrderNow(product)} className="mt-3">Order Now</Button>
                                                <Button type="default" block onClick={() => addToCart(product)} className="mt-2">Add to Cart</Button>
                                            </Card>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </>
                    }
                </div>
            </main>

            {/* Modal Box will always be just before the closing fragment */}
            <Modal
                title="Place Order"
                centered={true}
                open={isModalOpen}
                onOk={handlePay}
                onCancel={handleCancel}
                confirmLoading={isProcessing}
            >
                {selectedProduct && (
                    <Form layout="vertical" className="p-3">
                        <Row>
                            <Col span={24}>
                                <div className="d-flex justify-content-between align-items-center mb-3 p-3 rounded">
                                    <div className="d-flex align-items-center gap-3">
                                        <Image src={selectedProduct.imageURL} alt={selectedProduct.name} width={48} height={48} style={{ objectFit: 'cover', borderRadius: 4 }} />
                                        <div>
                                            <div className="fw-semibold">{selectedProduct.name}</div>
                                            <Text type="secondary">Rs. {selectedProduct.price.toLocaleString()} x {currentQty}</Text>
                                        </div>
                                    </div>
                                    <div className="fw-semibold fs-5">
                                        Rs. {(selectedProduct.price * currentQty).toLocaleString()}
                                    </div>
                                </div>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Quantity" required>
                                    <Input type="number" size="large" name="quantity" value={state.quantity} placeholder="Enter product quantity" max={selectedProduct.stock} onChange={handleChange} />
                                    <Text type="secondary">Max available: {selectedProduct.stock}</Text>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item label="Shipping Address" required>
                                    <TextArea rows={4} name="shippingAddress" value={state.shippingAddress} placeholder="Enter full shipping address" onChange={handleChange} style={{ resize: "none" }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </>
    )
}

export default Products
