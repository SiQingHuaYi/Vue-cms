const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var NewsSchema = new mongoose.Schema({ 
    title: String,
    text:String,
    comment:Number,
    cateid: mongoose.Schema.ObjectId
 });

NewsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('New', NewsSchema);