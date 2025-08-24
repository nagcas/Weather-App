import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from './pages/home/Home';
import NavBar from './components/common/navbar/Navbar';
import Forecast from './components/forecast/Forecast';
import Favorites from './components/favorites/Favorites';
import Settings from './components/settings/Settings';
import About from './pages/about/About';
import Footer from './components/common/footer/Footer';
import Login from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Page404 from './pages/page404/Page404';
import DefaultWeather from './components/defaultWeather/DefaultWeather';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './modules/AuthProvider';
import CitySearch from './components/citySearch/CitySearch';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/default-weather'
            element={<DefaultWeather />}
          />
          <Route
            path='/forecast'
            element={<Forecast />}
          />
          <Route
            path='/city-search'
            element={<CitySearch />}
          />
          <Route
            path='/favorites'
            element={<Favorites />}
          />
          <Route
            path='/settings'
            element={<Settings />}
          />
          <Route
            path='/favorites'
            element={<Favorites />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/signin'
            element={<Login />}
          />
          <Route
            path='/signup'
            element={<SignUp />}
          />
          <Route
            path='*'
            element={<Page404 />}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
