import { HomeOutlined } from "@ant-design/icons"
import { Typography } from "antd"
import { Link } from "react-router-dom"

const { Title } = Typography
const Home = () => {
  return (
    <>
      <div className="container text-center">
        <Title level={1} className="text-center mt-4">Home</Title>
        <Link to="/" className="btn btn-primary mt-4 text-decoration-none"><HomeOutlined /> Back to main website</Link>
      </div>
    </>
  )
}

export default Home