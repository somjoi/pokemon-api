let pokemons = [];

class Pokemon {
  constructor(id, name, primaryType) {
    this.id = id;
    this.name = name;
    this.primaryType = primaryType;
    this.secondaryType = undefined;
  }

  getId() {
    return this.id;
  }

  detail() {
    return `Type of ${this.name} is ${this.primaryType}`;
  }
}

function GetId() {
  return pokemons.length;
}

function GenarateId() {
  return GetId() + 1;
}

function CreatePokemon(name, primaryType) {
  return new Pokemon(GenarateId(), name, primaryType);
}

function AddPokemon(name, primaryType) {
  const pokemon = CreatePokemon(name, primaryType);
  pokemons.push(pokemon);
  return pokemon;
}

function mockPokemon() {
  AddPokemon("Bulbasaur", "Grass");
  AddPokemon("Charmander", "Fire");
}

mockPokemon();

function GetPokemonById(id) {
  const index = id - 1;
  if (index < pokemons.length) {
    return pokemons[index];
  }
}

function PokemonNotFound(res, id) {
  res.status(404).send({ error: `Pokemon Id (${id}) not found` });
}

function Validate(form) {
  if (form != null) {
    return StringValidate(form.name) && StringValidate(form.primaryType);
  }
  return false;
}

function StringValidate(name) {
  return TypeValidate(name) && name !== "";
}

function TypeValidate(type) {
  return type !== null && type !== undefined;
}

function InsufficientIdRequire(res) {
  res.status(400).send({
    error: "Insufficient parameter: id is required parameter"
  });
}

module.exports.AddPokemon = AddPokemon;
module.exports.pokemons = pokemons;
module.exports.GetPokemonById = GetPokemonById;
module.exports.PokemonNotFound = PokemonNotFound;
