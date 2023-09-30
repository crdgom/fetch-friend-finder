import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function FriendsPage() {
    const navigate = useNavigate();
    const { isAuth, login, logout } = useAuth();
    const [dogList, setDogList] = useState([]);
    const [filterParams, setFilterParams] = useState({
      breeds: [],
      zipCodes: [],
      ageMin: '',
      ageMax: '',
    });

    useEffect(() => {
        if (!isAuth) {
          // Si el usuario no está autenticado, redirige a la página de inicio de sesión
          navigate('/login');
        }
    
        const loadDogList = async () => {
          try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/search', filterParams, {
              withCredentials: true,
            });
    
            if (response.status === 200) {
              const data = response.data;
              setDogList(data.dogList);
            } else {
              console.error('Error fetching dog list:', response.status);
            }
          } catch (error) {
            console.error('Axios error:', error);
          }
        };
    
        loadDogList();
      }, [isAuth, filterParams, navigate]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilterParams((prevParams) => ({
        ...prevParams,
        [name]: value,
        }));
    };

    const handleSearch = () => {
        loadDogList();
    };

  return (
    <div className="container mt-5">
      {isAuth ? (
        <>
          <h1 className="mb-4">Welcome!</h1>
          {/* Componente de filtrado de perros */}
          <div className="mb-4">
            <h2>Filter Dogs</h2>
            <div className="row">
              <div className="col-md-3">
                <label className="form-label">Breeds:</label>
                <input
                  type="text"
                  className="form-control"
                  name="breeds"
                  value={filterParams.breeds}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Zip Codes:</label>
                <input
                  type="text"
                  className="form-control"
                  name="zipCodes"
                  value={filterParams.zipCodes}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Minimum Age:</label>
                <input
                  type="number"
                  className="form-control"
                  name="ageMin"
                  value={filterParams.ageMin}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Maximum Age:</label>
                <input
                  type="number"
                  className="form-control"
                  name="ageMax"
                  value={filterParams.ageMax}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* Lista de perros */}
          <div>
            <h2>Dog List</h2>
            <ul className="list-group">
              {dogList.map((dog) => (
                <li className="list-group-item" key={dog.id}>
                  <h5>{dog.name}</h5>
                  <p>Age: {dog.age}</p>
                  {/* Mostrar otros detalles del perro */}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Please log in to access the Friends page.</p>
      )}
    </div>
  );
}

export default FriendsPage;
