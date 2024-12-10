import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faCloudShowersHeavy, faSnowflake, faBolt, faSmog } from '@fortawesome/free-solid-svg-icons';

const WeatherTable = ({ location }) => {
    const [forecast, setForecast] = useState([]);
    const [weeklySummary, setWeeklySummary] = useState({});

    const getWeatherIcon = (wmo_code) => {
        const icon_map = {
            0: faSun,
            1: faCloudSun,
            2: faCloud,
            3: faCloud,
            45: faSmog,
            48: faSmog,
            51: faCloudRain,
            53: faCloudRain,
            55: faCloudRain,
            56: faCloudRain,
            57: faCloudRain,
            61: faCloudShowersHeavy,
            63: faCloudShowersHeavy,
            65: faCloudShowersHeavy,
            66: faCloudShowersHeavy,
            67: faCloudShowersHeavy,
            71: faSnowflake,
            73: faSnowflake,
            75: faSnowflake,
            77: faSnowflake,
            80: faCloudShowersHeavy,
            81: faCloudShowersHeavy,
            82: faCloudShowersHeavy,
            85: faSnowflake,
            86: faSnowflake,
            95: faBolt,
            96: faBolt,
            99: faBolt,
        };
        return icon_map[wmo_code] || faCloud;
    };

    useEffect(() => {
        if (location) {
            const { latitude, longitude } = location;

            const fetchWeatherData = async () => {
                try {
                    const forecastResponse = await axios.get('http://localhost:5000/weather_forecast', {
                        params: { latitude, longitude }
                    });
                    setForecast(forecastResponse.data);
                } catch (error) {
                    console.error('Error fetching forecast data:', error);
                    alert(`Error fetching forecast data: ${error.response?.data?.error || error.message}`);
                }

                try {
                    const summaryResponse = await axios.get('http://localhost:5000/weekly_weather_summary', {
                        params: { latitude, longitude }
                    });
                    setWeeklySummary(summaryResponse.data);
                } catch (error) {
                    console.error('Error fetching summary data:', error);
                    alert(`Error fetching summary data: ${error.response?.data?.error || error.message}`);
                }
            };

            fetchWeatherData();
        }
    }, [location]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="forecast-table-container">
            {location && (
                <>
                    <h2>7-Day Weather Forecast</h2>
                    <div className="forecast-container">
                        <div className="forecast-row">
                            {forecast.map((day, index) => (
                                <div key={index} className="forecast-cell header">
                                    {capitalizeFirstLetter(new Date(day.date).toLocaleDateString('pl-PL', { weekday: 'long' }))}
                                </div>
                            ))}
                        </div>
                        <div className="forecast-row">
                            {forecast.map((day, index) => (
                                <div key={index} className="forecast-cell">
                                    {new Date(day.date).toLocaleDateString('pl-PL')}
                                </div>
                            ))}
                        </div>
                        <div className="forecast-row">
                            {forecast.map((day, index) => (
                                <div key={index} className="forecast-cell icon">
                                    <FontAwesomeIcon icon={getWeatherIcon(day.weather_icon)} />
                                </div>
                            ))}
                        </div>
                        <div className="forecast-row">
                            {forecast.map((day, index) => (
                                <div key={index} className="forecast-cell">
                                    {day.max_temp ? day.max_temp.toFixed(1) : '-'}°C / {day.min_temp ? day.min_temp.toFixed(1) : '0'}°C
                                </div>
                            ))}
                        </div>
                        <div className="forecast-row">
                            {forecast.map((day, index) => (
                                <div key={index} className="forecast-cell">
                                    {day.energy_generated_kWh ? day.energy_generated_kWh.toFixed(1) : '0'} kWh
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="summary-container">
                        <h2>Weekly Summary</h2>
                        <footer>
                            <p>Max Temperature: {weeklySummary.max_temp ? weeklySummary.max_temp.toFixed(1) : '0'}°C</p>
                            <p>Min Temperature: {weeklySummary.min_temp ? weeklySummary.min_temp.toFixed(1) : '0'}°C</p>
                            <p>Average Pressure: {weeklySummary.avg_pressure ? weeklySummary.avg_pressure.toFixed(1) : '0'} hPa</p>
                            <p>Average Sunshine Duration: {weeklySummary.avg_sunshine ? weeklySummary.avg_sunshine.toFixed(1) : '0'} hours</p>
                            <p>{weeklySummary.weather_summary || '-'}</p>
                        </footer>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherTable;
