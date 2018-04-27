const mongoose = require('mongoose');
const News = require('../model/upload.model');
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

  });

var upload = multer({ storage: storage }).single('avatar');

exports.uploadFile = function(req,res,next){
    upload(req,res,function(err){
        console.log(path.extname(req.file.originalname));//后缀名

    });
};




