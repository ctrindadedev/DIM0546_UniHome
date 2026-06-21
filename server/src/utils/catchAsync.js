/**
 * Wrapper para route handlers async
 * Elimina o try/catch repetitivo: qualquer Promise rejeitada
 * é automaticamente repassada para o errorHandler via next(err).
 *
 * Uso:
 *   const create = catchAsync(async (req, res) => {
 *     const newProperty = await propertyService.createProperty(req.body);
 *     return res.status(201).json({ success: true, data: newProperty });
 * });
 */
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = catchAsync