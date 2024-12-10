import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import WeatherTable from '../components/WeatherTable';

const WeatherPage = () => {
    const location = useLocation();
    const selectedLocation = location.state?.location || null;
    const [locationToUse, setLocationToUse] = useState(selectedLocation);

    console.log("Selected Location in WeatherPage:", selectedLocation);

    // Only fetching current location if no location is passed via state
    useEffect(() => {
        if (!selectedLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocationToUse({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            });
        }
    }, [selectedLocation]);

    return (
        <div>
            <h1>Weather Forecast</h1>
            <WeatherTable location={locationToUse} />
        </div>
    );
};

export default WeatherPage;
