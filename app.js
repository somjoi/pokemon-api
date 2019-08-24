const express = require("express");
const pokemonsRounter = require("./pokemons/router");
const app = express();

app.use(express.json());
app.use(pokemonsRounter);

app.get("/", (req, res) => res.send({ message: "Hello World!" }));

module.exports = app;
