const prisma = require('../../config/database');
const { info } = require("../../utils/logger");
const { NotFoundError } = require("../../errors/AppError");

async function createProperty(data, reqId) {
    info({ reqId }, 'Salvando nova propriedade no banco de dados');

    const property = await prisma.property.create({
        data: data
    });

    return property;
}

async function getProperties(reqId) {
    info({ reqId }, 'Buscando todas propriedades cadastradas');
    return prisma.property.findMany({
        orderBy: { createdAt: 'desc' }
    });
}

async function getPropertyById(id, reqId) {
    info({ reqId, propertyId: id }, 'Buscando imóvel específico no banco');

    const property = await prisma.property.findUnique({
        where: { id: id }
    });

    if (!property) {
        throw new NotFoundError('Imóvel não encontrado');
    }

    return property;
}

async function updateProperty(id, data, reqId) {
    info({ reqId, propertyId: id }, 'Iniciando atualização do imóvel');

    const existingProperty = await prisma.property.findUnique({
        where: { id: id }
    });

    if (!existingProperty) {
        throw new NotFoundError('Imóvel não encontrado para atualização');
    }

    const updatedProperty = await prisma.property.update({
        where: { id: id },
        data: data
    });

    return updatedProperty;
}

async function deleteProperty(id, reqId) {
    info({ reqId, propertyId: id }, 'Iniciando exclusão do imóvel');

    const existingProperty = await prisma.property.findUnique({
        where: { id: id }
    });

    if (!existingProperty) {
        throw new NotFoundError('Imóvel não encontrado para exclusão');
    }

    await prisma.property.delete({
        where: { id: id }
    });

    return { message: 'Imóvel deletado com sucesso' };
}

module.exports = {
    createProperty,
    getPropertyById,
    getProperties,
    updateProperty,
    deleteProperty
};