import './CurrentWeather.css'
import { Container } from 'react-bootstrap'
import WeatherApi from '../weatherApi/WeatherApi'

function CurrentWeather() {
  return (
    <section className='currentWeather__section'>
      <Container>
        <h2 className='title__currentWeather'>Current Weather</h2>
        <WeatherApi />
      </Container>
    </section>
  )
}

export default CurrentWeather
