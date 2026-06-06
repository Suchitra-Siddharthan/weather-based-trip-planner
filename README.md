# Weather-Based Trip Planner

A full-stack web application that helps users plan their trips based on weather conditions. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User Authentication (Login/Register)
- Destination Search
- Real-time Weather Forecast
- Weather-based Activity Recommendations
- Trip Planning and Management
- Packing List Generator
- Weather Alerts and Notifications
- Historical Weather Data
- Multi-City Weather Comparison

## Tech Stack

### Frontend
- React.js
- React Bootstrap
- React Router
- React DatePicker
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Project Structure

```
weather-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Trip.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── trips.js
│   │   └── weather.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── TripPlanner.js
    │   │   ├── MyTrips.js
    │   │   └── WeatherForecast.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-trip-planner.git
cd weather-trip-planner
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory
```bash
cd ../backend
touch .env
```

Add the following to your .env file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/weather-trip-planner
JWT_SECRET=your_jwt_secret
```

5. Start the backend server
```bash
npm run dev
```

6. Start the frontend development server
```bash
cd ../frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 