const {StatusCodes} = require('http-status-codes')

const createProduct = async (req, res) =>{
    res.send('test route create product')
}

const getAllProducts = async (req, res) =>{
    res.send('test route get all product')
}

module.exports = {createProduct, getAllProducts}