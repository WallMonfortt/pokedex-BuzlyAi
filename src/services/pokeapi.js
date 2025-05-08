import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemosList(page = 1, limit = 20) {
    const offset = (page - 1) * limit;
    const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
    const response = await axios.get(url);
    return response.data;
}