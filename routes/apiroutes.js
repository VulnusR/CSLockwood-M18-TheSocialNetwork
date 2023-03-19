const router = require('express').Router();
const { User, Thought } = require('../models');
const Reaction = require('../models/Reaction');

// GET all users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } 
    
    catch (err) {
      console.log(err);
      console.log("GET Route all users by ID failed--circa line 5")
      res.status(500).json(err);
    }
});

// GET a single user by id
router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } 
    
    catch (err) {
      console.log(err);
      console.log("GET Route single user by ID failed--circa line 19")
      res.status(500).json(err);
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } 
    
    catch (err) {
      console.log(err);
      console.log("Post Route create user failed--circa line 33")
      res.status(500).json(err);
    }
});

// PUT update a user by id
router.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(user);
    } 
    
    catch (err) {
      console.log(err);
      console.log("PUT update user by ID--circa line 47")
      res.status(500).json(err);
    }
});

// POST add a friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } 
    
    catch (err) {
      console.log(err);
      console.log("POST add friend failed")
      res.status(500).json(err);
    }
});
  
// DELETE remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
      res.json(user);
    } 
    
    catch (err) {
      console.log(err);
      console.log("Delete Friend failed")
      res.status(500).json(err);
    }
});

// GET all thoughts
router.get('/thoughts', async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } 
    
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
// GET a single thought by id
router.get('/thoughts/:id', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});
  
// POST a new thought
router.post('/thoughts', async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST a new reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this id" });
      }
  
      const reaction = await Reaction.create(req.body);
      thought.reactions.push(reaction._id);
      await thought.save();
  
      res.json(reaction);
    } 
    
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// DELETE a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "No thought found with this id" });
      }
  
      await Reaction.findByIdAndDelete(req.params.reactionId);
      thought.reactions.pull(req.params.reactionId);
      await thought.save();
  
      res.json({ message: "Reaction deleted successfully" });
    } 
    
    catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});