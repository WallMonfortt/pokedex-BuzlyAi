import PokemonDetailCard from "../components/PokemonDetailCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPokemonDetail } from "../services/pokeapi";
import { Loader, NotFound } from "../components/common/FeedbackUI";

function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemonDetail(name)
      .then(data => {
        setPokemon(data);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <Loader />;
  if (!pokemon) return <NotFound msg="Pokémon no encontrado" />;
  return <PokemonDetailCard pokemon={pokemon} />;
}

export default PokemonDetailPage;