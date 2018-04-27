const mongoose = require('mongoose');
materializedPlugin = require('mongoose-materialized');
var CateSchema = new mongoose.Schema({ 
    type: Number,
    title: String,
    parentId: mongoose.Schema.ObjectId
 });

CateSchema.plugin(materializedPlugin);
module.exports = mongoose.model('Cate',  CateSchema);