// URLs

export const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
export const POKEBALL_IMG_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

export const getDreamWorldSprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

export const getDefaultSprite = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const getPokemonGif = (name) =>
  `https://play.pokemonshowdown.com/sprites/xyani/${name}.gif`;