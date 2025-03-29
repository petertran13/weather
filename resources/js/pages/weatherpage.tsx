// `pages/WeatherPage.tsx`
import React from 'react';
import Weather from '../components/weather'; // Adjust the import path as necessary

const weatherPage: React.FC = () => {
    return (
        <div>
            <h1>Weather Information</h1>
            <Weather/>
        </div>
    );
};

export default weatherPage;
