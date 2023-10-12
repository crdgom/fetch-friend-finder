import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import BreedFilter from '../breeds/BreedsList';

function FriendsPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [dogList, setDogList] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const { isFavorite, addFavorite, removeFavorite, getFavoriteDogs } = useFavorites();
  const [showPopup, setShowPopup] = useState(false);
  const [matchedDog, setMatchedDog] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isAuth) {
      loadDogList('https://frontend-take-home-service.fetch.com/dogs/search');
    }
  }, [isAuth]);

  const handleMatchDogs = () => {
    const favoriteDogs = getFavoriteDogs();
    if (favoriteDogs.length === 0) {
      alert('No has seleccionado perros como favoritos.');
      return;
    }

    axios
      .post('https://frontend-take-home-service.fetch.com/dogs/match', favoriteDogs, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const match = response.data.match;
          axios
            .post('https://frontend-take-home-service.fetch.com/dogs', [match], {
              withCredentials: true,
            })
            .then((match) => {
              if (match.status === 200) {
                const dogMatch = match.data.map((dogMatchDetails) => ({
                  id: dogMatchDetails.id,
                  name: dogMatchDetails.name,
                  img: dogMatchDetails.img,
                  age: dogMatchDetails.age,
                  zip: dogMatchDetails.zip_code,
                  breed: dogMatchDetails.breed,
                }));
                setMatchedDog(dogMatch);
                setShowPopup(true);
              } else {
                console.error('Error al hacer coincidir perros:', response.status);
              }
            })
            .catch((error) => {
              console.error('Error de Axios al hacer coincidir perros:', error);
            });
        } else {
          console.error('Error al hacer coincidir perros:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error de Axios al hacer coincidir perros:', error);
      });
  };

  const loadDogList = (url) => {
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          const { resultIds, next, prev } = response.data;
          setDogList(resultIds);
          setNextPage(next);
          setPrevPage(prev);
        } else {
          console.error('Error fetching dog list:', response.status);
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  const handleNextPage = () => {
    if (nextPage) {
      loadDogList(`https://frontend-take-home-service.fetch.com${nextPage}`);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      loadDogList(`https://frontend-take-home-service.fetch.com${prevPage}`);
    }
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  function applyFilters() {
    let apiUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';

    if (selectedBreed) {
      apiUrl += `breeds=${selectedBreed}&`;
    }

    if (zipCode) {
      apiUrl += `zipCodes=${zipCode}&`;
    }

    if (ageMin) {
      apiUrl += `ageMin=${ageMin}&`;
    }

    if (ageMax) {
      apiUrl += `ageMax=${ageMax}&`;
    }

    loadDogList(apiUrl);
  }

  const handleResetFilters = () => {
    setSelectedBreed('');
    setZipCode('');
    setAgeMin('');
    setAgeMax('');

    loadDogList('https://frontend-take-home-service.fetch.com/dogs/search');
  };

  return (
    <div className="container mt-5">
      {isAuth ? (
        <>
          <h1 className="mb-4">Welcome!</h1>
          {/* Filtros */}
          <div className="filters">
            <h4>Filters:</h4>
            <div className="row">
              <div className="col-md-3">
                <BreedFilter />
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="zip-code-filter">Zip Code:</label>
                  <input
                    type="text"
                    id="zip-code-filter"
                    className="form-control"
                    placeholder="Enter Zip Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label htmlFor="age-range-filter">Age Range:</label>
                  <input
                    type="number"
                    id="age-min-filter"
                    className="form-control"
                    placeholder="Min Age"
                    value={ageMin}
                    onChange={(e) => setAgeMin(e.target.value)}
                  />
                  <input
                    type="number"
                    id="age-max-filter"
                    className="form-control"
                    placeholder="Max Age"
                    value={ageMax}
                    onChange={(e) => setAgeMax(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
          {/* Lista de perros */}
          <div className="container card-group">
            <div className="row">
              {dogList.map((dogId) => (
                <DogCard
                  key={dogId}
                  dogId={dogId}
                  isFavorite={isFavorite}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                />
              ))}
            </div>
          </div>
          <div className="pagination">
            {prevPage && (
              <button className="btn btn-primary" onClick={handlePrevPage}>
                Prev
              </button>
            )}
            {nextPage && (
              <button className="btn btn-primary" onClick={handleNextPage}>
                Next
              </button>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleMatchDogs}>
            Match Favorite Dog?
          </button>
          {showPopup && (
            <div className="popup fullscreen-popup">
              {matchedDog.map((dog) => (
                <div key={dog.id} className="popup-content text-center">
                  <img src={dog.img} alt={dog.name} className="rounded-circle" width="150" height="150" />
                  <h3>{dog.name}</h3>
                  <button className="close-btn btn btn-secondary" onClick={() => setShowPopup(false)}>
                    Close
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Please log in to access the Friends page.</p>
      )}
    </div>
  );
  
}
  
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
    }, [dogId]);
  
    if (!dogDetails) {
      return <div>Loading...</div>;
    }
  
    const handleToggleFavorite = (dogId) => {
      if (isFavorite(dogId)) {
        removeFavorite(dogId);
      } else {
        addFavorite(dogId);
      }
    }
  
    return (
      <div className="col-sm-12 col-md-4">
        <div className="card m-1 p-0" key={dogDetails[0].id}>
          <img src={dogDetails[0].img} className="card-img-top" alt={dogDetails[0].name} />
          <div className="card-body">
            <h5 className="card-title">{dogDetails[0].name}</h5>
            <p className="card-text">
              <strong className='friend-breed'>{dogDetails[0].breed}<br /></strong>
              <strong className='friend-age'>{dogDetails[0].age} years old<br /></strong> 
              <strong className='friend-location'><i className='bi bi-geo-alt-fill'></i></strong> {dogDetails[0].zip}<br />
            </p>
            <button
              className={`btn btn-link${isFavorite(dogId) ? ' text-warning' : ''} m-3`}
              onClick={() => handleToggleFavorite(dogId)}
            >
              <i className="bi bi-star h2"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default FriendsPage;
  