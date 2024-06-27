import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePokemonSearch(selectedType, searchTerm) {
    const [pokemon, setPokemon] = useState([]);
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
                const results = response.data.results;

                const pokemonData = await Promise.all(results.map(async (result) => {
                    const res = await axios.get(result.url);
                    return {
                        name: res.data.name,
                        image: res.data.sprites.other['official-artwork'].front_default,
                        type: res.data.types[0].type.name,
                        height: res.data.height,
                        weight: res.data.weight,
                    };
                }));

                setPokemon(pokemonData);
                setTypes([...new Set(pokemonData.map(p => p.type))]);
                setLoading(false);
            } catch (err) {
                console.log(err)
                setError('Failed to fetch Pokémon');
                setLoading(false);
            }
        };

        fetchPokemon();
    }, []);

    const filteredPokemon = pokemon.filter(p =>
        (selectedType === '' || p.type === selectedType) &&
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return { pokemon: filteredPokemon, types, loading, error };
}