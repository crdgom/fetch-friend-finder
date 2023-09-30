// * RandomHomeFriends.jsx
// * Name: RandomHomeFriends
// * Description: RandomHomeFriends component with Bootstrap to display 3 random dogs from the database.
// * this component is used in Home.jsx (Home page) an the PATH is 'src/pages/home/Home.jsx.
// * the component needs to send one login to retrieve the data from the database.
// * for security reasons we send the login, then the server will check if the login is correct and then will send the data.
// * pick 3 random dogs from the database and display them.
// * then those 3 dogs will be stored in the state of the component.
// * finally we close the connection to the database.
// * the data sended to login is: {name: 'test', email: 'test@test.com'}
// * Since: v1.0.0

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            .get('https://frontend-take-home-service.fetch.com/dogs/search',{
                withCredentials: true,
            })
            .then((searchResponse) => {
              // Comprobar si la búsqueda de perros fue exitosa
              if (searchResponse.status === 200) {
                // Actualizar el estado con los perros
                setRandomFriends(searchResponse.data.resultIds);
                // Tomar 3 perros aleatorios
                setRandomFriends((randomFriends) => randomFriends.sort(() => 0.5 - Math.random()).slice(0, 3));
                for (const i in randomFriends) {
                    const dogId = randomFriends[i];
                    axios
                        .post(`https://frontend-take-home-service.fetch.com/dogs`, [dogId], {
                            // construir el cuerpo de la solicitud pasando en un array solo los ids de los perros
                        withCredentials: true,
                        })
                        .then((dogResponse) => {
                        if (dogResponse.status === 200) {
                            console.log('Perro:', dogResponse.data);
                            setRandomFriends((randomFriends) => [
                            ...randomFriends,
                            {
                                id: dogResponse.data.id,
                                name: dogResponse.data.name,
                                description: dogResponse.data.description,
                                img: dogResponse.data.photos[0].medium,
                                age: dogResponse.data.age,
                            },
                            ]);
                        } else {
                            console.error('Error al buscar perro:', dogResponse.status);
                        }
                        })
                        .catch((dogError) => {
                        console.error('Error en la búsqueda de perro:', dogError);
                        });
                    }
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

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {randomFriends.map((randomFriend) => (
          <div className="col" key={randomFriend.id}>
            <div className="card shadow-sm">
              <img src={randomFriend.img} className="card-img-top" alt={randomFriend.name} />
              <div className="card-body">
                <h5 className="card-title">{randomFriend.name}</h5>
                <p className="card-text">{randomFriend.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <Link to={`/dog/${randomFriend.id}`} className="btn btn-sm btn-outline-secondary">
                      View
                    </Link>
                    <button type="button" className="btn btn-sm btn-outline-secondary">
                      Edit
                    </button>
                  </div>
                  <small className="text-muted">{randomFriend.age} years old</small>
                </div>
              </div>
            </div>
          </div>
        ))}
        // <div className="col" key={}>
        //   <div className="card shadow-sm">
        //     <img src="https://images.dog.ceo/breeds/terrier-american/n02093428_100.jpg" className="card-img-top" alt="..." />
        //     <div className="card-body">
        //       <h5 className="card-title">Card title</h5>
        //       <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        //       <div className="d-flex justify-content-between align-items-center">
        //         <div className="btn-group">
        //           <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
        //           <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
        //         </div>
        //         <small className="text-muted">9 mins</small>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      </div>
    </div>
  );
}

export default RandomHomeFriends;

