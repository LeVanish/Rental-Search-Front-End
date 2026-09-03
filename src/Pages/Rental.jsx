import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Map, Marker } from "pigeon-maps";
import RatingForm from '../Components/RatingForm';
import '../Styles/Rental.css';

export default function Rental() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [raingDate, setRatingDate] = useState(null);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const token = localStorage.getItem("token");
  const API_URL = "http://4.237.58.241:3000/"

  useEffect(() => {
    fetch(API_URL + `rentals/${id}`)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(e => { console.log(e) })
  }, [id]);

  useEffect(() => {
    if (!token) return;

    fetch(API_URL + `ratings/rentals/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserRating(data.rating);
        setRatingDate(data.dateTime);
      })
      .catch(error => {
        console.log(error);
        setUserRating(null);
        setRatingDate(null);
      })
  })

  return (
    <div className='align-column'>
      <h2 className="pb-4">{data.title}</h2>
      <h3>Description:</h3>
      <div className="pb-4" dangerouslySetInnerHTML={{ __html: data.description }} />

      <div className="container">
        <div className="rental-info">
          <h3>Rental info:</h3>
          <ul>
            <li>Rent: ${data.rent}</li>
            <li>Property Type: {data.propertyType}</li>
            <li>Locality: {data.locality}</li>
            <li>Postcode: {data.postcode}</li>
            <li>State: {data.state}</li>
            <li>Street Address: {data.streetAddress}</li>
            <li>Suburb: {data.suburb}</li>
            <li>Bathrooms: {data.bathrooms}</li>
            <li>Bedrooms: {data.bedrooms}</li>
            <li>Parking spaces: {data.parkingSoaces}</li>
            <li>Agency: {data.agencyName}</li>
            <li>Amenities: {data.amenities}</li>
            <li>Rating: {data.averageRating} Stars ({data.numRatings})</li>
          </ul>
        </div>

        <div className='rating-info'>
          {!token && (
            <p>
              To rate this property you have to {" "}
              <Link to="/login">
                <button type='button' className='button-link '>Login</button>
              </Link>
            </p>
          )}

          {token && (
            <div className="align-column">
              {userRating ? (
                <h3>Your rating: {userRating}</h3>
              ) : (
                <h3>Not rated by you yet</h3>
              )}
              <RatingForm rentalId={id} />
            </div>
          )}
        </div>
      </div>

      <h4>Location</h4>
      <Map height={500} defaultCenter={[-26.237409, 134.534196]} defaultZoom={4.5}>
        <Marker width={50} anchor={[data.latitude, data.longitude]} />
      </Map>
    </div>
  )
}