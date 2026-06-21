const logger = require('./utils/logger')

/**
 * Captura Promises rejeitadas sem .catch() em qualquer lugar do processo.
 * Loga o erro e encerra o processo
 */
process.on('unhandledRejection', (reason) => {
    logger.error({ err: reason }, 'unhandledRejection — encerrando processo')
    setTimeout(() => process.exit(1), 500)
})

/**
 * Captura exceções síncronas não tratadas.
 */
process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'uncaughtException — encerrando processo imediatamente')
    setTimeout(() => process.exit(1), 500)
})