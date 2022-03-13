const router = require("express").Router();
const mongoose = require('mongoose');

const FirstPage = require('../models/FirstPage.model');
const Catalogue = require('../models/Catalogue.model')

router.post('/:catalogueId/cover', (req,res,next) => {
    const { catalogueId } = req.params
    const user = req.payload

    FirstPage.create({ image:'www.whatever.com', title: user.name, logo: user.logo, catalogueId}) 
    //colocar image e logo vazios no model (default) Img ja esta mas logo to na duvida...
    .then((newPage) => {
      console.log('user.name is', user.name)
        return Catalogue.findByIdAndUpdate(catalogueId, { cover: newPage._id }) 
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.get('/firstpage/:pageId', (req,res,next) => { //posso usar /page mesmo?
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    FirstPage.findById(pageId)
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

router.put('/firstpage/:pageId', (req,res,next) => {
    const { pageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      res.status(400).json({ message: 'Specified Id is not valid' });
      return;
    }

    FirstPage.findByIdAndUpdate(pageId, req.body, {new: true})
    .then((response) => res.json(response))
    .catch((err) => res.json(err))
})

router.delete('/firstpage/:pageId', (req,res,next) => {
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