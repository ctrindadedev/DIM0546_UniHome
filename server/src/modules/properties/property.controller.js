const propertyService = require('./property.service');

const create = async (req, res) => {
    const property = await propertyService.createProperty(req.body, req.id);
    res.status(201).json({ success: true, data: property });
};

const getAll = async (req, res) => {
    const properties = await propertyService.getProperties(req.id);
    res.status(200).json({ success: true, data: properties });
};

const getById = async (req, res) => {
    const property = await propertyService.getPropertyById(req.params.id, req.id);
    res.status(200).json({ success: true, data: property });
};

const update = async (req, res) => {
    const property = await propertyService.updateProperty(req.params.id, req.body, req.id);
    res.status(200).json({ success: true, data: property });
};

const remove = async (req, res) => {
    const result = await propertyService.deleteProperty(req.params.id, req.id);
    res.status(200).json({ success: true, data: result });
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
};