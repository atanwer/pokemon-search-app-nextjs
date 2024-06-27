import PokemonSearch from "./components/PokemonSearch";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">Pokemon Search</h1>
      <div className="glassmorphism p-6">
        <PokemonSearch />
      </div>
    </main>
  );
}