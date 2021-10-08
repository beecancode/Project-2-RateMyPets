const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    rating: String,
    userName: String, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
},{
 timestamps: true
});

const petSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: String,
    description: String,
    comments: [commentSchema],
    petOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});




module.exports = mongoose.model('Comment', commentSchema);
module.exports = mongoose.model('Pet', petSchema);