import { Pokemon } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

//! solo en build time
export async function generateStaticParams() {
  const static400Pokemons = Array.from({ length: 400 }).map(
    (v, i) => `${i + 1}`
  );

  return static400Pokemons.map((id) => ({
    id: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id, name } = await getPokemon(params.id);

    return {
      title: `#${id} - ${name}`,
      description: `Página del pokemon ${name}`,
    };
  } catch (error) {
    return {
      title: `Pokemon`,
      description: `Pokemon`,
    };
  }
}

const getPokemon = async (id: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      // cache: "force-cache", //TODO Cambiar esto en un futuro
      next: {
        revalidate: 60 * 60 * 30 * 6, // 6 meses
      },
    }).then((res) => res.json());

    console.log("se cargo: ", pokemon);
    return pokemon;
  } catch (error) {
    notFound();
  }
};

export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.id);

  const getPorcentBar = (stat: number) => {
    const max = 255;
    const porcent = (stat * 100) / max;
    return `${porcent}%`;
  };

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />

            <div className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <p
                  key={move.move.name}
                  className="mr-2 capitalize border rounded px-2 py-1 my-2 "
                >
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
          <section className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Ability</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.abilities.map((ability) => (
                <p key={ability.slot} className="mr-2 capitalize">
                  {ability.ability.name}
                </p>
              ))}
            </div>
          </section>

          <section className="flex flex-col rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Stats</p>
            <div className="text-base font-medium text-navy-700 flex flex-col">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm text-gray-600 capitalize">
                      {stat.stat.name}
                    </h4>
                    <h5 className="text-sm text-gray-600">{`${stat.base_stat}/255`}</h5>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-5">
                    <div
                      className={`w-full bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 rounded-full h-5`}
                      style={{ width: getPorcentBar(stat.base_stat) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
