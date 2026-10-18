import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';
import { useAuth } from '../hooks/useAuth';

function AppLayout() {
  const { tema } = useContext(ThemeContext);
  const { autenticado, logout } = useAuth();

  return (
    <div className={`app ${tema}`}>
      <header>
        <h1>Painel Meteorológico</h1>
        <nav>
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/about">Sobre</NavLink>
          {autenticado ? (
            <>
              <NavLink to="/perfil">Perfil</NavLink>
              <button type="button" onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login">Entrar</NavLink>
          )}
        </nav>
        <ThemeSwitcher />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
