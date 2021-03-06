const router = require("express").Router();
const mongoose = require('mongoose');

const Page = require('../models/Page.model');
const Catalogue = require('../models/Catalogue.model')

router.get('/addpage/:catalogueId', async (req,res,next) => {
  const { catalogueId } = req.params
  try {
    const response = await Page.create({ catalogueId })
    await Catalogue.findByIdAndUpdate(catalogueId, { $push: { pages: response } }, { new: true })
    res.status(200).json(response);
  } catch (error) {
    res.json(error)
  }
})

router.get('/page/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    Page.findById(pageId)
    .populate('products')
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.put('/page/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    Page.findByIdAndUpdate(pageId, req.body, {new: true})
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

router.delete('/page/:pageId', (req,res,next) => {
    const {pageId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    Page.findByIdAndDelete(pageId)
    .then(() => res.json({ message: `Page with ${pageId} was removed successfully` }))
    .catch((err) => res.json(err))
})



module.exports = router;