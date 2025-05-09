import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchPokemonDetail, fetchPokemonSpecies } from "../services/pokeapi";
import { PokemonDetailCard, Loader, NotFound } from "../components";

function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    Promise.all([
      fetchPokemonDetail(name),
      fetchPokemonSpecies(name)
    ]).then(([pokeData, speciesData]) => {
      if (!isMounted) return;
      setPokemon(pokeData);

      let flavor = speciesData.flavor_text_entries.find(e => e.language.name === 'es');
      if (!flavor) flavor = speciesData.flavor_text_entries.find(e => e.language.name === 'en');
      setDescription(flavor ? flavor.flavor_text.replace(/\f|\n/g, ' ') : "");
      setLoading(false);
    }).catch(() => {
      if (isMounted) {
        setPokemon(null);
        setDescription("");
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [name]);

  const location = useLocation();
  const url = location.state?.url;
  if (loading) return <Loader />;
  if (!pokemon) return <NotFound msg="Pokémon no encontrado" />;
  return <PokemonDetailCard pokemon={pokemon} description={description} url={url} />;
}

export default PokemonDetailPage;