const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    rating: String, 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const petSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: String,
    comments: [commentSchema],
    petOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});





module.exports = mongoose.model('Pet', petSchema);