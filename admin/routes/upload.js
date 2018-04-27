var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/upload.controller');

router.post('/uploadFile',dataCtrl.uploadFile);


module.exports = router;