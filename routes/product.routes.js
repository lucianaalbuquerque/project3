const router = require("express").Router();
const mongoose = require('mongoose');

const Product = require('../models/Product.model');

////////////////////////////CLOUDINARY/////////////////////////////

const fileUploader = require("../config/cloudinary.config");

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/product/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});



router.post('/product', (req, res, next) => {
  const { name, description, price, modelImages } = req.body;
 
  Product.create({ name, description, price, modelImages, productImage: '' })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.get('/product', (req, res, next) => {
    Product.find()
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });
 
  router.put('/product/:productId', (req,res,next) => {
      const { productId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

      Product.findByIdAndUpdate(productId, req.body, {new: true})
      .then((response) => res.json(response))
      .catch((err) => res.json(err))
  })

  router.delete('/product/:productId', (req,res,next) => {
      const {productId} = req.params;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }
      Product.findByIdAndDelete(productId)
      .then(() => res.json({ message: `Product with ${productId} was removed successfully` }))
      .catch((err) => res.json(err))
  })

module.exports = router;