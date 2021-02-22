const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    chat: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    dateSent: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('messages', messageSchema);