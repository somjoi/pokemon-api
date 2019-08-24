const express = require("express");
const rounter = express.Router();
const nPokemon = require("./pokemon");

rounter.get("/pokemons/", (req, res) => {
  res.json(nPokemon.pokemons);
});

rounter.post("/pokemons/", (req, res) => {
  const form = req.body;
  if (Validate(form)) {
    const pokemons = nPokemon.AddPokemon(form.name, form.primaryType);
    res.status(201).send(pokemons);
  } else {
    res.status(400).send({
      error: "Insufficient parameter: name and type are required parameters"
    });
  }
});

rounter.get("/pokemons/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = nPokemon.GetPokemonById(id);
  if (pokemon !== undefined) {
    res.json(pokemon);
  } else {
    nPokemon.PokemonNotFound(res, id);
  }
});

rounter.put("/pokemons/:id", (req, res) => {
  const id = req.params.id;
  if (TypeValidate(id)) {
    const form = req.body;
    const secondaryType = form.secondaryType;

    const pokemon = nPokemon.GetPokemonById(id);
    if (pokemon !== undefined) {
      if (StringValidate(secondaryType)) {
        pokemon.secondaryType = secondaryType;
        pokemons[id] = pokemon;
        res.status(200).json(pokemon);
      } else {
        res.status(400).send({
          error: "Insufficient body: secondaryType is required body"
        });
      }
    } else {
      nPokemon.PokemonNotFound(res, id);
    }
  } else {
    InsufficientIdRequire(res);
  }
});

rounter.delete("/pokemons/:id", (req, res) => {
  const id = req.params.id;
  if (TypeValidate(id)) {
    const pokemon = GetPokemonById(id);
    if (pokemon !== undefined) {
      delete pokemons[id - 1];
      res.status(200).json(pokemon);
    } else {
      PokemonNotFound(res, id);
    }
  } else {
    InsufficientIdRequire(res);
  }
});

module.exports = rounter;
