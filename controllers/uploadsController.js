const path = require('path')
const {StatusCodes} = require('http-status-codes')
const customError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadProductImageLocal = async (req, res) =>{
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
const uploadProductImage = async (req, res) =>{
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename:true,
            folder:'file-upload'
        }
    )
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}
module.exports = {uploadProductImageLocal, uploadProductImage}