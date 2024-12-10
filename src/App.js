import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LocationSelector from './pages/LocationSelector';
import WeatherPage from './pages/WeatherPage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Weather for My Location</Link></li>
                        <li><Link to="/select-location">Select Location</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<WeatherPage useCurrentLocation={true} />} />
                    <Route path="/select-location" element={<LocationSelector />} />
                    <Route path="/weather" element={<WeatherPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
