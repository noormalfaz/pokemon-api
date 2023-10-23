import React, { useEffect, useState } from "react";
import StyleFont from "./list-pokemon.module.css";

function ListPokemons() {
  const [input, setInput] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [filterPokemons, setFilterPokemons] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const respons = await fetch("https://pokeapi.deno.dev/pokemon?limit=100");
      const data = await respons.json();
      setPokemons(data);
      setFilterPokemons(data);
    }
    getPokemon();
  }, []);

  useEffect(() => {
    let filter = pokemons.filter((item) =>
      item.name.toLowerCase().includes(input)
    );
    setFilterPokemons(filter);
  }, [input]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  return (
    <div
      className={`${StyleFont.font} justify-center items-center text-center`}
    >
      <div>
        <h1 className="text-4xl font-bold p-5">POKEMON</h1>
        <input
          type="text"
          name="input"
          placeholder="Cari Pokemon"
          value={input}
          onChange={handleInput}
          className={`${StyleFont.font} border-2 py-2 px-5 rounded-xl mb-10`}
        />
      </div>
      {pokemons.length == 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-10 justify-center p-5">
          {filterPokemons.length == 0 ? (
            <div>Pokemon Tidak Ada</div>
          ) : (
            filterPokemons.map((item) => (
              <div
                key={item.id}
                className="w-80 justify-center items-center text-center rounded-lg p-5 shadow-xl"
                style={{ backgroundColor: item.color }}
              >
                <img
                  src={item.imageUrl}
                  alt="Pokemon"
                  className="max-w-full max-h-full block p-5"
                />
                <div>
                  <h3 className="text-3xl font-bold text-stone-700">
                    {item.name}
                  </h3>
                  <h3 className="text-xl font-light">{item.genus}</h3>
                  <div className="py-2.5 text-left">
                  <h3 className="text-xl font-semibold">Type</h3>
                    <li>{item.types[0]}</li>
                    <li>{item.types[1]}</li>
                  </div>
                  <div className="py-2.5 text-justify">
                  <h3 className="text-xl font-semibold">Abilities</h3>
                  <p className="font-medium">Name : <span className="font-normal">{item.abilities[0].name}</span></p>
                  <p className="font-medium">Effeck : <span className="font-normal">{item.abilities[0].effect}</span></p>
                  <p className="font-medium">Description : <span className="font-normal">{item.abilities[0].description}</span></p>
                  </div>
                  <div className="py-2.5 text-left">
                  <h3 className="text-xl font-semibold">Stats</h3>
                  <p>HP : {item.stats.HP}</p>
                  <p>Attack : {item.stats.Attack}</p>
                  <p>Defense : {item.stats.Defense}</p>
                  <p>Special Attack : {item.stats["Special Attack"]}</p>
                  <p>Special Defense : {item.stats["Special Defense"]}</p>
                  <p>Speed : {item.stats.Speed}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ListPokemons;
