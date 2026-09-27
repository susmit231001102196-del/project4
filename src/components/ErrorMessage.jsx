function ErrorMessage({ message }) {
  return (
    <div className="error-box" role="alert">
      <strong>Weather unavailable</strong>
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage
