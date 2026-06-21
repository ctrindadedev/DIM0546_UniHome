const prisma = require('../../config/database');
const requestId = require("../../middlewares/requestId");
const {info} = require("../../utils/logger");

async function createProperty(data) {
    const property = await prisma.property.create({
        data: {
            title: data.title,
            price: data.price,
            beds: data.beds,
            address: data.address,
            description: data.description,
        }
    });

    return property;
}

async function getPropertyById(id) {
    info({ requestId, propertyId: id }, 'Buscando imóvel no banco')
    return await prisma.property.findUnique({
        where: { id: id }
    });
}

module.exports = {
    createProperty,
    getPropertyById
};