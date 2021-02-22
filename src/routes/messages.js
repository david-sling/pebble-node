const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');

//GET all messages in a chat
router.post('/get/:chatId', async (req, res) => {

    //check if the user is authorized to access the Chat
    const chat = await Chat.find({
        _id: req.params.chatId,
        participants: req.user._id
    })
    if (!chat) return res.send('Access Denied')

    try{
        const messages = await Message.find({
            chat: req.params.chatId
        }).sort({'dateSent':-1})
        // console.log('here')
        res.json(messages)
    }catch(err){
        res.send(err)
    }
})

//POST a message to a chat
router.post('/:chatId', async (req, res) => {
console.log('post')
    //check if the user is authorized to access the Chat
    const chat = await Chat.find({
        _id: req.params.chatId,
        participants: req.user._id
    })
    if (!chat) return res.send('Access Denied')

    const newMessage = await new Message({
        chat: req.params.chatId,
        sender: req.user._id,
        message: req.body.message
    })
    try{
        const savedMessage = await newMessage.save()
        const updatedChat = await Chat.findOneAndUpdate({_id:chat._id},{dateUpdated: Date.now()}) //update
        res.send(savedMessage)
        console.log(updatedChat)
    }catch(err){
        res.send(err)
    }
})

//DELETE a message from a chat

module.exports=router;