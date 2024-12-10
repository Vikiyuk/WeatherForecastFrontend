import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapSelector from '../components/MapSelector';

const LocationSelector = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigate = useNavigate();

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    const handleShowWeather = () => {
        if (selectedLocation) {
            console.log(selectedLocation); // Verifying the location
            navigate('/weather', { state: { location: selectedLocation } });
        } else {
            alert('Please select a location on the map first!');
        }
    };

    return (
        <div>
            <h1>Select a Location</h1>
            <MapSelector onLocationSelect={handleLocationSelect} />
            <button onClick={handleShowWeather} disabled={!selectedLocation}>
                Show Weather
            </button>
        </div>
    );
};

export default LocationSelector;
