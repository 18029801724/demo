var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var blogSchema = Schema({
	author: {
		type: ObjectId,
		ref: 'user'
	},
    title:String,
    content:String,
    // createTime:Date
    // updataTime:Date,
    // type:String,
    

})

    module.exports = mongoose.model('blog',blogSchema)