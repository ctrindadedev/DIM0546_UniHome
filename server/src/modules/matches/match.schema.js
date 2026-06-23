const { z } = require("zod");

const matchParamsSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

const matchQuerySchema = z.object({
  minCompatibility: z.coerce.number().min(0).max(100).optional(),
  studyRoutine: z
    .enum(["matutina", "vespertina", "noturna", "flexivel"])
    .optional(),
  acceptsPets: z
    .enum(["true", "false"])
    .transform((value) => value === "true")
    .optional(),
});

module.exports = {
  matchParamsSchema,
  matchQuerySchema,
};
