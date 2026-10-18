import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeSwitcher() {
  const { tema, alternarTema } = useContext(ThemeContext);

  return (
    <button type="button" className="theme-switcher" onClick={alternarTema}>
      {tema === 'light' ? '🌙 Modo escuro' : '☀️ Modo claro'}
    </button>
  );
}

export default ThemeSwitcher;
