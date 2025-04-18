// `pages/WeatherPage.tsx`
import React from 'react';
import Weather from '../components/weather';

const weatherPage: React.FC = () => {
    return (
        <div>
            <h1>Weather Information</h1>
            <Weather/>
        </div>
    );
};

export default weatherPage;
