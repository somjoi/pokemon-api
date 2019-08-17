const express = require("express");
const app = express();

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

let pokemons = [];

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

function GetPokemonById(id) {
    const index = id - 1;
    if (index < pokemons.length) {
        return pokemons[index];
    }
}

function PokemonNotFound(res, id) {
    res.status(404).send({ error: `Pokemon Id (${id}) not found` });
}

function InsufficientIdRequire(res) {
    res.status(400).send({
        error: "Insufficient parameter: id is required parameter"
    });
}

app.use(express.json());

app.get("/", (req, res) => res.send({ message: "Hello World!" }));

AddPokemon("Bulbasaur", "Grass");
AddPokemon("Charmander", "Fire");

app.get("/pokemons/", (req, res) => {
    res.json(pokemons);
});

app.post("/pokemons/", (req, res) => {
    const form = req.body;
    if (Validate(form)) {
        const pokemon = AddPokemon(form.name, form.primaryType);
        res.status(201).send(pokemon);
    } else {
        res.status(400).send({
            error: "Insufficient parameter: name and type are required parameters"
        });
    }
});

app.get("/pokemons/:id", (req, res) => {
    const id = req.params.id;
    const pokemon = GetPokemonById(id);
    if (pokemon !== undefined) {
        res.json(pokemon);
    } else {
        PokemonNotFound(res, id);
    }
});

app.put("/pokemons/:id", (req, res) => {
    const id = req.params.id;
    if (TypeValidate(id)) {
        const form = req.body;
        const secondaryType = form.secondaryType;

        const pokemon = GetPokemonById(id);
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
            PokemonNotFound(res, id);
        }
    } else {
        InsufficientIdRequire(res);
    }
});

app.delete("/pokemons/:id", (req, res) => {
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

module.exports = app;