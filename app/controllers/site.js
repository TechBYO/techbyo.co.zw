"use strict"

// site controller
module.exports.home = function (req, res, next) {
    res.render('index', {
        title: 'TechBYO - Bulawayo Technology',
    });
};
