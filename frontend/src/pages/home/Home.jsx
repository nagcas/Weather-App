import './Home.css'
import Hero from '../../components/common/hero/Hero'
import { Container } from 'react-bootstrap'
import WeatherApi from '../../components/weatherApi/WeatherApi'

function Home() {
  return (
    <Container fluid>
      <Hero />
      <WeatherApi />
    </Container>
  )
}

export default Home
