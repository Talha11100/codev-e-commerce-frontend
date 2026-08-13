import { useAuth } from "@/context/Auth"
import { DashboardOutlined, LoginOutlined, LogoutOutlined, ShopOutlined, UserAddOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { Space } from "antd"
import { Link } from "react-router-dom"


const Navbar = () => {
    const { isAuth, user, handleLogout, cart } = useAuth()
    // const totalCartQuantity = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0

    let totalCartQuantity = 0;

    if (cart) {
        for (const item of cart) {
            totalCartQuantity += item.quantity;
        }
    }

    return (
        <header className="sticky-top">
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand"><ShopOutlined /> ShopNest</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products" className="nav-link">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-link">Services</Link>
                            </li>
                            {isAuth && user?.role === 'customer' && (
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link d-flex align-items-center gap-2">
                                        <ShoppingCartOutlined style={{ fontSize: '18px' }} />
                                        Cart
                                        <span className="badge bg-warning text-dark rounded-pill">{totalCartQuantity}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <Space>
                            {!isAuth
                                ? <>
                                    <Link to="/auth/login" className="btn btn-warning fw-semibold"><LoginOutlined /> Login</Link>
                                    <Link to="/auth/register" className="btn btn-outline-light"><UserAddOutlined /> Register</Link>
                                </>
                                : <>
                                    <Link to="/dashboard" className="btn btn-warning fw-semibold"><DashboardOutlined /> Dashboard</Link>
                                    <button className="btn btn-outline-light" onClick={handleLogout}><LogoutOutlined /> Logout</button>
                                </>
                            }
                        </Space>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar