import PokemonDetailCard from "../components/PokemonDetailCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPokemonDetail } from "../services/pokeapi";
import { CircularProgress, Typography } from "@mui/material";

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

  if (loading) return <CircularProgress />;
  if (!pokemon) return <Typography variant="h6">Pokémon no encontrado</Typography>;
  return <PokemonDetailCard pokemon={pokemon} />;
}

export default PokemonDetailPage;