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
    // Specify the type of weather state
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [storedWeather, setStoredWeather] = useState<StoredWeatherData[]>([]);

    useEffect(() => {
        const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Odense&units=Metric&APPID=799070f82e616c87e1f73a8c683cfa24";

        axios.get<WeatherData>(API_URL)// Type the response to match the WeatherData structure
            .then(response => {
                setWeather(response.data);

                // Store weather data in the database
                axios.post('/weather', {
                    city: 'Odense',
                    temperature: response.data.main.temp,
                    description: response.data.weather[0].description,
                    wind_speed: response.data.wind.speed,
                    humidity: response.data.main.humidity,
                })
                    .then(() => console.log('Weather data stored successfully'))
                    .catch(error => console.error('Error storing weather data:', error));
            })
            .catch(error => console.error("Error fetching weather:", error));
    }, []);

    useEffect(() => {
        axios.get<StoredWeatherData[]>('/weather')
            .then(response => {
                console.log(response.data);
                setStoredWeather(response.data);
            })
            .catch(error => console.error("Error fetching stored weather data:", error));
    }, []);

    return (
        <div>
            <h2>Weather in Odense</h2>
            {weather ? (
                <div>
                    <p>🌡️ Temperature: {weather.main.temp}°C</p>
                    <p>🌤️ Weather: {weather.weather[0].description}</p>
                    <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
                    <p>💧 Humidity: {weather.main.humidity}%</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <h2>Stored Weather Data</h2>
            {storedWeather.length > 0 ? (
                <div>
                    {storedWeather.map((data, index) => (
                        <div key={index}>
                            <p>🏙️ City: {data.city}</p>
                            <p>🌡️ Temperature: {data.temperature}°C</p>
                            <p>🌤️ Weather: {data.description}</p>
                            <p>💨 Wind Speed: {data.wind_speed} m/s</p>
                            <p>💧 Humidity: {data.humidity}%</p>
                            <p>   Date: {data.created_at}%</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No stored weather data available.</p>
            )}
        </div>
    );
};

export default Weather;
