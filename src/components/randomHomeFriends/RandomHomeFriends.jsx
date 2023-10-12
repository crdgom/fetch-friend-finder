// * RandomHomeFriends.jsx
// * Name: RandomHomeFriends
// * Description: RandomHomeFriends component with Bootstrap to display 3 random dogs from the database.
// * This component is used in Home.jsx (Home page), and the PATH is 'src/pages/home/Home.jsx'.
// * The component needs to send one login to retrieve the data from the database.
// * For security reasons, we send the login, then the server will check if the login is correct and then will send the data.
// * Pick 3 random dogs from the database and display them.
// * Then those 3 dogs will be stored in the state of the component.
// * Finally, we close the connection to the database.
// * The data sent to login is: {name: 'test', email: 'test@test.com'}
// * Since: v1.0.0

import { useState, useEffect } from 'react';
import axios from 'axios';
import './RandomHomeFriends.css'

function RandomHomeFriends() {
  const [randomFriends, setRandomFriends] = useState([]);

  useEffect(() => {
    const data = {
      name: 'test',
      email: 'test@test.com',
    };

    // Iniciar sesión y obtener el token
    axios
      .post('https://frontend-take-home-service.fetch.com/auth/login', data, {
        withCredentials: true, // Incluir cookies en la solicitud
      })
      .then((loginResponse) => {
        // Comprobar si el inicio de sesión fue exitoso
        if (loginResponse.status === 200) {
          // Obtener los perros después de iniciar sesión
          axios
            .get('https://frontend-take-home-service.fetch.com/dogs/search', {
              withCredentials: true,
            })
            .then((searchResponse) => {
              // Comprobar si la búsqueda de perros fue exitosa
              if (searchResponse.status === 200) {
                // Tomar 3 perros aleatorios
                const shuffledDogs = searchResponse.data.resultIds.sort(() => 0.5 - Math.random());
                const randomDogs = shuffledDogs.slice(0, 3);
                
                // Realizar una sola solicitud para obtener información de los perros
                axios
                  .post('https://frontend-take-home-service.fetch.com/dogs', randomDogs, {
                    withCredentials: true,
                  })
                  .then((dogResponse) => {
                    if (dogResponse.status === 200) {
                      // Obtener los datos de los perros aleatorios
                      const randomDogsData = dogResponse.data.map((dogData) => ({
                        id: dogData.id,
                        name: dogData.name,
                        description: dogData.description,
                        img: dogData.img,
                        age: dogData.age,
                        zip: dogData.zip_code,
                        breed: dogData.breed,
                      }));
                      
                      // Actualizar el estado con los perros aleatorios
                      setRandomFriends(randomDogsData);
                    } else {
                      console.error('Error al buscar perros:', dogResponse.status);
                    }
                  })
                  .catch((dogError) => {
                    console.error('Error en la búsqueda de perros:', dogError);
                  });
              } else {
                console.error('Error al buscar perros:', searchResponse.status);
              }
            })
            .catch((searchError) => {
              console.error('Error en la búsqueda de perros:', searchError);
            });
        } else {
          console.error('Inicio de sesión fallido:', loginResponse.status);
        }
      })
      .catch((loginError) => {
        console.error('Error en el inicio de sesión:', loginError);
      });
  }, []);

  // close session
  const closeSession = () => {
    axios
      .post('https://frontend-take-home-service.fetch.com/auth/logout', {}, {
        withCredentials: true,
      })
      .then((logoutResponse) => {
        if (logoutResponse.status === 200) {
          console.log('Sesión cerrada con éxito');
        } else {
          console.error('Error al cerrar sesión:', logoutResponse.status);
        }
      })
      .catch((logoutError) => {
        console.error('Error al cerrar sesión:', logoutError);
      });
  };

  closeSession();

  return (
    <div className="container card-group">
      <h3 className='latest-friends-title'>Lastest Friends</h3>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 py-5 my-5">
        {randomFriends.map((randomFriend) => (
          <div className="col mb-12 lg-4 align-items-center" key={randomFriend.id}>
            <div className="card">
              <img src={randomFriend.img} className="card-img-top" alt={randomFriend.name} />
              <div className="card-body">
                <h5 className="card-title">{randomFriend.name}</h5>
                <p className="card-text">
                <strong className='friend-breed'>{randomFriend.breed}<br /></strong>
                  <strong className='friend-age'>{randomFriend.age} years old<br /></strong> 
                  <strong className='friend-location'><i className='bi bi-geo-alt-fill'></i></strong> {randomFriend.zip}<br />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomHomeFriends;
