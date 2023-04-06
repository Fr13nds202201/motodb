const express = require('express');
const repairController = require('./../controllers/repair.controller');
const router = express.Router();


router
    .route('/')
    .get(repairController.findAllRepairs)
    .post(repairController.create);

router
    .route('/:id')
    .get(repairController.findOneReparirs)
    .patch(repairController.updateRepairs)
    .delete(repairController.deleteRepairs);


module.exports = router;