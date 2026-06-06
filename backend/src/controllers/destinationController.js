const Destination = require('../models/Destination');
const { getCurrentWeather, getCoordinatesFromCity } = require('../services/weatherService');

const buildWeatherPayload = (weatherData) => ({
  temp: weatherData.temp,
  humidity: weatherData.humidity,
  condition: weatherData.condition,
  main: weatherData.main,
  icon: weatherData.icon,
  category: weatherData.category,
  lastUpdated: new Date()
});

const refreshDestinationWeather = async (destination) => {
  try {
    const weatherData = await getCurrentWeather(destination.location.coordinates);
    destination.weather = buildWeatherPayload(weatherData);
    await destination.save();
  } catch (error) {
    console.error(`Failed to refresh weather for ${destination.name}:`, error.message);
  }
  return destination;
};

const resolveCoordinates = async (name, country, coordinates) => {
  if (exampleCities[name]) {
    return exampleCities[name].coordinates;
  }

  if (coordinates && Array.isArray(coordinates) && coordinates.length === 2) {
    const [lon, lat] = coordinates.map(Number);
    if (!Number.isNaN(lon) && !Number.isNaN(lat)) {
      return [lon, lat];
    }
  }

  return getCoordinatesFromCity(name, country);
};

// Example cities with their coordinates and descriptions
const exampleCities = {
  'Paris': { 
    coordinates: [2.3522, 48.8566], 
    country: 'France',
    description: 'The City of Light, known for its romantic atmosphere, iconic Eiffel Tower, and world-class museums like the Louvre.'
  },
  'London': { 
    coordinates: [-0.1278, 51.5074], 
    country: 'United Kingdom',
    description: 'A vibrant capital city with rich history, featuring landmarks like Big Ben, Buckingham Palace, and the Tower of London.'
  },
  'New York': { 
    coordinates: [-74.0060, 40.7128], 
    country: 'United States',
    description: 'The city that never sleeps, famous for Times Square, Central Park, and the Statue of Liberty.'
  },
  'Tokyo': { 
    coordinates: [139.6503, 35.6762], 
    country: 'Japan',
    description: 'A vibrant metropolis where traditional culture meets cutting-edge technology, featuring ancient temples and modern skyscrapers.'
  },
  'Sydney': { 
    coordinates: [151.2093, -33.8688], 
    country: 'Australia',
    description: 'Australia\'s largest city, known for its stunning harbor, iconic Opera House, and beautiful beaches like Bondi. A perfect blend of urban life and natural beauty with a vibrant cultural scene.'
  },
  'Dubai': { 
    coordinates: [55.2708, 25.2048], 
    country: 'United Arab Emirates',
    description: 'A modern metropolis in the desert, famous for its luxury shopping, ultramodern architecture, and lively nightlife scene.'
  },
  'Rome': { 
    coordinates: [12.4964, 41.9028], 
    country: 'Italy',
    description: 'The Eternal City, home to ancient ruins like the Colosseum and Roman Forum, as well as Vatican City and its famous art.'
  },
  'Barcelona': { 
    coordinates: [2.1734, 41.3851], 
    country: 'Spain',
    description: 'A vibrant city known for its unique architecture by Antoni Gaudí, beautiful beaches, and lively cultural scene.'
  },
  'Amsterdam': { 
    coordinates: [4.9041, 52.3676], 
    country: 'Netherlands',
    description: 'A charming city of canals, historic houses, and world-class museums like the Van Gogh Museum and Rijksmuseum.'
  },
  'Berlin': { 
    coordinates: [13.4050, 52.5200], 
    country: 'Germany',
    description: 'Germany\'s capital, known for its art scene, modern landmarks like the Berlin Wall, and vibrant nightlife.'
  },
  'Chennai': {
    coordinates: [80.2707, 13.0827],
    country: 'India',
    description: 'A coastal city in Tamil Nadu known for Marina Beach, temples, classical arts, and South Indian cuisine.'
  }
};

const destinationController = {
  // Get all destinations
  getDestinations: async (req, res) => {
    try {
      const destinations = await Destination.find({});
      const refreshedDestinations = await Promise.all(
        destinations.map((destination) => refreshDestinationWeather(destination))
      );
      res.json(refreshedDestinations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching destinations', error: error.message });
    }
  },

  // Add new destination
  addDestination: async (req, res) => {
    try {
      const { name, description, country, coordinates, location } = req.body;
      const providedCoordinates = coordinates || location?.coordinates;

      if (!country?.trim()) {
        return res.status(400).json({ message: 'Country is required' });
      }

      const trimmedCountry = country.trim();
      const cityInfo = exampleCities[name];
      const resolvedCoordinates = await resolveCoordinates(name, trimmedCountry, providedCoordinates);
      const weatherData = await getCurrentWeather(resolvedCoordinates);

      const destination = new Destination({
        name,
        description: description || cityInfo?.description || `Beautiful destination in ${trimmedCountry}`,
        country: trimmedCountry,
        location: {
          type: 'Point',
          coordinates: resolvedCoordinates
        },
        weather: buildWeatherPayload(weatherData)
      });

      await destination.save();
      res.status(201).json(destination);
    } catch (error) {
      console.error('Error adding destination:', error);
      res.status(500).json({ message: 'Error adding destination', error: error.message });
    }
  },

  // Delete a destination
  deleteDestination: async (req, res) => {
    try {
      const destination = await Destination.findByIdAndDelete(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
      res.json({ message: 'Destination deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting destination', error: error.message });
    }
  },

  // Get weather for destination
  getWeather: async (req, res) => {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }

      const weatherData = await getCurrentWeather(destination.location.coordinates);
      destination.weather = buildWeatherPayload(weatherData);
      await destination.save();

      res.json(destination.weather);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching weather', error: error.message });
    }
  },

  // Get example cities
  getExampleCities: async (req, res) => {
    try {
      res.json(Object.keys(exampleCities));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching example cities' });
    }
  }
};

module.exports = destinationController; 