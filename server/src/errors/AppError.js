/**
 * Classe base para todos os erros operacionais da aplicação.
 * isOperational = true  → erro esperado (validação, not found, auth)
 * isOperational = false → bug de programação
 */

class AppError extends Error {
    constructor(message, statusCode, code, categoria = 'application_error') {
        super(message)

        this.statusCode = statusCode
        this.code = code
        this.categoria = categoria
        this.isOperational = true

        // Garante que o stack trace aponte para onde o erro foi lançado
        Error.captureStackTrace(this, this.constructor)
    }
}

//Erros de validação (400)

class ValidationError extends AppError {
    constructor(message, code = 'VALIDATION_ERROR') {
        super(message, 400, code, 'validation_error')
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Requisição inválida', code = 'BAD_REQUEST') {
        super(message, 400, code, 'validation_error')
    }
}

//  Erros de autenticação/autorização (401/403)

class UnauthorizedError extends AppError {
    constructor(message = 'Não autenticado', code = 'UNAUTHORIZED') {
        super(message, 401, code, 'auth_error')
    }
}

class ForbiddenError extends AppError {
    constructor(message = 'Acesso negado', code = 'FORBIDDEN') {
        super(message, 403, code, 'auth_error')
    }
}

//  Erros de recurso (404/409)

class NotFoundError extends AppError {
    constructor(resource = 'Recurso', code = 'NOT_FOUND') {
        super(`${resource} não encontrado`, 404, code, 'domain_error')
    }
}

class ConflictError extends AppError {
    constructor(message = 'Conflito de dados', code = 'CONFLICT') {
        super(message, 409, code, 'domain_error')
    }
}

//  Erros de domínio genérico (422)

class DomainError extends AppError {
    constructor(message, code = 'DOMAIN_ERROR') {
        super(message, 422, code, 'domain_error')
    }
}



module.exports = {
    AppError,
    ValidationError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    DomainError,
}