const router = require("express").Router();
const mongoose = require('mongoose');

const Product = require('../models/Product.model');
const Page = require('../models/Page.model');
const Catalogue = require('../models/Catalogue.model');

const fileUploader = require("../config/cloudinary.config");

router.post("/upload", fileUploader.single("file"), (req, res, next) => {
  console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

/* router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
}); */

router.post('/product', (req, res, next) => {
  const { name, description, price, imageUrl } = req.body;
 
  Product.create({ name, description, price, imageUrl })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.post('/addproduct/:pageId', (req,res,next) => {
  const { pageId } = req.params
  const { productId } = req.body

  Product.findById(productId)
  .then((productFound) => {
      return Page.findByIdAndUpdate(pageId, { $push: { products: productFound._id } }, { new: true }) 
  })
  .then((productFound) => {
    return Catalogue.findByIdAndUpdate(catalogueId, { $push: { products: productFound._id } }, { new: true }) 
  })
  .then((response) =>{
    console.log('response on server to create a product in page:', response)
    res.json(response)})
  .catch(err => res.json(err));
})

router.get('/products', (req, res, next) => {
    Product.find()
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });

  router.get('/product/:productId', (req, res, next) => {
    const {productId} = req.params
    Product.findById(productId)
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