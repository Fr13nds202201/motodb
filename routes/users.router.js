const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');

router
    .route('/')
    .get(userController.findAllUsers)
    .post(userController.create);

router
    .route('/:id')
    .get(userController.findOneUser)
    .patch(userController.updateUser)
    .delete(userController.delete);

module.exports = router;