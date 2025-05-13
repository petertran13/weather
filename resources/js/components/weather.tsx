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

const Weather = () => {
    // Specify the type of weather state
    const [weather, setWeather] = useState<WeatherData | null>(null);

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
        </div>
    );
};

export default Weather;
