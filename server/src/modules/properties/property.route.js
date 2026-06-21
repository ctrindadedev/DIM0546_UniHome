const express = require('express');
const router = express.Router();
const propertyController = require('./property.controller');
const { validate } = require('../../middlewares/validate');
const schema = require('./property.schema');

router.post(
    '/',
    validate(schema.createPropertySchema, 'body'),
    propertyController.create
);

router.get(
    '/:id',
    validate(schema.propertyIdSchema, 'params'),
    propertyController.getById
);

module.exports = router;