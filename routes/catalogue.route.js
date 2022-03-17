const router = require("express").Router();
const mongoose = require('mongoose');

const Catalogue = require('../models/Catalogue.model')
const FirstPage = require('../models/FirstPage.model')

router.get('/catalogue', (req,res,next) => {
  const user = req.payload._id 

  Catalogue.create({user})
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/catalogues', (req,res,next) => {
     const user = req.payload._id 

    Catalogue.find({user})
    .then(response =>{
        console.log(response.data)
       res.json(response)})
    .catch(err => res.json(err));
})

router.get('/catalogue/:catalogueId', (req,res,next) => {
    const { catalogueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(catalogueId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    Catalogue.findById(catalogueId)
    .populate('cover')
    .populate('pages')
    .populate('report')
    .then(response => {
      res.json(response)
    })
    .catch(err => res.json(err));
})


router.put('/catalogue/:catalogueId', (req,res,next) => {
    const { catalogueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(catalogueId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    Catalogue.findByIdAndUpdate(catalogueId, req.body, {new: true})
    .then((response) => {
      res.json(response)})
    .catch((err) => res.json(err))
})

router.delete('/catalogue/:catalogueId', (req,res,next) => {
    const {catalogueId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(catalogueId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }
    Catalogue.findByIdAndDelete(catalogueId)
    .then(() => res.json({ message: `Catalogue with ${catalogueId} was removed successfully` }))
    .catch((err) => res.json(err))
})


module.exports = router;