import { useWeatherContext } from "@/contexts/WeatherContext";
import WeatherDataCard from "./WeatherDataCard";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import styles from "./LocationDashboard.module.css";

function LocationDashboard() {
  const { data, loading, error } = useWeatherContext();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <Row className={styles.container}>
      <Col xs={12} lg={10} xl={8} className="mx-auto">
        <WeatherDataCard data={data} />
      </Col>
    </Row>
  );
}

export default LocationDashboard;
