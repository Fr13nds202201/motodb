const express = require('express');
const repairController = require('./../controllers/repair.controller');

const router = express.Router();


router
    .route('/')
    .get(repairController.finAll);

module.exports = router;