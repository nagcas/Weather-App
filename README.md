# Weather App 🌦️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2024-orange)

Weather App is an application that allows users to view the current weather and forecasts for multiple cities using the OpenWeatherMap API. The app enables registered users to save their favorite cities. The project includes a backend for authentication (login and registration) and preference management.



- 🌍 View the current weather for any city.
- 🔮 5-day weather forecasts.
- 🔐 Authentication: login and registration system.
- ⭐ Save favorite cities for registered users.
- 💻 Responsive design for an optimal experience on mobile and desktop.

  ## Screenshot
  ![Screenshot 2024-10-21 230409](https://github.com/user-attachments/assets/f7da5f0a-2e0d-426e-be42-33e04525f7f2)


## Technologies used

- **Frontend**:
  - React with Vite
  - CSS3 (Flexbox per il layout responsive)
  **Fetch** (for API calls)

- **Backend**:
  - Node.js with Express
  - MongoDB (for user and favorite city management)
  - JWT (for authentication)
  - Bcrypt (for password management)

- **API**:
  - OpenWeatherMap

## Installation and Usage

### Prerequisites

Make sure you have Node.js, npm, and MongoDB installed on your computer.

### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/nagcas/Weather-App.git
  cd weather-app
  ```

## Install dependencies for the frontend and backend

## For the frontend

  ```bash
  cd frontend
  npm install
  ```

## For the backend

  ```bash
  cd ../backend
  npm install
  ```

## Configure environment variables

Create a `.env` file in the `backend` folder with the following content:
  
  ```bash
  PORT=5000
  MONGO_URI=<la tua stringa di connessione MongoDB>
  JWT_SECRET=<una stringa segreta per i token>
  OPENWEATHER_API_KEY=<la tua chiave API di OpenWeatherMap>
  ```

## Start the backend
  
  ```bash
  cd backend
  npm start
  ```

## Start the frontend using Vite

  ```bash
  cd frontend
  npm run dev
  ```

## Contribuire

Contributing to the project is easy! If you want to participate, follow the instructions in the CONTRIBUTING.md file.

### Fork the project

Create a new branch for your feature: `git checkout -b feature/your-feature-name`.
Commit your changes: `git commit -m "Adds a new feature"`.
Push to the branch: `git push origin feature/your-feature-name`.
Submit a pull request.

### License

Distributed under the MIT License. See the LICENSE file for more details.

Project created for Hacktoberfest 2024. 🎃
