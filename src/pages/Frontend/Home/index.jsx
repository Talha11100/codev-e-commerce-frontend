import Courses from './Courses'
import Hero from './Hero'
import Services from './Services'
import Stats from './Stats'

const Home = () => {
    return (
        <main style={{ backgroundColor: "#f4f6f8" }}>
            <Hero />
            <Stats />
            <Services/>
            <Courses/>
        </main>
    )
}

export default Home