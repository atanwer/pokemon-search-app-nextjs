'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import usePokemonSearch from '../hooks/usePokemonSearch';

export default function PokemonSearch() {
    const [selectedType, setSelectedType] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { pokemon, types, loading, error } = usePokemonSearch(selectedType, searchTerm);
    const router = useRouter();

    const handleTypeChange = (e) => setSelectedType(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handlePokemonClick = (name) => router.push(`/pokemon/${name}`);

    if (loading) return <p className="text-white">Loading...</p>;
    if (error) return <p className="text-red-300">Error: {error}</p>;

    return (
        <div>
            <form className="mb-6 flex flex-col sm:flex-row gap-4">
                <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="p-2 rounded glassmorphism text-white bg-transparent"
                    style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.7rem top 50%',
                        backgroundSize: '1.5em auto',
                        paddingRight: '2.5rem'
                    }}
                >
                    <option value="" className="bg-purple-300">All Types</option>
                    {types.map(type => (
                        <option key={type} value={type} className="bg-purple-300">{type}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search Pokémon"
                    className="p-2 rounded glassmorphism text-white placeholder-gray-300 flex-grow"
                />
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {pokemon.map(p => (
                    <div
                        key={p.name}
                        onClick={() => handlePokemonClick(p.name)}
                        className="glassmorphism p-4 rounded cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col items-center"
                    >
                        <div className="w-full aspect-square overflow-hidden mb-4 flex items-center justify-center">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                        <h2 className="text-xl font-bold mb-2 text-white capitalize">{p.name}</h2>
                        <p className="text-gray-200 capitalize">Type: {p.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}