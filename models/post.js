/**
 * Created by MicheleSpinello on 15/02/2017.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    section:{
        type:String
    },
    head:String,
    img:String,
    content:{
        type:String
    },
    createOn:{
        type:Date,
        default:Date.now()
    },
    from:String
});

var Post = mongoose.model('Post',postSchema);

module.exports = Post;