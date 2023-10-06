import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (dogId) => {
    setFavorites((prevFavorites) => [...prevFavorites, dogId]);
  };

  const removeFavorite = (dogId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== dogId));
  };

  const isFavorite = (dogId) => {
    return favorites.includes(dogId);
  };
  
  const getFavoriteDogs = () => {
    return favorites;
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, getFavoriteDogs }}>
      {children}
    </FavoritesContext.Provider>
  );
};

