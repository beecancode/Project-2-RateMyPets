const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    rating: String, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});





module.exports = mongoose.model('comment', commentSchema);