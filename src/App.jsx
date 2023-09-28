import './App.css'; // Puedes importar tus estilos CSS personalizados aquí si los tienes.
import Login from './pages/Login'; // Importa el componente Login
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import Header from './components/header/Header';
import Footer from './components/footer/Footer';


// Componentes para las rutas protegidas
const ProtectedRoute1 = () => {
  const { user } = useAuth();
  return user ? <h1>Ruta Protegida 1</h1> : <Redirect to="/login" />;
};

const ProtectedRoute2 = () => {
  const { user } = useAuth();
  return user ? <h1>Ruta Protegida 2</h1> : <Redirect to="/login" />;
};

const ProtectedRoute3 = () => {
  const { user } = useAuth();
  return user ? <h1>Ruta Protegida 3</h1> : <Redirect to="/login" />;
};

// Componentes para las rutas no protegidas
const PublicRoute1 = () => <><h1>Ruta Pública 1</h1></>;
const PublicRoute2 = () => <h1>Ruta Pública 2</h1>;
const PublicRoute3 = () => <h1>Ruta Pública 3</h1>;

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
              <Route path="/protected-route-1" component={ProtectedRoute1} />
              <Route path="/protected-route-2" component={ProtectedRoute2} />
              <Route path="/protected-route-3" component={ProtectedRoute3} />

              {/* Rutas no protegidas */}
              <Route path="/public-route-1" component={PublicRoute1} />
              <Route path="/public-route-2" component={PublicRoute2} />
              <Route path="/public-route-3" component={PublicRoute3} />

              {/* Redireccionar a la página de inicio de sesión si no se encuentra ninguna ruta */}
              <Route path="/login" element={<Login />} />

              {/* Puedes agregar una ruta de página no encontrada si lo deseas */}
              <Route path="*" component={() => <h1>Página no encontrada</h1>} />
              </Routes>
          {/* Otras partes de tu aplicación */}
        </main>
      </div>
      <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
