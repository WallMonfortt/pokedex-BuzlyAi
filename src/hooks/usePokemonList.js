import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchAllPokemonNames } from '../services/pokeapi';

export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [allNames, setAllNames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLoading(true);
    fetchPokemonList(page, limit)
      .then(data => {
        setPokemonList(data.results);
        setCount(data.count);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        alert(error);
      });
  }, [page, limit]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 3) {
      if (allNames.length === 0) {
        const all = await fetchAllPokemonNames();
        setAllNames(all);
        filterAndSetResults(all, value);
      } else {
        filterAndSetResults(allNames, value);
      }
    } else {
      setSearchResults([]);
    }
  };

  function filterAndSetResults(list, value) {
    const filtered = list.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, limit);
    setSearchResults(filtered);
  }

  const totalPages = Math.ceil(count / limit);

  return {
    pokemonList,
    page,
    setPage,
    loading,
    search,
    handleSearchChange,
    searchResults,
    totalPages,
    limit,
    setLimit
  };
}
