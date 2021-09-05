const express = require('express')
const router = express.Router()
const {createProduct, getAllProducts} = require('../controllers/productController')

// extends /api/v1/products
router.route('/').post(createProduct).get(getAllProducts)

module.exports = router