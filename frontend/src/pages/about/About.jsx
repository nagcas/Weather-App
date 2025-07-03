import './About.css';
import { Container } from 'react-bootstrap';

function About() {
  return (
    <section className='about__section'>
      <Container className='content__about'>
        <h2 className='title__about'>About Weather App</h2>
        <p>
          Welcome to <span className='fw-bold'>Weather App</span>, an
          open-source project developed during{' '}
          <span className='fw-bold'>Hacktoberfest</span>! This app provides
          real-time weather updates, forecasts, and settings to personalize your
          experience. The project was built with a passion for technology and
          community-driven collaboration.
        </p>
        <p>
          Hacktoberfest was a great opportunity to enhance this app with the
          help of incredible external contributors. Your valuable feedback,
          suggestions, and code contributions have made this project better and
          stronger.
        </p>
        <p>
          I extend a heartfelt thank you to everyone who participated in the
          development process. Your input and support have been instrumental in
          bringing this app to life!
        </p>
        <p>
          Together, we continue to build, improve, and make{' '}
          <span className='fw-bold'>Weather App</span> a better resource for
          users everywhere.
        </p>
        <p>
          <span className='fw-bold'>
            Thank you for being part of this journey!
          </span>
        </p>
      </Container>
    </section>
  );
}

export default About;
