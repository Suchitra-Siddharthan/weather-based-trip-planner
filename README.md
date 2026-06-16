# Weather-Based Trip Planner

A full-stack web application that recommends travel activities and generates packing lists based on real-time and forecasted weather at a user's destination. Users can save trips, compare weather across multiple cities, and receive alerts for adverse conditions.

---

## Features

- JWT-based user authentication (register, login, protected routes)
- Destination search with real-time weather fetching
- 7-day weather forecast per destination
- Weather-based activity recommendations (e.g. hiking for sunny days, museums for rainy days)
- Packing list auto-generated from forecast data
- Trip saving and management (create, view, delete trips)
- Multi-city weather comparison
- Weather alerts for severe conditions

---

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React.js, React Router, React Bootstrap, Axios |
| Backend  | Node.js, Express.js                     |
| Database | MongoDB, Mongoose                       |
| Auth     | JWT, bcrypt                             |
| Weather  | OpenWeatherMap API                      |

---

## Project Structure

```
weather-based-trip-planner/
├── backend/
│   ├── models/
│   │   ├── User.js          # Mongoose schema for user accounts
│   │   └── Trip.js          # Mongoose schema for saved trips
│   ├── routes/
│   │   ├── auth.js          # Register, login, JWT issuance
│   │   ├── trips.js         # CRUD operations for trips
│   │   └── weather.js       # Proxy to OpenWeatherMap API
│   └── server.js            # Express app entry point
└── frontend/
    └── src/
        ├── components/
        │   └── Navbar.js
        ├── pages/
        │   ├── Home.js
        │   ├── Login.js
        │   ├── Register.js
        │   ├── TripPlanner.js
        │   ├── MyTrips.js
        │   └── WeatherForecast.js
        └── App.js
```

---

## Getting Started

### Prerequisites

- Node.js v14+
- MongoDB (local or Atlas)
- OpenWeatherMap API key (free tier works)

### Installation

```bash
# Clone the repo
git clone https://github.com/Suchitra-Siddharthan/weather-based-trip-planner.git
cd weather-based-trip-planner
```

```bash
# Install backend dependencies
cd backend
npm install
```

```bash
# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-trip-planner
JWT_SECRET=your_jwt_secret_here
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

### Running the App

```bash
# Start backend (from backend/)
npm run dev

# Start frontend (from frontend/)
npm start
```

- Frontend: http://localhost:3000  
- Backend API: http://localhost:5000

---

## Design Decisions

- **Weather proxied through the backend** — the OpenWeatherMap API key is never exposed to the client. All weather requests go through `/api/weather` on the Express server.
- **JWT stored in localStorage** — kept simple for a portfolio project; a production app would use httpOnly cookies.
- **MongoDB for trip storage** — schema-flexible enough to accommodate varying forecast lengths and activity lists without rigid relational constraints.

---

## API Endpoints

| Method | Endpoint              | Description                  | Auth Required |
|--------|-----------------------|------------------------------|---------------|
| POST   | /api/auth/register    | Create new user account      | No            |
| POST   | /api/auth/login       | Login and receive JWT        | No            |
| GET    | /api/weather/:city    | Fetch forecast for a city    | Yes           |
| GET    | /api/trips            | Get all trips for user       | Yes           |
| POST   | /api/trips            | Save a new trip              | Yes           |
| DELETE | /api/trips/:id        | Delete a saved trip          | Yes           |
