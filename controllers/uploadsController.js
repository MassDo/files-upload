const path = require('path')
const {StatusCodes} = require('http-status-codes')
const customError = require('../errors')

const uploadProductImage = async (req, res) =>{
    if(!req.files){
        throw new customError.BadRequestError('Please upload a file')
    }
    if(!req.files.image.mimetype.startsWith('image')){
        throw new customError.BadRequestError('Please upload an image not other file ! :)')
    }
    const maxSize = 1024 * 1024
    if(req.files.image.size > maxSize){
        throw new customError.BadRequestError('Sorry but the image is too big ... :(')
    }
    const productImage = req.files.image
    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
}

module.exports = uploadProductImage