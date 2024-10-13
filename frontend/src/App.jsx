import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/home/home";
import NavBar from "./components/common/navbar/Navbar";
import CurrentWeather from "./components/currentWeather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import Favorites from "./components/favorites/Favorites";
import Settings from "./components/settings/Settings";
import About from "./pages/about/About";
import Footer from "./components/common/footer/Footer";
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
