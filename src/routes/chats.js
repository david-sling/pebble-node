const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const User = require("../models/User");

//GET all chats of user
router.post("/", async (req, res) => {
  try {
    // console.log('post')
    //get user
    //const user = await User.findOne({_id: req.user._id});
    const chats = await Chat.find({ participants: req.user._id }).sort({
      dateUpdated: -1,
    });
    res.json(chats);
  } catch (err) {
    console.log("error");
    res.json({ message: err });
  }
});

//Create a new Chat
router.post("/create", async (req, res) => {
  const participants = await User.find({
    username: { $in: req.body.participants },
  });
  const dm = false;
  if (participants.length == 0) return;
  const newChat = await new Chat({
    participants: [req.user._id, ...participants.map((p) => p._id)],
    dm,
  });
  try {
    let savedChat = await newChat.save();
    res.json(savedChat);
  } catch (err) {
    console.log("error");
    res.json({ message: err });
  }
});

//Create a new dm
router.post("/createdm", async (req, res) => {
  const participant = await User.findOne({
    username: req.body.participant,
  });
  console.log({ participant });
  //Check if dm exists
  const chat = await Chat.findOne({
    participants: [req.user._id, participant._id],
    dm: true,
  });
  //   console.log(chat);
  if (chat) {
    res.json(chat);
    return;
  }

  const dm = true;
  if (participant.length == 0) return;
  const newChat = await new Chat({
    participants: [req.user._id, participant._id],
    dm,
  });
  try {
    let savedChat = await newChat.save();
    res.json(savedChat);
  } catch (err) {
    console.log("error");
    res.json({ message: err });
  }
});

module.exports = router;
