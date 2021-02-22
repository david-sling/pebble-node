const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const authToken = require('../services/verifyToken');

//Get all posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
});

//Get all posts
router.get('/res', authToken, async (req, res) => {
    try{
        const user = await User.findOne({_id: req.user._id});
        res.json(user);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
});

//Submit a post
router.post('/', async (req, res)=> {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        let savedPost = await post.save();
        res.json(savedPost);
    }
    catch(err){
        console.log('error');
        res.json({message: err});
    }
    
})

//get one post
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
  
});


//Delete post
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Post.findByIdAndRemove(req.params.postId);
        res.json(removedPost);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
  
});

//update one
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    description: req.body.description
                }
            });
        res.json(updatedPost);
    }catch(err){
        console.log('error');
        res.json({message: err});
    }
  
});



module.exports = router;