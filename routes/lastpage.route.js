const router = require("express").Router();
const mongoose = require('mongoose');

const LastPage = require('../models/LastPage.model');
const Catalogue = require('../models/Catalogue.model')

//Create a report in the catalogue

router.get('/lastpage/:catalogueId', async (req,res,next) => {
  const { catalogueId } = req.params
  try {
    const response = await LastPage.create({ catalogueId })
    await Catalogue.findByIdAndUpdate(catalogueId, { report: response }, { new: true })
    res.status(200).json(response);
  } catch (error) {
    res.json(error)
  }
})

// get products inside the catalogue

router.get('/:catalogueId/report/:pageId', (req,res,next) => { 
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    LastPage.findById(pageId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

//Get all the products inside a catalogue
router.get('/catalogue-products/:catalogueId', (req,res,next) => {
  const { catalogueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(catalogueId)) {
    res.status(400).json({ message: 'Specified Id is not valid' });
    return;
  }

  Catalogue.findById(catalogueId)
  .populate('products')
  .then(response => {
    res.json(response)
    console.log('response to products catalogue:', response)
  })
  .catch(err => res.json(err));
})

router.put('/report/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    LastPage.findByIdAndUpdate(pageId, req.body, {new: true})
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

router.delete('/report/:pageId', (req,res,next) => {
    const {pageId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    LastPage.findByIdAndDelete(pageId)
    .then(() => res.json({ message: `Page with ${pageId} was removed successfully` }))
    .catch((err) => res.json(err))
})

module.exports = router;