import { Card, Row, Col, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import styles from "./WeatherDataCard.module.css";

const DetailItem = ({ icon, label, value, unit }) => (
  <Card className={styles.detailCard}>
    <Card.Body className="d-flex align-items-center p-3">
      <div className={styles.detailIcon}>{icon}</div>
      <div className="ms-3">
        <div className={styles.detailLabel}>{label}</div>
        <div className={styles.detailValue}>
          {value}
          <span className={styles.detailUnit}>{unit}</span>
        </div>
      </div>
    </Card.Body>
  </Card>
);

DetailItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
};

function WeatherDataCard({ data }) {
  if (!data) return null;

  const details = [
    {
      icon: "🌡️",
      label: "Feels Like",
      value: Math.round(data.main.feels_like),
      unit: "°C",
    },
    {
      icon: "💧",
      label: "Humidity",
      value: data.main.humidity,
      unit: "%",
    },
    {
      icon: "💨",
      label: "Wind",
      value: Math.round(data.wind.speed * 10) / 10,
      unit: "m/s",
    },
    {
      icon: "☁️",
      label: "Cloud Cover",
      value: data.clouds.all,
      unit: "%",
    },
    {
      icon: "⏲️",
      label: "Pressure",
      value: data.main.pressure,
      unit: "hPa",
    },
  ];

  return (
    <Card className={styles.weatherCard}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.header}>
          <h2 className={styles.location}>
            {data.name}
            <Badge bg="info" className="ms-2 align-middle">
              {data.sys.country}
            </Badge>
          </h2>
        </div>

        <div className={styles.mainInfo}>
          <div className={styles.weatherMain}>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].main}
              className={styles.weatherIcon}
            />
            <div className={styles.weatherDesc}>
              <h3>{data.weather[0].main}</h3>
              <p>{data.weather[0].description}</p>
            </div>
          </div>

          <div className={styles.tempContainer}>
            <span className={styles.tempValue}>
              {Math.round(data.main.temp)}
              <span className={styles.tempUnit}>°C</span>
            </span>
          </div>
        </div>

        <Row className="g-3 mt-2">
          {details.map((detail, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <DetailItem {...detail} />
            </Col>
          ))}
        </Row>

        <div className={styles.coordinates}>
          <Badge bg="secondary" className="px-3 py-2">
            📍 {Math.abs(data.coord.lat).toFixed(4)}°
            {data.coord.lat >= 0 ? "N" : "S"},{" "}
            {Math.abs(data.coord.lon).toFixed(4)}°
            {data.coord.lon >= 0 ? "E" : "W"}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}

WeatherDataCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    clouds: PropTypes.shape({
      all: PropTypes.number.isRequired,
    }).isRequired,
    coord: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default WeatherDataCard;
