import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const navigate = useNavigate();

  return (
    <section>
      <p className="lead">Busque uma cidade para ver o clima atual.</p>
      <SearchBar onSearch={(cidade) => navigate(`/forecast/${encodeURIComponent(cidade)}`)} />
    </section>
  );
}

export default HomePage;
