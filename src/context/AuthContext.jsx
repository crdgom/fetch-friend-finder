// AuthContext.js

import { createContext, useContext, useEffect, useState } from 'react';

// Define un contexto de autenticación
const AuthContext = createContext();

// Componente de proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Función para realizar la solicitud de inicio de sesión
  const login = async (name, email) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
        credentials: 'include', // Incluye cookies en la solicitud
      });

      if (response.status === 200) {
        // El inicio de sesión fue exitoso, actualiza el estado del usuario
        setUser({ name, email });
      } else {
        console.error('Authentication failed:', response.status);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        method: 'POST',
        credentials: 'include', // Incluye cookies en la solicitud
      });

      if (response.status === 200) {
        // El cierre de sesión fue exitoso, actualiza el estado del usuario
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

// Hook personalizado para acceder al contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}

