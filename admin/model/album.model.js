const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var AlbumSchema = new mongoose.Schema({ 
    title: String,
    url:String
 });

AlbumSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('album',AlbumSchema );