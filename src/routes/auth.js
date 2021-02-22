const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
//const {registerValidation, loginValidation} = require('../validation');
require('dotenv/config');


router.post('/register',  async (req, res)=>{
    //return res.send('works')

    //validation
    //const {error} = registerValidation(req.body);
    //if (error) return res.status(400).send(error.details[0].message);

    //check existing user
    const userExist = await User.findOne({username: req.body.username});
    if (userExist) return res.status(400).send('User already exists!');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create user
     const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword
    });
    //save user
    try{
        const savedUser = await user.save();
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post('/login', async (req,res) => {

    //validation
    // const {error} = loginValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //check if user exists
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(400).send('Email doesnt exist');  

    //res.send(user.password)

    
    //password is correct?
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    //res.send('verified password')
    
    //Create Token
    const token = jwt.sign({_id: user._id}, 'tokensecret');
    res.send({token:token});

    res.json({message:'Logged in!'});
});


module.exports = router;