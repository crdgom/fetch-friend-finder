// * Card.jsx
// * Name: Card
// * Description: Card component with Bootstrap to display each dog on the API Response.
// * Since: v1.0.0
// * Author: @crdgom

import { useState, useEffect } from 'react';
import axios from 'axios';

function DogCard({ dogId, isFavorite, addFavorite, removeFavorite }) {
  const [dogDetails, setDogDetails] = useState(null);

  useEffect(() => {
    axios
      .post(
        'https://frontend-take-home-service.fetch.com/dogs',
        [dogId],
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          const dogDataResponse = response.data.map((dogDetails) => ({
            id: dogDetails.id,
            name: dogDetails.name,
            img: dogDetails.img,
            age: dogDetails.age,
            zip: dogDetails.zip_code,
            breed: dogDetails.breed,
          }));
          setDogDetails(dogDataResponse);
        } else {
          console.error('Error fetching dog details:', response.status);
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  }, []);

  if (!dogDetails) {
    return <div>Loading...</div>;
  }

  const handleToggleFavorite = (dogId) => {
    if (isFavorite(dogId)) {
      removeFavorite(dogId);
    } else {
      addFavorite(dogId);
    }
  };

  return (
    <div className="card m-1" key={dogDetails[0].id}>
      <img src={dogDetails[0].img} className="card-img-top" alt={dogDetails[0].name} />
      <div className="card-body">
        <h5 className="card-title">{dogDetails[0].name}</h5>
        <p className="card-text">
          <strong className='friend-breed'>{dogDetails[0].breed}<br /></strong>
          <strong className='friend-age'>{dogDetails[0].age} years old<br /></strong> 
          <strong className='friend-location'><i className='bi bi-geo-alt-fill'></i></strong> {dogDetails[0].zip}<br />
        </p>
        <button
          className={`btn btn-link${isFavorite(dogId) ? ' text-warning' : ''}`}
          onClick={() => handleToggleFavorite(dogId)}
        >
          <i className="bi bi-star"></i>
        </button>
      </div>
    </div>
  );
}

export default DogCard;
