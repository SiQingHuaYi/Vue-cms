const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var CommentsSchema = new mongoose.Schema({ 
    title: String,
    text:String,
    cateid:mongoose.Schema.ObjectId
 });

 CommentsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Comment', CommentsSchema);