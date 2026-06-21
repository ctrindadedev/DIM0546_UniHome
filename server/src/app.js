require('./processHandlers')

const express = require('express')
const requestId = require('./middlewares/requestId')
const routes = require('./routes')
const { NotFoundError } = require('./errors')
const errorHandler = require('./middlewares/error')

const app = express()

//Middlewares globais
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestId)

// Rotas (rota não encontrada deve ficar após todas as rotas)
app.use('/api', routes)
app.use((req, _res, next) => {
    next(new NotFoundError(`Rota ${req.method} ${req.path}`))
})

app.use(errorHandler)

module.exports = app