const propertyService = require('./property.service');
const catchAsync = require('../../utils/catchAsync');
const { NotFoundError } = require('../../errors');


const create = catchAsync(async (req, res) => {
    const newProperty = await propertyService.createProperty(req.body);
    return res.status(201).json({ success: true, data: newProperty });
});

const getById = catchAsync(async (req, res) => {
    const property = await propertyService.getPropertyById(req.params.id);

    if (!property) throw new NotFoundError('Imóvel');

    return res.status(200).json({ success: true, data: property });
});

module.exports = { create, getById };