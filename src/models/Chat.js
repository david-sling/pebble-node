const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    participants: [{
        type: String,
        required: true
    }],
    name: {
        type: String,
        required: false
    },
    dm:{
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Chats', ChatSchema);