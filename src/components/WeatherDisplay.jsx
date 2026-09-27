function formatTime(timestamp) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function WeatherDisplay({ weather }) {
  const { name, main, wind, sys, weather: weatherDetails } = weather
  const condition = weatherDetails?.[0]
  const iconUrl = condition?.icon
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : ''

  return (
    <section className="weather-panel" aria-live="polite">
      <div className="weather-top">
        <div>
          <h2 className="city-name">{name}</h2>
          <p className="weather-condition">{condition?.description}</p>
        </div>

        {iconUrl ? <img src={iconUrl} alt={condition.description} className="weather-icon" /> : null}
      </div>

      <div className="temp-row">
        <span className="temp-value">{Math.round(main.temp)}</span>
        <span className="temp-unit">°C</span>
      </div>

      <div className="weather-metrics">
        <div className="metric-box">
          <span>Humidity</span>
          <strong>{main.humidity}%</strong>
        </div>

        <div className="metric-box">
          <span>Wind Speed</span>
          <strong>{wind.speed} m/s</strong>
        </div>

        <div className="metric-box">
          <span>Sunrise</span>
          <strong>{formatTime(sys.sunrise)}</strong>
        </div>

        <div className="metric-box">
          <span>Sunset</span>
          <strong>{formatTime(sys.sunset)}</strong>
        </div>
      </div>
    </section>
  )
}

export default WeatherDisplay
