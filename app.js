require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// import database connector
const connectDB = require('./db/connect');
// import router
const productRouter = require('./routes/productRoutes')
// import middlewares
const fileUpload = require('express-fileupload')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware to read raw json in request body and file upload
app.use(express.json())
app.use(fileUpload())
app.use(express.static('public'))
// routes
app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});
app.use('/api/v1/products', productRouter)
// middleware errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
