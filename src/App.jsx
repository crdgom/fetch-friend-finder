import './App.css'; // Puedes importar tus estilos CSS personalizados aquí si los tienes.
import Login from './pages/Login'; // Importa el componente Login
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <h1>My App</h1>
        </header>
        <main>
          <Login /> {/* Utiliza el componente Login aquí */}
          {/* Otras partes de tu aplicación */}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
