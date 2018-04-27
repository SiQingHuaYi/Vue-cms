const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var UserSchema = new mongoose.Schema({ 
    name: String,
    password:String,
    age: String,
    sex: String,
    date: {type:Date},
    interest:[],
    desc: String
 });

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User',  UserSchema);