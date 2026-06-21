const { z } = require('zod')

/**
 * Middleware de validação com Zod
 * Recebe um schema Zod e valida req.body, req.params ou req.query.
 * Em caso de falha, lança ZodError que será capturado pelo errorHandler.
 *
 * Uso:
 *   const schema = z.object({ name: z.string().min(1), age: z.number().int().positive() })
 *   router.post('/users', validate(schema), catchAsync(createUser))
 *   router.get('/users/:id', validate(z.object({ id: z.string().uuid() }), 'params'), catchAsync(getUser))
 */
function validate(schema, source = 'body') {
    return (req, _res, next) => {
        // parse() lança ZodError automaticamente se inválido
        req[source] = schema.parse(req[source])
        next()
    }
}

function validateAll({ body, params, query } = {}) {
    return (req, _res, next) => {
        if (body) req.body = body.parse(req.body)
        if (params) req.params = params.parse(req.params)
        if (query) req.query = query.parse(req.query)
        next()
    }
}

module.exports = { validate, validateAll }