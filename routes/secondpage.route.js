const router = require("express").Router();
const mongoose = require('mongoose');

const SecondPage = require('../models/SecondPage.model');
const Catalogue = require('../models/Catalogue.model')

router.post('/:catalogueId/secondpage', (req,res,next) => {
    const { catalogueId } = req.params

    SecondPage.create({description: '', logo: '', catalogueId})
    .then((newPage) => {
        return Catalogue.findByIdAndUpdate(catalogueId, { about: newPage._id }) 
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/secondpage/:pageId', (req,res,next) => { //posso usar /page mesmo?
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    SecondPage.findById(pageId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.put('/secondpage/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    SecondPage.findByIdAndUpdate(pageId, req.body, {new: true})
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

router.delete('/secondpage/:pageId', (req,res,next) => {
    const {pageId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    SecondPage.findByIdAndDelete(pageId)
    .then(() => res.json({ message: `Page with ${pageId} was removed successfully` }))
    .catch((err) => res.json(err))
})

module.exports = router;