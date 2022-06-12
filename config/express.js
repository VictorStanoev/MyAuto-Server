const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSecret = process.env.COOKIESECRET || 'Project_123';
//const { errorHandler } = require('../utils')

module.exports = (app) => {
    app.use(express.json({limit: '50mb'}));

    app.use(cookieParser(cookieSecret));

    app.use(express.static(path.resolve(__basedir, 'static')));

    //app.use(errorHandler(err, req, res, next));
};
