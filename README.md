# Weather-Based Trip Planner

A full-stack MERN application that helps users plan and manage trips while providing weather information for destinations using OpenWeather APIs.

## Features

### Authentication

* User registration
* User login
* JWT-based authentication
* Password hashing using bcrypt
* Protected routes for authenticated users

### Trip Management

* Create trips
* View personal trips
* Update trip details
* Delete trips
* Store travel dates, activities, packing lists, and notes

### Destination Management

* Add destinations
* View destinations
* Delete destinations
* Store destination coordinates using MongoDB geospatial data

### Weather Integration

* Current weather information
* Weather forecasts
* Historical weather support
* Weather-based destination categorization

  * Sunny
  * Rainy
  * Cold
* Weather icons and condition descriptions

### Administration

* Dashboard statistics
* User management
* Destination management

---

## Tech Stack

### Frontend

* React
* React Router
* React Bootstrap
* Axios
* Context API

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* JWT
* bcrypt

### External APIs

* OpenWeather Geocoding API
* OpenWeather Current Weather API
* OpenWeather Forecast API

---

## Project Structure

```text
frontend/
├── components/
├── pages/
├── context/
├── services/

backend/
├── models/
├── routes/
├── controllers/
├── middleware/
├── services/
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Destinations

```http
GET    /api/destinations
GET    /api/destinations/:id/weather
GET    /api/destinations/example-cities
POST   /api/destinations
DELETE /api/destinations/:id
```

### Trips

```http
POST   /api/trips
GET    /api/trips
GET    /api/trips/:id
PUT    /api/trips/:id
DELETE /api/trips/:id
```

### Admin

```http
GET /api/admin/dashboard-stats
GET /api/admin/users
```

---

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=your_openweather_api_key
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Suchitra-Siddharthan/weather-based-trip-planner.git
cd weather-based-trip-planner
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Environment variable configuration
* Authentication middleware

---

## Weather Data Flow

1. Destination is selected.
2. Coordinates are obtained from the destination record.
3. OpenWeather APIs are called using latitude and longitude.
4. Weather data is returned and categorized.
5. Results are displayed to the user.

---

## Author

**Suchitra Siddharthan**

GitHub: https://github.com/Suchitra-Siddharthan
