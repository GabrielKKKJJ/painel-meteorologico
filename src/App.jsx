import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import ForecastPage from './pages/ForecastPage';
import LoginPage from './pages/LoginPage';
import PerfilPage from './pages/PerfilPage';
import './App.css';

const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <Suspense fallback={<p className="status">Carregando...</p>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="forecast/:city" element={<ForecastPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="perfil" element={<PerfilPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
