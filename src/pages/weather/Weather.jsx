import { useState } from "react";
import axios from "axios";
import SearchBar from "../../components/weather/SearchBar";
import WeatherCard from "../../components/weather/WeatherCard";

/**
 * Weather component for Vite + React + Tailwind
 *
 * Notes:
 * - Place video.mp4 in the project public/ folder -> accessible at "/video.mp4"
 * - Put your OpenWeather API key in .env as: VITE_WEATHER_API_KEY=your_key
 *   then access it via import.meta.env.VITE_WEATHER_API_KEY
 */

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "";
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async (city) => {
    if (!city) {
      setError("Please enter a city.");
      setWeather(null);
      return;
    }

    if (!API_KEY) {
      setError("Missing API key. Please set VITE_WEATHER_API_KEY in your .env");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const url = `${API_URL}?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("City not found. Please try again.");
      } else {
        setError("An error occurred. Please try again later.");
      }
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 relative overflow-hidden">
      {/* Background video from public/ -> refer by absolute path */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        aria-hidden="true"
      >
        <source src="/video.mp4" type="video/mp4" />
        {/* fallback text */}
      </video>

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Main card */}
      <main className="relative z-10 bg-black/70 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>

        {/* SearchBar is expected to call fetchWeather(city) */}
        <SearchBar fetchWeather={fetchWeather} />

        {loading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </main>
    </div>
  );
}

export default Weather;
