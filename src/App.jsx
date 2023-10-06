import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Friends from './pages/Friends';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                {/* Rutas protegidas */}
                <Route path="/find-new-friend" element={<Friends />} />
                {/* Redireccionar a la página de inicio de sesión si no se encuentra ninguna ruta */}
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                {/* Puedes agregar una ruta de página no encontrada si lo deseas */}
                <Route path="*" element={() => <h1>Página no encontrada</h1>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;

