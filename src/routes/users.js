const express = require('express');
const router = express.Router();
const authToken = require('../services/verifyToken')
const User = require('../models/User');

//GET users by id
router.post('/id', async (req,res) => {

    try{
        const users = await User.find({_id: {$in: req.body.users}});
        res.json(users);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
  
});
router.get('/:username', async (req,res) => {

    try{
        const user = await User.findOne({username: req.params.username});
        res.json({name: user.name, username: user.username, _id: user._id});
    }catch(err){
        console.log(err);
        res.json({message: err});
    }
  
});
router.get('/all/:username', async (req,res) => {

    try{
        const user = await User.find({$or: [{username: {$regex: req.params.username, $options:'i'}},{password:0}, {name: {$regex: req.params.username, $options:'i'}},{password:0} ]});
        res.json(user);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
  
});

router.post('/details', authToken, async (req,res) => {

    try{
        const user = await User.findOne({_id: req.user._id});
        res.json(user);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
  
});

module.exports=router;