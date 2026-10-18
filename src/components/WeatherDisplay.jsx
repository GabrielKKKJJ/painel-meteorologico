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
      <h2>
        {dadosClima.cidade}, {dadosClima.pais}
      </h2>
      <p className="temperatura">{dadosClima.temperatura}°C</p>
      <p>{dadosClima.condicao}</p>
      <ul>
        <li>Umidade: {dadosClima.umidade}%</li>
        <li>Vento: {dadosClima.vento} km/h</li>
      </ul>
    </div>
  );
}

export default WeatherDisplay;
