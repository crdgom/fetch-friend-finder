import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FavoritesProvider, useFavorites } from '../../context/FavoritesContext';

// Componente de paginación
function Pagination({ nextPage, prevPage, handleNextPage, handlePrevPage }) {
  return (
    <div className="pagination">
      {prevPage && (
        <button className='btn btn-primary' onClick={handlePrevPage}>Prev</button>
      )}
      {nextPage && (
        <button className='btn btn-primary' onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
}

// Componente principal FriendsPage
function FriendsPage() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const [dogList, setDogList] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const { isFavorite, addFavorite, removeFavorite, getFavoriteDogs } = useFavorites();
  const [showPopup, setShowPopup] = useState(false);
  const [matchedDog, setMatchedDog] = useState([]);

  const handleShowPopup = () => {
    setShowPopup(false);
  };

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
    // Obtén la lista de perros favoritos
    const favoriteDogs = getFavoriteDogs();
    console.log('Favorite dogs:', favoriteDogs);
    // Verifica si hay perros favoritos antes de hacer la solicitud
    if (favoriteDogs.length === 0) {
      alert('No has seleccionado perros como favoritos.');
      return;
    }

    // Realiza la solicitud a la URL de coincidencia de perros
    axios
      .post('https://frontend-take-home-service.fetch.com/dogs/match', favoriteDogs, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const match = response.data.match;
          console.log('Resultado de coincidencia de perros:', match);
          axios.post('https://frontend-take-home-service.fetch.com/dogs', [match], {
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

  // Función para aplicar filtros
  function applyFilters() {
    const breedFilter = document.getElementById('breed-filter').value;
    const zipCodeFilter = document.getElementById('zip-code-filter').value;
    const ageMinFilter = document.getElementById('age-min-filter').value;
    const ageMaxFilter = document.getElementById('age-max-filter').value;

    // Aplica los filtros a tu lista de perros según las selecciones del usuario
    // Puedes usar métodos de filtrado de JavaScript para esto
    const filteredDogList = dogList.filter((dog) => {
      return (
        (breedFilter === '' || dog.breed === breedFilter) &&
        (zipCodeFilter === '' || dog.zip === zipCodeFilter) &&
        (ageMinFilter === '' || dog.age >= parseInt(ageMinFilter)) &&
        (ageMaxFilter === '' || dog.age <= parseInt(ageMaxFilter))
      );
    });

    // Actualiza la lista de perros con los resultados filtrados
    setDogList(filteredDogList);
  }

  // Función para restablecer los filtros
  function resetFilters() {
    document.getElementById('filter-form').reset();
    // Restablece la lista de perros a su estado original
    loadDogList('https://frontend-take-home-service.fetch.com/dogs/search');
  }

  return (
    <div className="container mt-5">
      {isAuth ? (
        <>
          <h1 className="mb-4">Welcome!</h1>
          {/* Filtros */}
          <div className="filters">
            <h4>Filters:</h4>
            <form id="filter-form">
              <div className="form-group">
                <label htmlFor="breed-filter">Breed:</label>
                <select id="breed-filter" className="form-control">
                  <option value="">All</option>
                  {/* Agrega opciones de razas aquí */}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="zip-code-filter">Zip Code:</label>
                <input
                  type="text"
                  id="zip-code-filter"
                  className="form-control"
                  placeholder="Enter Zip Code"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age-range-filter">Age Range:</label>
                <input
                  type="number"
                  id="age-min-filter"
                  className="form-control"
                  placeholder="Min Age"
                />
                <input
                  type="number"
                  id="age-max-filter"
                  className="form-control"
                  placeholder="Max Age"
                />
              </div>
              <button
                type="button"
                onClick={() => applyFilters()}
                className="btn btn-primary">
                Apply Filters
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => resetFilters()}
              >
                Reset Filters
              </button>
            </form>
          </div>
          {/* Lista de perros */}
          <div className="container card-group p4">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 py-5 my-5">
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
          <Pagination
            nextPage={nextPage}
            prevPage={prevPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
          <button className="btn btn-primary" onClick={handleMatchDogs}>
            Match Favorite Dog?
          </button>
        </>
      ) : (
        <p>Please log in to access the Friends page.</p>
      )}
    </div>
  );
}

// Componente que representa un card de perro
function DogCard({ dogId, isFavorite, addFavorite, removeFavorite }) { // Recibe isFavorite, addFavorite y removeFavorite como props
  const [dogDetails, setDogDetails] = useState(null);

  useEffect(() => {
    axios
      .post(
        'https://frontend-take-home-service.fetch.com/dogs',
        [dogId], // Pasa el ID del perro en el cuerpo como un array
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
      removeFavorite(dogId); // Si ya es favorito, quítalo de la lista de favoritos
    } else {
      addFavorite(dogId); // Si no es favorito, agrégalo a la lista de favoritos
    }
  };

  function MatchedDogPopup({ matchedDog, onClose }) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="btn btn-danger popup-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
          <h2>Matched Dogs</h2>
          <div className="matched-dogs">
            {matchedDog.map((dog) => (
              <div key={dog.id} className="matched-dog">
                <img src={dog.img} alt={dog.name} />
                <h3>{dog.name}</h3>
                <p>{dog.breed}</p>
                <p>Age: {dog.age} years old</p>
                <p>Zip Code: {dog.zip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }


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
        {/* Botón de estrella clickeable */}
        <button
          className={`btn btn-link${isFavorite(dogId) ? ' text-warning' : ''}`}
          onClick={() => handleToggleFavorite(dogId)}
        >
          <i className="bi bi-star"></i> {/* Ícono de estrella de Bootstrap */}
        </button>
      </div>
    </div>
  );
}

export default FriendsPage;
