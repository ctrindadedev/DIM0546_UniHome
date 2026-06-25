const { z } = require('zod');

const levelSchema = z.coerce.number().int().min(1).max(5);
const moneySchema = z.coerce.number().min(0);

const profileSchema = z.object({
    cleanlinessLevel: levelSchema,
    noiseToleranceLevel: levelSchema,
    socialLevel: levelSchema,
    sleepTime: z.enum(['antes-22', '22-00', '00-02', 'depois-02']),
    wakeTime: z.enum(['antes-7', '7-9', '9-11', 'depois-11']),
    studyRoutine: z.enum(['manha', 'tarde', 'noite', 'flexivel']),
    acceptsPets: z.coerce.boolean(),
    hasPets: z.coerce.boolean(),
    budgetMin: moneySchema,
    budgetMax: moneySchema,
    neighborhood: z.string().min(3)
}).refine((data) => data.budgetMax >= data.budgetMin, {
    path: ['budgetMax'],
    message: 'O orçamento máximo deve ser maior ou igual ao mínimo'
});

const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(8).optional().nullable(),
    university: z.string().min(2),
    course: z.string().min(2),
    semester: z.string().min(1),
    avatarUrl: z.string().url().optional().nullable(),
    bio: z.string().min(20),
    profile: profileSchema
});

const updateUserSchema = createUserSchema.partial().extend({
    profile: profileSchema.optional()
});

const userIdSchema = z.object({
    id: z.coerce.number().int().positive()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    profileSchema,
    userIdSchema
};
