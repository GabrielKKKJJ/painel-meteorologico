import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { ThemeContext } from '../context/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

function renderComTema(tema, alternarTema) {
  return render(
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      <ThemeSwitcher />
    </ThemeContext.Provider>
  );
}

describe('ThemeSwitcher', () => {
  test('mostra "Modo escuro" quando o tema atual é light', () => {
    renderComTema('light', vi.fn());
    expect(screen.getByRole('button', { name: /Modo escuro/ })).toBeInTheDocument();
  });

  test('mostra "Modo claro" quando o tema atual é dark', () => {
    renderComTema('dark', vi.fn());
    expect(screen.getByRole('button', { name: /Modo claro/ })).toBeInTheDocument();
  });

  test('chama alternarTema ao clicar', async () => {
    const alternarTema = vi.fn();
    const user = userEvent.setup();
    renderComTema('light', alternarTema);

    await user.click(screen.getByRole('button'));

    expect(alternarTema).toHaveBeenCalledTimes(1);
  });
});
