const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/pokemon', function (req, res) {
    res.send(pokemons)
})
app.post('/pokemons', (req, res) => {
    pokemons.push(req.body)
    res.sendStatus(201)
})

let pokemons = [
    { name: 'Pikachu', type: 'Electic' },
    { name: 'Pikachu', type: 'Fire' }
]

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


