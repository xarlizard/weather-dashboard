import { useState } from 'react';
import { useNavigate } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import styles from './Search.module.css';

function CitySearch() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setIsLoading(true);
    setError('');    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
      );
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const results = await response.json();
      
      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        navigate(`/${lat},${lon}`);
      } else {
        setError('City not found. Please try a different name.');
      }
    } catch (err) {
      setError('Error searching for city. Please try again later.');
      console.error('Geocoding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Card className={styles.searchCard}>
        <Card.Body>
          <Card.Title className="mb-4">Search Weather by City Name</Card.Title>
          {error && (
            <Alert variant="danger" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>City Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city name..."
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                disabled={isLoading}
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Get Weather'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CitySearch;
