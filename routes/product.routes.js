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

router.post('/product', (req, res, next) => {
  const { name, description, price, costPrice, ref, imageUrl } = req.body;
 
  Product.create({ name, description, price, costPrice, ref, imageUrl })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.put('/addproduct/:pageId', async (req,res,next) => {
  const { pageId } = req.params
  const { value, catalogueId } = req.body
  
  try {
    const response = await Page.findByIdAndUpdate(pageId, { $push: { products: value._id } }, { new: true })
    await Catalogue.findByIdAndUpdate(catalogueId, { $push: { products: value._id } }, { new: true })
    res.status(200).json(response);
  } catch (error) {
    res.json(error)
  }
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