const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const catchAsync = require('../../utils/catchAsync');
const { validate } = require('../../middlewares/validate');
const schema = require('./user.schema');

router.get('/me', catchAsync(userController.getMe));

router.put(
    '/me',
    validate(schema.updateUserSchema, 'body'),
    catchAsync(userController.updateMe)
);

router.post(
    '/',
    validate(schema.createUserSchema, 'body'),
    catchAsync(userController.create)
);

router.get('/', catchAsync(userController.getAll));

router.get(
    '/:id',
    validate(schema.userIdSchema, 'params'),
    catchAsync(userController.getById)
);

router.put(
    '/:id',
    validate(schema.updateUserSchema, 'body'),
    validate(schema.userIdSchema, 'params'),
    catchAsync(userController.update)
);

router.delete(
    '/:id',
    validate(schema.userIdSchema, 'params'),
    catchAsync(userController.remove)
);

module.exports = router;
