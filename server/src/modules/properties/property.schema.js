const { z } = require('zod');

const createPropertySchema = z.object({
    title: z.string().min(5, "O título precisa ter no mínimo 5 letras"),
    price: z.number().positive("O preço deve ser maior que zero"),
    beds: z.number().int().min(1, "O imóvel precisa ter pelo menos 1 quarto"),
    address: z.string().min(10, "Endereço muito curto"),
    description: z.string().min(20, "Forneça uma descrição melhor")
});


const propertyIdSchema = z.object({
    id: z.coerce.number().int().positive()
});

module.exports = {
    createPropertySchema,
    propertyIdSchema
};