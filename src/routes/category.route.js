const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/category.controller.js');

router.get('/all', categoryController.getAllCategories);
router.post('/create', categoryController.addCategory);

module.exports = router;
