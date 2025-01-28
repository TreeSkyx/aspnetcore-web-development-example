import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [newWeather, setNewWeather] = useState({
    date: "2025-02-01",
    temperatureC: 25,
    summary: "Warm",
  });
  const [editingWeather, setEditingWeather] = useState(null);

  // Fetch weather data
  useEffect(() => {
    axios
      .get("http://localhost:5008/api/weatherforecast")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle adding new weather
  const handleAddWeather = () => {
    axios
      .post("http://localhost:5008/api/weatherforecast", newWeather)
      .then((response) => {
        setData((prevData) => [...prevData, newWeather]);
        setNewWeather({
          date: "2025-02-01",
          temperatureC: 25,
          summary: "Warm",
        });
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  // Handle updating weather
  const handleUpdateWeather = () => {
    axios
      .put(
        `http://localhost:5008/api/weatherforecast/${editingWeather.date}`,
        editingWeather
      )
      .then(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item.date === editingWeather.date ? editingWeather : item
          )
        );
        setEditingWeather(null);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  // Handle deleting weather
  const handleDeleteWeather = (date) => {
    axios
      .delete(`http://localhost:5008/api/weatherforecast/${date}`)
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.date !== date));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.date} - {item.summary} - {item.temperatureC}°C
            <button onClick={() => setEditingWeather(item)}>Edit</button>
            <button onClick={() => handleDeleteWeather(item.date)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div>
        <h2>{editingWeather ? "Edit Weather" : "Add Weather"}</h2>
        <input
          type="text"
          placeholder="Date (yyyy-mm-dd)"
          value={editingWeather ? editingWeather.date : newWeather.date}
          onChange={(e) =>
            editingWeather
              ? setEditingWeather({ ...editingWeather, date: e.target.value })
              : setNewWeather({ ...newWeather, date: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Temperature (°C)"
          value={
            editingWeather
              ? editingWeather.temperatureC
              : newWeather.temperatureC
          }
          onChange={(e) =>
            editingWeather
              ? setEditingWeather({
                  ...editingWeather,
                  temperatureC: e.target.value,
                })
              : setNewWeather({ ...newWeather, temperatureC: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Summary"
          value={editingWeather ? editingWeather.summary : newWeather.summary}
          onChange={(e) =>
            editingWeather
              ? setEditingWeather({
                  ...editingWeather,
                  summary: e.target.value,
                })
              : setNewWeather({ ...newWeather, summary: e.target.value })
          }
        />
        <button
          onClick={editingWeather ? handleUpdateWeather : handleAddWeather}
        >
          {editingWeather ? "Update Weather" : "Add Weather"}
        </button>
        {editingWeather && (
          <button onClick={() => setEditingWeather(null)}>Cancel Edit</button>
        )}
      </div>
    </div>
  );
}

export default App;
