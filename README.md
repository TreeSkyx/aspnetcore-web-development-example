
# Weather Forecast Application (ASP.Net + React)

This project is a simple weather forecast application that allows users to perform CRUD (Create, Read, Update, Delete) operations on weather data. The application consists of two parts:

1. **Backend**: An ASP.NET Core Web API that provides endpoints for handling weather data.
2. **Frontend**: A React application that communicates with the backend API to display and manage weather data.

## Features

- Fetch weather data from the backend API.
- Add new weather data entries.
- Edit existing weather data.
- Delete weather data entries.

## Technology Stack

- **Backend**: ASP.NET Core 9.0 Web API
- **Frontend**: React (with Axios for API requests)
- **Database**: Simple file-based storage (e.g., JSON or text file)

## Installation

### Prerequisites

- .NET 8.0 SDK or later (for the backend)
- Node.js and npm (for the frontend)

### Backend Setup

1. Clone the repository and navigate to the backend folder.
2. Open a terminal and run the following command to restore the dependencies:
```bash
  dotnet restore
```
3. Build the backend project:
  ```bash
  dotnet build
  ```
4. Run the backend API:
  ```bash
  dotnet run
  ```
The backend will be running at http://localhost:5008.

### Frontend Setup
1. Navigate to the frontend folder.
2. Install the dependencies:
```bash
npm install
```
3. Start the React development server:
```bash
npm start
```
The frontend will be running at http://localhost:3000.

### API Endpoints
- GET /api/weatherforecast: Retrieve a list of all weather data.
- POST /api/weatherforecast: Add a new weather entry.
- PUT /api/weatherforecast/{date}: Update an existing weather entry by date.
- DELETE /api/weatherforecast/{date}: Delete a weather entry by date.

### Usage
- The frontend app allows you to view the weather data, add new data, edit existing entries, and delete weather data.
- The data is fetched from the backend API and displayed in a list.
- A form is available for adding and editing weather entries, and each entry has buttons for editing and deleting.

### Example Weather Data
- Date: 2025-02-01
- Temperature: 25°C
- Summary: Warm

### Contributing
If you'd like to contribute to this project, feel free to fork the repository, make changes, and create a pull request. All contributions are welcome!

### License
This project is licensed under the MIT License - see the LICENSE file for details.
