using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private const string FilePath = "weatherdata.txt";

        // Method to read data from the text file
        private IEnumerable<WeatherForecast> ReadWeatherData()
        {
            if (!System.IO.File.Exists(FilePath))
            {
                return new List<WeatherForecast>();
            }

            var lines = System.IO.File.ReadAllLines(FilePath);
            return lines.Select(line =>
            {
                var parts = line.Split(',');
                return new WeatherForecast
                {
                    Date = DateOnly.Parse(parts[0]),
                    TemperatureC = int.Parse(parts[1]),
                    Summary = parts[2]
                };
            }).ToArray();
        }

        // Method to write data to the text file
        private void WriteWeatherData(IEnumerable<WeatherForecast> weatherData)
        {
            var lines = weatherData.Select(w => $"{w.Date},{w.TemperatureC},{w.Summary}");
            System.IO.File.WriteAllLines(FilePath, lines);
        }

        // GET method to retrieve weather data from the text file
        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return ReadWeatherData();
        }

        // POST method to add new weather data to the text file
        [HttpPost]
        public IActionResult Post([FromBody] WeatherForecast newWeather)
        {
            var weatherData = ReadWeatherData().ToList();
            weatherData.Add(newWeather);
            WriteWeatherData(weatherData);

            return CreatedAtAction(nameof(Get), new { date = newWeather.Date }, newWeather);
        }

        // PUT method to update weather data
        [HttpPut("{date}")]
        public IActionResult Put(DateOnly date, [FromBody] WeatherForecast updatedWeather)
        {
            var weatherData = ReadWeatherData().ToList();
            var existingWeather = weatherData.FirstOrDefault(w => w.Date == date);

            if (existingWeather == null)
            {
                return NotFound();
            }

            existingWeather.TemperatureC = updatedWeather.TemperatureC;
            existingWeather.Summary = updatedWeather.Summary;
            WriteWeatherData(weatherData);

            return NoContent();
        }

        // DELETE method to remove weather data
        [HttpDelete("{date}")]
        public IActionResult Delete(DateOnly date)
        {
            var weatherData = ReadWeatherData().ToList();
            var existingWeather = weatherData.FirstOrDefault(w => w.Date == date);

            if (existingWeather == null)
            {
                return NotFound();
            }

            weatherData.Remove(existingWeather);
            WriteWeatherData(weatherData);

            return NoContent();
        }
    }

    public class WeatherForecast
    {
        public DateOnly Date { get; set; }
        public int TemperatureC { get; set; }
        public string? Summary { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
    }
}
