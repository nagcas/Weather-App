import { Container } from "react-bootstrap";

function Legend() {
  return (
    <Container className="content__legend">
      <h2 className="mb-4">Weather Data Legend</h2>
      <p><span className="fw-bold">Coord. lon:</span> The geographical longitude of the location, measured in degrees, indicating the position east or west of the Prime Meridian.</p>
      <p><span className="fw-bold">Coord. lat:</span> The geographical latitude of the location, measured in degrees, indicating the position north or south of the Equator.</p>
      <p><span className="fw-bold">Temp.:</span> The current air temperature at the location. Measured in either Celsius (metric) or Fahrenheit (imperial).</p>
      <p><span className="fw-bold">Temp. Max.:</span> The maximum temperature currently observed at the location, reflecting the highest recorded temperature at the moment.</p>
      <p><span className="fw-bold">Temp. Min.:</span> The minimum temperature currently observed at the location, reflecting the lowest recorded temperature at the moment.</p>
      <p><span className="fw-bold">Pressure:</span> Atmospheric pressure at sea level, measured in hectopascals (hPa). This helps indicate weather conditions, with lower pressure suggesting potential storms.</p>
      <p><span className="fw-bold">Humidity:</span> The percentage of moisture in the air. High humidity often indicates a higher chance of precipitation or muggy conditions.</p>
      <p><span className="fw-bold">Wind speed:</span> The current speed of the wind at the location. Measured in meters per second (metric) or miles per hour (imperial).</p>
      <p><span className="fw-bold">Wind deg:</span> The direction from which the wind is coming, measured in degrees (meteorological). A degree of 0° indicates wind from the north.</p>
    </Container>
  );
};

export default Legend;