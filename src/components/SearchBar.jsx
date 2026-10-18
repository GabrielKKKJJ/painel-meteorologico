import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [cidade, setCidade] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cidade.trim() === '') return;
    onSearch(cidade.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={cidade}
        onChange={(event) => setCidade(event.target.value)}
        placeholder="Digite o nome de uma cidade"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
