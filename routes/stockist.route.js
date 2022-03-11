const router = require("express").Router();
const mongoose = require('mongoose');
 
const Stockist = require('../models/Stockist.model');
 
router.post('/stockist', (req, res, next) => {
  const { name, description, commission } = req.body;
 
  Stockist.create({ name, description, commission })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.get('/stockist', (req, res, next) => {
    Stockist.find()
      .then(response => res.json(response))
      .catch(err => res.json(err));
  });
 
  router.put('/stockist/:stockistId', (req,res,next) => {
      const { stockistId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(stockistId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }

      Stockist.findByIdAndUpdate(stockistId, req.body, {new: true})
      .then((response) => res.json(response))
      .catch((err) => res.json(err))
  })

  router.delete('/stockist/:stockistId', (req,res,next) => {
      const {stockistId} = req.params;

      if (!mongoose.Types.ObjectId.isValid(stockistId)) {
        res.status(400).json({ message: 'Specified Id is not valid' });
        return;
      }
      Stockist.findByIdAndDelete(stockistId)
      .then(() => res.json({ message: `Stockist with ${stockistId} was removed successfully` }))
      .catch((err) => res.json(err))
  })

module.exports = router;