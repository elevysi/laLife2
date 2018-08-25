var express = require("express");
var router = express.Router();
var path = require('path');

const angularBuildPath = path.join(__dirname, '../dist/laLife2');
router.use(express.static(angularBuildPath));

exports.index = (req, res, next) => {
    // res.sendFile(path.join(__dirname + '/..', 'dist/index.html'));
    //res.render('index.html');

    if (req.url.startsWith('/api')) return next();
    res.sendFile(`${angularBuildPath}/index.html`);
};