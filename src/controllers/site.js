

// site controller
'use strict';

module.exports.home = function (req, res, next) {
    res.render('index', {
        title: 'TechBYO - Bulawayo Technology'
    });
};