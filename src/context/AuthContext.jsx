// * AuthProvider.js
// * Name: AuthProvider
// * Description: Custom context for managing user authentication.
// * Since: v1.0.0
// * Author: @crdgom

import { createContext, useContext, useState } from 'react';
import userServices from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await userServices.post('/auth/login', credentials, {
        withCredentials: true, // Enviar cookies con la solicitud
      });
      const { data } = response.headers;
      console.log('la data es ', data);
  
      if (response.status === 200) {
        // Obtener el valor de la cookie de la respuesta
        const accessTokenCookie = document.cookie
        console.log(accessTokenCookie);
        // Almacenar el valor de la cookie en el localStorage
        localStorage.setItem('fetch-access-token', accessTokenCookie);
  
        // Actualizar el estado del usuario u otras acciones necesarias
        setUser(credentials);
      } else {
        console.error('Authentication failed:', response.status);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await userServices.post('/auth/logout', null, {
        withCredentials: true, // Enviar cookies con la solicitud
      });

      if (response.status === 200) {
        // Borrar la cookie de sesión
        setSessionCookie('fetch-access-token', '');
        // Limpiar el estado del usuario
        setUser(null);
      } else {
        console.error('Logout failed:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
