import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import WeatherDisplay from '../components/WeatherDisplay';
import { montarDadosClima, urlGeocodificacao, urlPrevisao } from '../services/weatherApi';

function ForecastPage() {
  const { city } = useParams();

  const geo = useFetch(urlGeocodificacao(city));
  const local = geo.data?.results?.[0];
  const previsao = useFetch(local ? urlPrevisao(local.latitude, local.longitude) : null);

  let erro = geo.error ?? previsao.error;
  if (!erro && geo.data && !local) erro = `Cidade "${city}" não encontrada`;

  const dadosClima = local && previsao.data ? montarDadosClima(local, previsao.data) : null;

  return (
    <section>
      <WeatherDisplay
        dadosClima={dadosClima}
        isLoading={geo.isLoading || previsao.isLoading}
        erro={erro}
      />
      <Link to="/">Nova busca</Link>
    </section>
  );
}

export default ForecastPage;
