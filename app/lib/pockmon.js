import axios from 'axios';

export async function getPokemonDetails(name) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = response.data;
    return {
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
      type: data.types[0].type.name,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map(ability => ability.ability.name),
    };
  } catch (error) {
    console.error('Failed to fetch Pokémon details:', error);
    return null;
  }
}