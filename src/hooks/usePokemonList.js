import { useState, useEffect } from 'react';
import { fetchPokemonList, fetchAllPokemonNames } from '../services/pokeapi';
import { useDebouncedValue } from './useDebouncedValue';

export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(() => {
    const stored = localStorage.getItem('pokedexPage');
    return stored ? parseInt(stored, 10) : 1;
  });
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [allNames, setAllNames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [limit, setLimit] = useState(20);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 350);

  useEffect(() => {
    localStorage.setItem('pokedexPage', page);
  }, [page]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPokemonList(page, limit)
      .then(data => {
        setPokemonList(data.results);
        setCount(data.count);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError('No se pudo cargar la lista de Pokémon. Intenta de nuevo.');
      });
  }, [page, limit]);

  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      setSearchLoading(true);
      setError(null);
      const fetchOrFilter = async () => {
        try {
          let names = allNames;
          if (allNames.length === 0) {
            names = await fetchAllPokemonNames();
            setAllNames(names);
          }
          filterAndSetResults(names, debouncedSearch);
        } catch (err) {
          setError('No se pudo buscar Pokémon. Intenta de nuevo.');
        } finally {
          setSearchLoading(false);
        }
      };
      fetchOrFilter();
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 3) {
      setSearchLoading(true);
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
    error,
    search,
    handleSearchChange,
    searchResults,
    totalPages,
    limit,
    setLimit,
    searchLoading,
  };
}
