import { useState } from "react";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import styles from "./Search.module.css";

function Search() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lat, lon } = coordinates;

    // Basic validation
    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      setError("Please enter valid coordinates");
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError(
        "Coordinates out of range. Latitude: -90 to 90, Longitude: -180 to 180"
      );
      return;
    }

    // Navigate to location route
    navigate(`/${lat},${lon}`);
  };

  return (
    <div className={styles.searchContainer}>
      <Card className={styles.searchCard}>
        <Card.Body>
          <Card.Title className="mb-4">
            Search Weather by Coordinates
          </Card.Title>
          {error && (
            <Alert variant="danger" onClose={() => setError("")} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <div className="d-flex gap-3 mb-3">
              <Form.Group className="flex-grow-1">
                <Form.Label>Latitude</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    step="any"
                    placeholder="e.g. 41.3534"
                    value={coordinates.lat}
                    onChange={(e) =>
                      setCoordinates((prev) => ({
                        ...prev,
                        lat: e.target.value,
                      }))
                    }
                  />
                  <InputGroup.Text>°N/S</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="flex-grow-1">
                <Form.Label>Longitude</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    step="any"
                    placeholder="e.g. 2.1211"
                    value={coordinates.lon}
                    onChange={(e) =>
                      setCoordinates((prev) => ({
                        ...prev,
                        lon: e.target.value,
                      }))
                    }
                  />
                  <InputGroup.Text>°E/W</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Get Weather
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Search;
