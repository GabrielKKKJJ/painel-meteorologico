import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import WeatherDisplay from './WeatherDisplay';

describe('WeatherDisplay', () => {
  test('mostra "Carregando..." quando isLoading é true', () => {
    render(<WeatherDisplay isLoading erro={null} dadosClima={null} />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('mostra a mensagem de erro quando há erro', () => {
    render(<WeatherDisplay isLoading={false} erro="Cidade não encontrada" dadosClima={null} />);
    expect(screen.getByText('Cidade não encontrada')).toBeInTheDocument();
  });

  test('mostra o texto inicial quando não há busca ainda', () => {
    render(<WeatherDisplay isLoading={false} erro={null} dadosClima={null} />);
    expect(screen.getByText('Busque uma cidade para ver o clima atual.')).toBeInTheDocument();
  });

  test('mostra os dados do clima quando a busca retorna', () => {
    render(
      <WeatherDisplay
        isLoading={false}
        erro={null}
        dadosClima={{ cidade: 'Recife', pais: 'Brasil', temperatura: 28.5, condicao: 'Poucas nuvens', umidade: 60, vento: 16.2 }}
      />
    );
    expect(screen.getByText('Recife, Brasil')).toBeInTheDocument();
    expect(screen.getByText('28.5°C')).toBeInTheDocument();
    expect(screen.getByText('Umidade: 60%')).toBeInTheDocument();
    expect(screen.getByText('Vento: 16.2 km/h')).toBeInTheDocument();
  });
});
