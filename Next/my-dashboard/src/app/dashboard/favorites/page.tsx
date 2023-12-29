import { FavoritePokemons } from "@/pokemons";

export const metadata = {
  title: "Favoritos",
  description: "Listado de pokemons favoritos",
};

export default async function PokemonsPage() {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-2">
        Pokémon favoritos <small className="text-blue-600">Global State</small>
      </span>

      <FavoritePokemons />
    </div>
  );
}
