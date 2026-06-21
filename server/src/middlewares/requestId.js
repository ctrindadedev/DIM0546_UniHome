const { randomUUID } = require('crypto')

/**
 * Isso é útil se o projeto subir para prod no futuro..
 * Injeta um requestId único em cada requisição
 * Usa o header X-Request-Id se já vier do client, senão gera um UUID.
 * Disponível em req.id e devolvido no header de resposta.
 */

function requestId(req, res, next) {
    req.id = req.headers['x-request-id'] || randomUUID()
    res.setHeader('X-Request-Id', req.id)
    next()
}

module.exports = requestId