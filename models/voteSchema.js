const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    option: String,
    count: { type: Number, default: 0 }
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;