import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { v4 as uuidv4 } from 'uuid';

// Fix for missing marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapSelector = ({ onLocationSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [mapCenter, setMapCenter] = useState([50.061, 19.937]); // Default map center
    const [zoomLevel, setZoomLevel] = useState(5); // Default zoom level
    const uniqueKey = uuidv4();

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setSelectedPosition([lat, lng]);
                setMapCenter([lat, lng]);
                setZoomLevel(e.target.getZoom());
                onLocationSelect({ latitude: lat, longitude: lng });
            },
        });

        return selectedPosition ? <Marker position={selectedPosition} /> : null;
    };

    return (
        <MapContainer
            key={uniqueKey}
            center={mapCenter} // Dynamically change the map center based on selected position
            zoom={zoomLevel} // Dynamically change the zoom level based on user click
            style={{ height: '30vw', width: '100%' }}
            scrollWheelZoom={true}
            dragging={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker />
        </MapContainer>
    );
};

export default MapSelector;
