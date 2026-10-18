const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

// codigos WMO usados pelo Open-Meteo, resumidos para o painel
const DESCRICAO_POR_CODIGO = {
  0: 'Céu limpo',
  1: 'Poucas nuvens',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Neblina com geada',
  51: 'Garoa fraca',
  53: 'Garoa moderada',
  55: 'Garoa forte',
  61: 'Chuva fraca',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  71: 'Neve fraca',
  73: 'Neve moderada',
  75: 'Neve forte',
  80: 'Pancadas de chuva',
  95: 'Trovoadas',
};

export function descreverCodigoClima(codigo) {
  return DESCRICAO_POR_CODIGO[codigo] ?? 'Condição desconhecida';
}

export function urlGeocodificacao(nomeCidade) {
  return `${GEOCODING_URL}?name=${encodeURIComponent(nomeCidade)}&count=1&language=pt&format=json`;
}

export function urlPrevisao(latitude, longitude) {
  return (
    `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto'
  );
}

export function montarDadosClima(local, previsao) {
  return {
    cidade: local.name,
    pais: local.country,
    temperatura: previsao.current.temperature_2m,
    umidade: previsao.current.relative_humidity_2m,
    vento: previsao.current.wind_speed_10m,
    condicao: descreverCodigoClima(previsao.current.weather_code),
  };
}
