import { useState, useEffect } from "react";
import axios from "axios";

interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: { description: string }[];
    wind: {
        speed: number;
    };
}

interface StoredWeatherData {
    city: string;
    temperature: number;
    description: string;
    wind_speed: number;
    humidity: number;
    created_at: string;
}

const Weather = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [storedWeather, setStoredWeather] = useState<StoredWeatherData[]>([]);
    const [city, setCity] = useState("");

    const fetchWeather = (cityName: string) => {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=799070f82e616c87e1f73a8c683cfa24`;

        axios.get<WeatherData>(API_URL)
            .then(response => {
                setWeather(response.data);

                axios.post('/weather', {
                    city: cityName,
                    temperature: response.data.main.temp,
                    description: response.data.weather[0].description,
                    wind_speed: response.data.wind.speed,
                    humidity: response.data.main.humidity,
                })
                    .then(() => console.log('Weather data stored successfully'))
                    .catch(error => console.error('Error storing weather data:', error));
            })
            .catch(error => console.error("Error fetching weather:", error));
    };

    useEffect(() => {
        fetchWeather(city);
    }, []);

    useEffect(() => {
        axios
            .get<StoredWeatherData[]>('/weather')
            .then((response) => {
                setStoredWeather(response.data);
            })
            .catch((error) => console.error('Error fetching stored weather data:', error));
    }, []);

    return (
        <div className="div1">
            <div className="mb-6">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name! :D"
                    className="searchBar"
                />
                <button onClick={() => fetchWeather(city)} className="searchButton">Search</button>
            </div>

            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Weather in {city}</h2>
                {weather ? (
                    <div className="bg-white shadow rounded-lg p-4 mb-6">
                        <p>🌡️ Temperature: {weather.main.temp}°C</p>
                        <p>🌤️ Weather: {weather.weather[0].description}</p>
                        <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
                        <p>💧 Humidity: {weather.main.humidity}%</p>
                        <p>
                            📅 Date: {new Date().toLocaleDateString('da-DK')}, Time:{" "}
                            {new Date().toLocaleTimeString('da-DK', { hour12: false })}
                        </p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

                <h2 className="text-2xl font-bold mb-4">Stored Weather Data</h2>
                {storedWeather.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {storedWeather.map((data, index) => (
                            <div key={index} className="bg-white shadow rounded-lg p-4">
                                <p className="font-semibold">🏙️ {data.city}</p>
                                <p>🌡️ Temperature: {data.temperature}°C</p>
                                <p>🌤️ Weather: {data.description}</p>
                                <p>💨 Wind Speed: {data.wind_speed} m/s</p>
                                <p>💧 Humidity: {data.humidity}%</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    📅 {new Date(data.created_at).toLocaleDateString('da-DK')}{" "}
                                    {new Date(data.created_at).toLocaleTimeString('da-DK', { hour12: false })}
                                </p>
                                <hr />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No stored weather data available.</p>
                )}
            </div>
        </div>
    );
};

export default Weather;
