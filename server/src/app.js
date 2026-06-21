require('./processHandlers')

const express = require('express')
const requestId = require('./middlewares/requestId')
const errorHandler = require('./middlewares/error')
const { NotFoundError } = require('./errors')

const app = express()

//Middlewares globais
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestId)

// Rotas

//  Rota não encontrada (deve ficar após todas as rotas)
app.use((req, _res, next) => {
    next(new NotFoundError(`Rota ${req.method} ${req.path}`))
})

// Error handler global (deve ser o ultimo middleware)
app.use(errorHandler)

module.exports = app