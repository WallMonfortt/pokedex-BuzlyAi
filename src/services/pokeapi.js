import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemosList(page = 1, limit = 20) {

    if (page === 3) {
        throw new Error('Error simulado solo en la página 3');
    }

    // await new Promise(res => setTimeout(res, 2000));

    const offset = (page - 1) * limit;
    const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url);
    return response.data;
}

export async function fetchPokemonDetail(name) {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
}

export async function fetchAllPokemonNames() {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=1300`);
    return response.data.results;
}

export async function fetchPokemonSpecies(nameOrId) {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${nameOrId}`);
    return response.data;
}