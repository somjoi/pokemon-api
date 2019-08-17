const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

class Pokemons {
    constructor(name, type) {
        this.name = name
        this.type = type
        this.id = null
        this.type2 = null
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

function issufficientParam(v) {
    return v === '' || v === undefined || v === null
}

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/pokemon', function (req, res) {
    res.send(pokemons)
})
app.post('/pokemons', (req, res) => {
    if (issufficientParam(req.body.name) || issufficientParam(req.body.type)) {
        res.status(400).send('Insufficient parameters: name and type are required parameter')
        return
    }
    let p = new Pokemons(req.body.name, req.body.type)
    p.id = generateNewId(pokemons.length)
    pokemons.push(p)
    res.sendStatus(201)
})

app.get('/pokemons/:id', (req, res) => {
    let id = req.param.id
    let p = pokemons[id - 1]
    res.send(p)
})

app.put('/pokemon/:id', (req, res) => {
    if (!issufficientParam(req.body.type2)) {
        res.status(400).send('Insufficient parameters:type2 is required parameter')
        return
    }
    let id = req.param.id
    if (!issufficientParam(req.param.id)) {
        res.status(400).send('Insufficient parameters:id is required parameter')
        return
    }
    let p = pokemons[id - 1]
    if (p === undefined) {
        res.status(400).send('Insufficient parameters:Pokemon is not found')
        return
    }
    p.type2 = req.body.type2
    pokemons[id - 1] = p
    res.sendStatus(200)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


