const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

class Pokemons {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
    }
}
let pokemons = []

function createPokemon(name, type) {
    let p = new Pokemons(name, type)
    p.id = generateNewId(pokemons.length)
    return p
}

function generateNewId(num) {
    return num + 1
}

pokemons.push(createPokemon('Wartortle', 'Water'))
pokemons.push(createPokemon('Butterfree', 'Bug, Flying'))

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/pokemon', function (req, res) {
    res.send(pokemons)
})
app.post('/pokemons', (req, res) => {
    let p = new Pokemons(req.body.name, req.body.type)
    p.id = generateNewId(pokemons.length)
    pokemons.push(p)
    res.sendStatus(201)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


