// AuthContext.js

import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Define un contexto de autenticación
const AuthContext = createContext();

// Componente de proveedor de autenticación
// Removed unused import statement

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  // Función para realizar la solicitud de inicio de sesión
  const login = async (credentials) => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', credentials, {
        withCredentials: true, // Enviar cookies con la solicitud
      });

      if (response.status === 200) {
        // Almacenar el nombre de usuario en el estado
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  // Función para cerrar sesión
  const logout = async (credentials) => {
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', credentials, {
      });
      
      if (response.status === 200) {
        setIsAuth(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acceder al contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
