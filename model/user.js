
var mongoose = require('mongoose');

var useSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true
    },
    password:String
    // regtime:Date,
    // email:String

})

    module.exports = mongoose.model('user',useSchema)