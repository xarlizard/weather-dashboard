import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardLayout from "@/components/layout/DashboardLayout";
import WeatherDataCard from "@/components/features/weather/WeatherDataCard";
import { useWeather } from "@/hooks/useWeather";
import { useParams } from "react-router";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const params = useParams();
  let latlon = [41.3534, 2.1211]; // Default to mock location
  if (params.location) {
    // Expecting location as 'lat,lon'
    const parts = params.location.split(",");
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      latlon = [parseFloat(parts[0]), parseFloat(parts[1])];
    }
  }
  const { data, loading, error } = useWeather(latlon[0], latlon[1]);

  return (
    <DashboardLayout>
      <Row className={styles.row + " w-100 justify-content-center px-1 px-sm-2 px-md-3"}>
        <Col xs={12} sm={10} md={8} lg={6} xl={5} className={styles.col + " px-0 px-sm-2"}>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-danger">{error}</p>}
          <WeatherDataCard data={data} />
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default Dashboard;
