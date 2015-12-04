'use strict';

var Email = require('../models/email');

// email controller
module.exports.save = function (req, res, next) {
  req.assert('name', 'Name must be at least 3 characters long').len(3);
  req.assert('email', 'Please enter a valid email').isEmail();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  Email.forge({
    name: req.body.name,
    email: req.body.email
  }).save().then(function (model) {
    req.flash('success', { msg: "Thank you for submitting your details. Expect an email fom us soon." });
    return res.redirect('back');
  })['catch'](function (error) {
    console.error(error.stack);
    req.flash('error', { msg: 'An error occured, your details could not be saved.' });
    return res.redirect('back');
  });
};