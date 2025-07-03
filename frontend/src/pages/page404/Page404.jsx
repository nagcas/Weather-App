import './Page404.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <Container className='page__not__found'>
      <div className='content'>
        <h1>404</h1>
        <h4>Oops! The page you are looking for does not exist.</h4>
        <p>Looks like you took a wrong turn in my weather app...</p>
        <p>Don't worry, I'll help you get back to your profile. 😊</p>
        <Link
          to='/'
          className='btn_home'
        >
          Home
        </Link>
      </div>
    </Container>
  );
}

export default Page404;
