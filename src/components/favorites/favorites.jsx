import { useFavorites } from '../../context/FavoritesContext';

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((dogId) => (
            <li key={dogId}>
              {/* Renderizar la información del perro favorito */}
              <span>{dogId}</span>
              <button onClick={() => removeFavorite(dogId)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;

