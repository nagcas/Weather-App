import './DefaultWeather.css'
import { Container } from 'react-bootstrap'
import WeatherApi from '../weatherApi/WeatherApi'

function DefaultWeather() {
  return (
    <section className='defaultWeather__section'>
      <Container>
        <h2 className='title__defaultWeather'>Default Cities Weather</h2>
        <WeatherApi />
      </Container>
    </section>
  )
}

export default DefaultWeather
