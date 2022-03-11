const router = require("express").Router();
const mongoose = require('mongoose');

const LastPage = require('../models/LastPage.model');
const Catalogue = require('../models/Catalogue.model')

router.post('/:catalogueId/lastpage', (req,res,next) => {
    const { catalogueId } = req.params

    LastPage.create({products: [], commission: 0, catalogueId})
    .then((newPage) => {
        return Catalogue.findByIdAndUpdate(catalogueId, { report: newPage._id }) 
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/lastpage/:pageId', (req,res,next) => { //posso usar /page mesmo?
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    LastPage.findById(pageId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.put('/lastpage/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    LastPage.findByIdAndUpdate(pageId, req.body, {new: true})
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

router.delete('/lastpage/:pageId', (req,res,next) => {
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