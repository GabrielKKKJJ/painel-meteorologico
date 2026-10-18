function WeatherDisplay({ dadosClima, isLoading, erro }) {
  if (isLoading) {
    return <p className="weather-display status">Carregando...</p>;
  }

  if (erro) {
    return <p className="weather-display status erro">{erro}</p>;
  }

  if (!dadosClima) {
    return (
      <p className="weather-display status">
        Busque uma cidade para ver o clima atual.
      </p>
    );
  }

  return (
    <div className="weather-display">
      <span className="weather-icon" aria-hidden="true">
        {dadosClima.icone ?? '🌡️'}
      </span>
      <h2>
        {dadosClima.cidade}, {dadosClima.pais}
      </h2>
      <p className="temperatura">{dadosClima.temperatura}°C</p>
      <p className="condicao">{dadosClima.condicao}</p>
      <ul className="stats">
        <li className="stat-chip">Umidade: {dadosClima.umidade}%</li>
        <li className="stat-chip">Vento: {dadosClima.vento} km/h</li>
      </ul>
    </div>
  );
}

export default WeatherDisplay;
