import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LocationSelector from './pages/LocationSelector';
import WeatherPage from './pages/WeatherPage';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Switch} from "@mui/material";
import { DarkMode, LightMode } from '@mui/icons-material';

const App = () => {
    // Set the default mode to light (false for light mode)
    const [toggleDarkMode, setToggleDarkMode] = useState(false);

    const toggleDarkTheme = () => {
        setToggleDarkMode(!toggleDarkMode);
    };

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#90caf9',
            },
            secondary: {
                main: '#f48fb1',
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#90caf9',
            },
            secondary: {
                main: '#f48fb1',
            },
        },
    });

    useEffect(() => {
        if (toggleDarkMode) {
            document.body.style.backgroundImage = 'none';
            document.querySelectorAll('div.forecast-cell').forEach((element) => {
                element.style.backgroundColor = '#3498db';
            });
        } else {
            document.body.style.backgroundImage = '';
            document.querySelectorAll('a, div, button').forEach((element) => {
                element.style.backgroundColor = '';
            });
        }
    }, [toggleDarkMode]);

    return (
        <ThemeProvider theme={toggleDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Router>
                <div className="App">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h2>
                            {toggleDarkMode ? <DarkMode fontSize="large" /> : <LightMode fontSize="large" />}
                        </h2>
                        <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
                    </div>
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
        </ThemeProvider>
    );
};

export default App;
