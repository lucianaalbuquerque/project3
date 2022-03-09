const router = require("express").Router();
// const mongoose = require('mongoose');
 
const Product = require('../models/Product.model');
 
//  POST /api/products  -  Creates a new product
router.post('/product', (req, res, next) => {
  const { title, description, price, images } = req.body;
 
  Product.create({ title, description, price, images })
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
      Product.findByIdAndDelete(producId)
      .then(() => res.json({ message: `Project with ${projectId} was removed successfully` }))
      .catch((err) => res.json(err))
  })

module.exports = router;