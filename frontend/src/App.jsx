import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Home from "./pages/home/Home";
import NavBar from "./components/common/navbar/Navbar";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import Favorites from "./components/favorites/Favorites";
import Settings from "./components/settings/Settings";
import About from "./pages/about/About";
import Footer from "./components/common/footer/Footer";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Page404 from "./pages/page404/Page404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/current-weather" element={<CurrentWeather />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
