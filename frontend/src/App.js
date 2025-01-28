import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5008/weatherforecast") // API URL
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Weather Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.summary} - {item.temperatureC}°C
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
