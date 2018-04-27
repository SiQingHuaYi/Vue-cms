const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var UploadSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number 
 });

UploadSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Upload',  UploadSchema);