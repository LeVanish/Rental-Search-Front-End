import { useState } from 'react';
import { toast } from 'react-toastify';

export default function RatingForm({ rentalId }) {
  const [rating, setRating] = useState(0);

  const submitRating = async (rating) => {
    const API_URL = "http://4.237.58.241:3000/ratings/rentals/"
    const token = localStorage.getItem("token");
    return fetch(API_URL + `${rentalId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    })
      .then(response => {
        const data = response.json();
        if (!response.ok) {
          throw new Error(data.message || "Rating Failed")
        }
      })
      .then(() => toast.success("Rating submitted successfully"))
      .catch((error) => toast.error(error))
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      submitRating(rating);
    }}>
      <h3>Rate this property:</h3>
      <div className='align-horizontal'>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        />
        <button type="submit">Rate</button>
      </div>

    </form>
  )
}