const uploadProductImage = async (req, res) =>{
    console.log(req.body)
    res.send('test route for uploaded image')
}

module.exports = uploadProductImage