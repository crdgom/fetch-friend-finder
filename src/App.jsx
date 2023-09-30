import './App.css'; // Puedes importar tus estilos CSS personalizados aquí si los tienes.
import Login from './pages/Login'; // Importa el componente Login
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="App">
        <Header />
        <main>
          {/* Envolvemos las rutas con el enrutador de React Router */}
          <Routes>
              {/* Rutas protegidas */}
              

              {/* Redireccionar a la página de inicio de sesión si no se encuentra ninguna ruta */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              {/* Puedes agregar una ruta de página no encontrada si lo deseas */}
              <Route path="*" component={() => <h1>Página no encontrada</h1>} />
              </Routes>
          
        </main>
      </div>
      <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
