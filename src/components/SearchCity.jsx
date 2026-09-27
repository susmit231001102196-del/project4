function SearchCity({ city, onCityChange, onSubmit, loading }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label className="search-field" htmlFor="city-search">
        <span>Search City</span>
        <input
          id="city-search"
          type="text"
          value={city}
          onChange={onCityChange}
          placeholder="Enter city name"
          disabled={loading}
        />
      </label>

      <button type="submit" className="search-button" disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
    </form>
  )
}

export default SearchCity
