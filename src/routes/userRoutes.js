var express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Account = require('../models/Account');
var router = express.Router();

router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        message: 'Users fetched successfully!',
        users: users,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error occurred',
        error: error,
      });
    });
});

// User.findOne({ _id: ObjectId(req.params.id) })

router.get('/:id', (req, res, next) => {
  console.log('ID PARAM IS ==== ', req.params.id);
  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json({
        message: 'User fetched successfully!',
        user: user,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error occurred',
        error: error,
      });
    });
});

router.put('/:id', (req, res, next) => {
  const post = new User({
    _id: req.body._id,
    email: req.body.email,
    password: req.body.password,
  });
  User.updateOne({ _id: req.params.id }, post).then((result) => {
    res.status(200).json({ message: 'Update successful!' });
  });
});

router.delete('/:id', (req, res, next) => {
  console.log('DELETE CALLED');
  User.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: 'User deleted!' });
  });
});

module.exports = router;
