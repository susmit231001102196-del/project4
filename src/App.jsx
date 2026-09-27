import { useEffect, useState } from 'react'
import './App.css'
import SearchCity from './components/SearchCity'
import WeatherDisplay from './components/WeatherDisplay'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

function App() {
  const [city, setCity] = useState('London')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (cityName) => {
    const trimmedCity = cityName.trim()

    if (!trimmedCity) {
      setError('Please enter a valid city name.')
      return
    }

    if (!API_KEY) {
      setError('Please add your OpenWeather API key in a .env file as VITE_WEATHER_API_KEY')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(trimmedCity)}&appid=${API_KEY}&units=metric`,
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || 'City not found. Please try another place.')
      }

      const data = await response.json()
      setWeather(data)
      setCity('')
    } catch (err) {
      setWeather(null)
      setError(err.message || 'Unable to fetch weather information.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchWeather('London')
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await fetchWeather(city)
  }

  return (
    <div className="weather-app">
      <div className="weather-card">
        <header className="weather-header">
          <div>
            <p className="eyebrow">Forecast</p>
            <h1>Weather Search</h1>
          </div>
        </header>

        <SearchCity
          city={city}
          onCityChange={(event) => setCity(event.target.value)}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {loading && <LoadingSpinner />}
        {error && !loading && <ErrorMessage message={error} />}
        {!loading && weather && !error && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  )
}

export default App
