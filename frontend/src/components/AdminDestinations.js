import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, ListGroup } from 'react-bootstrap';
import api from '../utils/api';
import WeatherCategoryBadge from './WeatherCategoryBadge';

const predefinedDestinations = [
  {
    name: 'Sydney',
    country: 'Australia',
    description: 'Australia\'s largest city, known for its stunning harbor, iconic Opera House, and beautiful beaches like Bondi.'
  },
  {
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, known for its romantic atmosphere, iconic Eiffel Tower, and world-class museums like the Louvre.'
  },
  {
    name: 'London',
    country: 'United Kingdom',
    description: 'A vibrant capital city with rich history, featuring landmarks like Big Ben, Buckingham Palace, and the Tower of London.'
  },
  {
    name: 'New York',
    country: 'United States',
    description: 'The city that never sleeps, famous for Times Square, Central Park, and the Statue of Liberty.'
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis where traditional culture meets cutting-edge technology, featuring ancient temples and modern skyscrapers.'
  },
  {
    name: 'Chennai',
    country: 'India',
    description: 'A coastal city in Tamil Nadu known for Marina Beach, temples, classical arts, and South Indian cuisine.'
  }
];

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    country: ''
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await api.get('/destinations');
      setDestinations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching destinations');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/destinations', newDestination);
      setSuccess('Destination added successfully!');
      setNewDestination({
        name: '',
        description: '',
        country: ''
      });
      fetchDestinations();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding destination');
    }
  };

  const handleQuickAdd = async (destination) => {
    try {
      await api.post('/destinations', destination);
      setSuccess(`${destination.name} added successfully!`);
      fetchDestinations();
    } catch (err) {
      setError(err.response?.data?.message || `Error adding ${destination.name}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/destinations/${id}`);
      setSuccess('Destination deleted successfully!');
      fetchDestinations();
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting destination');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Manage Destinations</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row className="mb-4">
        <Col md={8}>
          <Card className="p-4">
            <h3>Add New Destination</h3>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={newDestination.name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={newDestination.country}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newDestination.description}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text className="text-muted">
                  Coordinates are detected automatically from the city and country.
                </Form.Text>
              </Form.Group>

              <Button type="submit" variant="primary">Add Destination</Button>
            </Form>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Quick Add Popular Destinations</Card.Header>
            <ListGroup variant="flush">
              {predefinedDestinations.map((dest, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{dest.name}</strong>
                    <div className="small text-muted">{dest.country}</div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleQuickAdd(dest)}
                  >
                    Add
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Row>
        {destinations.map(destination => (
          <Col md={4} key={destination._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className="d-flex align-items-center flex-wrap gap-2">
                  <span>{destination.name}</span>
                  <WeatherCategoryBadge category={destination.weather?.category} />
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{destination.country}</Card.Subtitle>
                <Card.Text>{destination.description}</Card.Text>
                {destination.weather && (
                  <div className="mb-2">
                    <p className="mb-1">
                      <strong>Weather:</strong> {destination.weather.condition}
                    </p>
                    <p className="mb-1">
                      <strong>Temperature:</strong> {destination.weather.temp}°C
                    </p>
                    <p className="mb-1">
                      <strong>Humidity:</strong> {destination.weather.humidity}%
                    </p>
                    {destination.weather.icon && (
                      <img
                        src={`http://openweathermap.org/img/w/${destination.weather.icon}.png`}
                        alt="Weather icon"
                      />
                    )}
                  </div>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(destination._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDestinations; 