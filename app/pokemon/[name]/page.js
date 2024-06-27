import { getPokemonDetails } from '@/app/lib/pockmon';
import Link from 'next/link';

export default async function PokemonDetails({ params }) {
    const pokemon = await getPokemonDetails(params.name);

    if (!pokemon) {
        return <div className="container mx-auto p-4 text-white">Pokemon not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Link href="/" className="text-white hover:underline">Home</Link> {' > '}
                <span className="text-gray-300 capitalize">{pokemon.name}</span>
            </div>
            <div className="glassmorphism max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
                <div className="md:flex-shrink-0 p-6">
                    <div className="w-full max-w-md mx-auto aspect-square overflow-hidden">
                        <img
                            className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                            src={pokemon.image}
                            alt={pokemon.name}
                        />
                    </div>
                </div>
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-4 text-white capitalize">{pokemon.name}</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-200 mb-2">Type: <span className="font-semibold capitalize">{pokemon.type}</span></p>
                            <p className="text-gray-200 mb-2">Height: <span className="font-semibold">{pokemon.height / 10} m</span></p>
                            <p className="text-gray-200 mb-2">Weight: <span className="font-semibold">{pokemon.weight / 10} kg</span></p>
                        </div>
                        <div>
                            {pokemon.abilities && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 text-white">Abilities:</h2>
                                    <ul className="list-disc list-inside text-gray-200">
                                        {pokemon.abilities.map((ability, index) => (
                                            <li key={index} className="capitalize">{ability}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}