const axios = require('axios');

const getWeatherApiError = (error, action) => {
  const apiMessage = error.response?.data?.message;
  const status = error.response?.status;

  if (status === 401) {
    return new Error('Invalid OpenWeather API key. Update OPENWEATHER_API_KEY in backend/.env');
  }

  if (apiMessage) {
    return new Error(`${action} failed: ${apiMessage}`);
  }

  return new Error(`${action} failed`);
};

const categorizeWeather = (temp, condition, main) => {
  const conditionLower = (condition || '').toLowerCase();
  const mainLower = (main || '').toLowerCase();

  if (
    ['rain', 'drizzle', 'thunderstorm'].includes(mainLower) ||
    conditionLower.includes('rain') ||
    conditionLower.includes('drizzle') ||
    conditionLower.includes('thunder')
  ) {
    return { type: 'rainy', label: 'Rainy Destination' };
  }

  if (
    temp < 12 ||
    mainLower === 'snow' ||
    conditionLower.includes('snow') ||
    mainLower === 'mist'
  ) {
    return { type: 'cold', label: 'Cold Destination' };
  }

  return { type: 'sunny', label: 'Sunny Destination' };
};

const getCoordinatesFromCity = async (name, country) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error('OpenWeather API key is not configured');
  }

  const query = country ? `${name},${country}` : name;
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (!response.data?.length) {
      throw new Error(`Could not find coordinates for ${name}, ${country}`);
    }

    const { lon, lat } = response.data[0];
    return [lon, lat];
  } catch (error) {
    if (error.message?.startsWith('Could not find coordinates')) {
      throw error;
    }
    console.error('Error fetching coordinates:', error.response?.data || error.message);
    throw getWeatherApiError(error, 'Geocoding');
  }
};

const getCurrentWeather = async (coordinates) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeather API key is not configured');
    }

    const [lon, lat] = coordinates;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    const data = response.data;
    const main = data.weather[0].main;
    const condition = data.weather[0].description;
    const temp = data.main.temp;

    return {
      temp,
      humidity: data.main.humidity,
      condition,
      main,
      icon: data.weather[0].icon,
      category: categorizeWeather(temp, condition, main)
    };
  } catch (error) {
    console.error('Error fetching current weather:', error.response?.data || error.message);
    throw getWeatherApiError(error, 'Weather fetch');
  }
};

const getForecast = async (coordinates) => {
  try {
    const [lon, lat] = coordinates;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

const getHistoricalWeather = async (coordinates, date) => {
  try {
    const [lon, lat] = coordinates;
    const timestamp = Math.floor(date.getTime() / 1000);
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}&units=metric`
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

module.exports = {
  getCurrentWeather,
  getForecast,
  getHistoricalWeather,
  getCoordinatesFromCity,
  categorizeWeather
}; 