import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFetchAutenticado } from '../hooks/useFetchAutenticado';

function PerfilPage() {
  const { autenticado, logout } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchAutenticado();

  if (!autenticado) {
    return (
      <section className="card">
        <p className="status">
          Você precisa entrar para ver esta página.{' '}
          <Link to="/login" className="link-sutil">
            Ir para o login
          </Link>
        </p>
      </section>
    );
  }

  const sair = () => {
    logout();
    navigate('/');
  };

  return (
    <section className="card">
      <h2>Perfil</h2>
      {isLoading && <p className="status">Carregando perfil...</p>}
      {error && <p className="status erro">{error}</p>}
      {data && (
        <div className="perfil-dados">
          <p className="stat-chip">Usuário: {data.usuario}</p>
          <p className="stat-chip">Buscas favoritas: {data.buscasFavoritas.join(', ')}</p>
        </div>
      )}
      <button type="button" className="theme-switcher perfil-sair" onClick={sair}>
        Sair
      </button>
    </section>
  );
}

export default PerfilPage;
