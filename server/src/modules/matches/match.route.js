const express = require("express");
const matchController = require("./match.controller");
const { validateAll } = require("../../middlewares/validate");
const {
  matchParamsSchema,
  matchQuerySchema,
} = require("./match.schema");

const router = express.Router();

router.get(
  "/:userId",
  validateAll({ params: matchParamsSchema, query: matchQuerySchema }),
  matchController.getByUserId,
);

module.exports = router;
