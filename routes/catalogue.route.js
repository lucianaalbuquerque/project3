const router = require("express").Router();
const mongoose = require('mongoose');

const Catalogue = require('../models/Catalogue.model')

router.post('/catalogue', (req,res,next) => {
    /* const {name, description, cover, about, pages, report} = req.body */

    Catalogue.create({name: '', cover: null, about: null, pages: [], report: null})
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/catalogues', (req,res,next) => {
    const {_id} = req.payload 
    console.log('catalogueID:', _id) 
    /* const _id = '622a4e66e09d15972079812a' (do user)*/

    Catalogue.findOne({_id})
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/catalogue/:catalogueId', (req,res,next) => {
    const { catalogueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(catalogueId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    Catalogue.findById(catalogueId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.put('/catalogue/:catalogueId', (req,res,next) => {
    const { catalogueId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(catalogueId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    Catalogue.findByIdAndUpdate(catalogueId, req.body, {new: true})
    .then((response) => res.json(response))
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