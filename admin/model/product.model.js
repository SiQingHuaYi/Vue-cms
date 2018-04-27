const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var ProductSchema = new mongoose.Schema({ 
    title: String,
    price:Number,
    count:Number,
    cateid: mongoose.Schema.ObjectId
 });

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product',ProductSchema );