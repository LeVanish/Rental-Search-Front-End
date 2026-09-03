import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import '../Styles/AdvancedSearchForm.css';

export default function AdvancedSearchForm({ onSearch }) {
  const [states, setStates] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const initialFilters = {
    suburb: "",
    state: "",
    postcode: "",
    minimumRent: "",
    maximumRent: "",
    minimumBathrooms: "",
    maximumBathrooms: "",
    minimumBedrooms: "",
    maximumBedrooms: "",
    minimumParking: "",
    maximumParking: "",
    propertyTypes: [],
    minimumRating: "",
    maximumRating: "",
    sortBy: "",
    sortOrder: ""
  };
  const [filters, setFilters] = useState(initialFilters);

  const API_URL = "http://4.237.58.241:3000/rentals/";

  useEffect(() => {
    fetch(API_URL + `states`)
      .then(response => response.json())
      .then(data => setStates(data))
      .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    fetch(API_URL + `property-types`)
      .then(response => response.json())
      .then(data => setPropertyTypes(data))
      .catch(error => console.log(error))
  }, []);

  const buildQuery = (filters) => {
    const searchParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) return;

      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v));
      }
      else {
        searchParams.append(key, value);
      }
    });

    return searchParams.toString();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters(prev => {
      const updated = {
        ...prev,
        [name]: value
      };

      if (name === "sortBy" && !value) {
        updated.sortOrder = "";
      }

      return updated;
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(buildQuery(filters));
  }


  return (
    <form className="center-page" onSubmit={handleSubmit}>
      <label>State</label>
      <div>
        {states.map((state) => (
          <label key={state} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="state"
              value={state}
              checked={filters.state === state}
              onChange={handleChange}
            />
            {state}
          </label>
        ))}
      </div>

      <h5>Advanced Search</h5>

      <div className="align-horizontal">
        <div>
          <label>Property Types</label>
          {propertyTypes.map((type) => (
            <label key={type} style={{ display: "block" }}>
              <input
                type="checkbox"
                value={type}
                checked={filters.propertyTypes.includes(type)}
                onChange={(event) => {
                  const checked = event.target.checked;

                  setFilters(prev => ({
                    ...prev,
                    propertyTypes: checked
                      ? [...prev.propertyTypes, type]
                      : prev.propertyTypes.filter(t => t !== type)
                  }));
                }}
              />
              {type}
            </label>
          ))}
        </div>



        <div className="form-grid">
          <div className="field-group">
            <input name="suburb" value={filters.suburb} placeholder="Suburb" onChange={handleChange} />
            <input name="postcode" value={filters.postcode} type="number" placeholder="Postcode" onChange={handleChange} />
          </div>

          <div className="field-group">
            <input name="minimumRent" value={filters.minimumRent} type="number" placeholder="Min Rent ($)" onChange={handleChange} />
            <input name="maximumRent" value={filters.maximumRent} type="number" placeholder="Max Rent ($)" onChange={handleChange} />
          </div>

          <div className="field-group">
            <input name="minimumBathrooms" value={filters.minimumBathrooms} type="number" min="0" placeholder="Min Bathrooms" onChange={handleChange} />
            <input name="maximumBathrooms" value={filters.maximumBathrooms} type="number" min={filters.minimumBathrooms} placeholder="Max Bathrooms" onChange={handleChange} />
          </div>

          <div className="field-group">
            <input name="minimumBedrooms" value={filters.minimumBedrooms} type="number" min="0" placeholder="Min Bedrooms" onChange={handleChange} />
            <input name="maximumBedrooms" value={filters.maximumBedrooms} type="number" min={filters.minimumBedrooms} placeholder="Max Bedrooms" onChange={handleChange} />
          </div>

          <div className="field-group">
            <input name="minimumParking" value={filters.minimumParking} type="number" min="0" placeholder="Min Parking" onChange={handleChange} />
            <input name="maximumParking" value={filters.maximumParking} type="number" min={filters.minimumParking} placeholder="Max Parking" onChange={handleChange} />
          </div>

          <div className="field-group">
            <input name="minimumRating" value={filters.minimumRating} type="number" min="1" max="5" step="0.1" placeholder="Min Rating" onChange={handleChange} />
            <input name="maximumRating" value={filters.maximumRating} type="number" min={filters.minimumRating} max="5" step="0.1" placeholder="Max Rating" onChange={handleChange} />
          </div>

          <div className="field-group">
            <label>Sort By</label>
            <select name="sortBy" onChange={handleChange}>
              <option value="">None</option>
              <option value="id">Property ID</option>
              <option value="title">Title</option>
              <option value="rent">Rent</option>
              <option value="propertyType">Property Type</option>
              <option value="postcode">Postcode</option>
              <option value="state">State</option>
              <option value="suburb">Suburb</option>
              <option value="bathrooms">Bathrooms</option>
              <option value="bedrooms">Bedrooms</option>
              <option value="parkingSpaces">Parking Spaces</option>
              <option value="averageRating">Rating</option>
              <option value="numRatings">Total Ratings</option>
              <option value="latitude">Latitude</option>
              <option value="longitude">Longitude</option>
            </select>

            <label>Sort Order</label>
            <select name="sortOrder" onChange={handleChange} disabled={!filters.sortBy}>
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

        </div>
      </div>
      <div className="field-group">
        <button type="submit">Search</button>
        <button
          type="submit"
          onClick={() => setFilters(initialFilters)}>
          Reset
        </button>
      </div>
    </form>
  );
}


