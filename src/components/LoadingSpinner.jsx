function LoadingSpinner() {
  return (
    <div className="loading-state" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p>Fetching weather data...</p>
    </div>
  )
}

export default LoadingSpinner
