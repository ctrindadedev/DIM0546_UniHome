const { AppError } = require('../errors')
const logger = require('../utils/logger')

function handlePrismaError(err) {
    switch (err.code) {
        case 'P2002': {
            const field = err.meta?.target?.join(', ') || 'campo'
            return new AppError(`Já existe um registro com este ${field}`, 409, 'CONFLICT', 'domain_error')
        }
        case 'P2025':
            return new AppError('Registro não encontrado', 404, 'NOT_FOUND', 'domain_error')
        case 'P2003':
            return new AppError('Referência inválida: registro relacionado não existe', 400, 'INVALID_REFERENCE', 'domain_error')
        case 'P2014':
            return new AppError('Violação de relação obrigatória', 400, 'RELATION_VIOLATION', 'domain_error')
        default:
            return new AppError('Erro de banco de dados', 500, 'DATABASE_ERROR', 'infrastructure_error')
    }
}

function handleZodError(err) {
    const details = err.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
    }))

    const error = new AppError('Dados de entrada inválidos', 400, 'VALIDATION_ERROR', 'validation_error')
    error.details = details
    return error
}

function handleJwtError(err) {
    if (err.name === 'JsonWebTokenError') {
        return new AppError('Token inválido', 401, 'INVALID_TOKEN', 'auth_error')
    }
    if (err.name === 'TokenExpiredError') {
        return new AppError('Token expirado', 401, 'TOKEN_EXPIRED', 'auth_error')
    }
    return null
}

function buildErrorResponse(err) {
    return {
        success: false,
        error: {
            message: err.message,
            code: err.code || 'INTERNAL_ERROR',
            categoria: err.categoria || 'application_error',
            ...(err.details ? { details: err.details } : {}),
        },
    }
}

function errorHandler(err, req, res, next) {
    let error = err

    if (err.constructor?.name === 'PrismaClientKnownRequestError') {
        error = handlePrismaError(err)
    } else if (err.constructor?.name === 'ZodError') {
        error = handleZodError(err)
    } else if (['JsonWebTokenError', 'TokenExpiredError'].includes(err.name)) {
        error = handleJwtError(err) || error
    }

    const statusCode = error.statusCode || 500

    const logPayload = { err: error, requestId: req.id, path: req.path, method: req.method }
    if (statusCode >= 500) {
        logger.error(logPayload, error.message)
    } else if (statusCode >= 400) {
        logger.warn(logPayload, error.message)
    }

    return res.status(statusCode).json(buildErrorResponse(error))
}

module.exports = errorHandler