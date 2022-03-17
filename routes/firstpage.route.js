const router = require("express").Router();
const mongoose = require('mongoose');

const FirstPage = require('../models/FirstPage.model');
const Catalogue = require('../models/Catalogue.model')

router.get('/:catalogueId/cover', async (req,res,next) => {
  const { catalogueId } = req.params
  try {
    const response = await FirstPage.create({ catalogueId })
    await Catalogue.findByIdAndUpdate(catalogueId, { cover: response }, { new: true })
    res.status(200).json(response);
  } catch (error) {
    res.json(error)
  }
})

router.get('/cover/:pageId', (req,res,next) => { 
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    FirstPage.findById(pageId)
    .populate('catalogueId')
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.put('/cover/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    FirstPage.findByIdAndUpdate(pageId, req.body, {new: true})
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

router.delete('/cover/:pageId', (req,res,next) => {
    const {pageId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    FirstPage.findByIdAndDelete(pageId)
    .then(() => res.json({ message: `Page with ${pageId} was removed successfully` }))
    .catch((err) => res.json(err))
})

module.exports = router;