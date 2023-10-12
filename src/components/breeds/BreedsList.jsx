import { useState, useEffect } from 'react';
import getBreeds from '../../services/userService';

function BreedFilter() {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    // Carga la lista de razas al montar el componente
    loadBreeds();
  }, []);

  const loadBreeds = () => {
    getBreeds
      .get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setBreeds(response.data);
        } else {
          console.error('Error fetching breeds:', response.status);
        }
      })
      .catch((error) => {
        console.error('Axios error:', error);
      });
  };

  const handleBreedChange = (event) => {
    // Maneja el cambio en la selección de raza
    setSelectedBreed(event.target.value);
  };

  return (
    <div className="breed-filter">
      <h4>Filter by Breed:</h4>
      <div className="input-group mb-3">
        <select
          className="form-select"
          value={selectedBreed}
          onChange={handleBreedChange}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      <p>Selected Breed: {selectedBreed}</p>
    </div>
  );
}

export default BreedFilter;
