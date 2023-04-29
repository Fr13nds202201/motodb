const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const validations = require('../middlewares/validations.middlewares');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router
    .route('/')
    .get(authMiddleware.protects, userController.findAllUsers)
    .post(userController.create);

router
    .post('/login', validations.loginUserValidation, authController.login);

router
    .route('/:id')
    .get(userController.findOneUser)
    .patch(userController.updateUser)
    .delete(userController.delete);

module.exports = router;