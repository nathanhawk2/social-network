const { Thought, User } = require('../models');


function getAllThoughts(req, res) {
  Thought.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err))
};

function createThought(req, res) {
  Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: thought._id } }, { runValidators: true, new: true });
    })
    .then((result) => !result
      ? res.status(404)
      : res.json(result)
    );
};

function getThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((result) => {
      !result
        ? res.status(404)
        : res.json(result)
    });
};

function deleteThought(req, res) {
  Thought.findOne({ _id: req.params.thoughtId })
    .then((result) => !result
      ? res.status(404)
      : res.json('Deleted!')
    );
};

function updateThought(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
    .then((result) => !result
    ? res.status(404)
    : res.json(result)
    );
};

function addReaction(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true })
    .then((result) => {
      !result
      ? res.status(404)
      : res.json(result)
    });
};

function deleteReaction(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.params.reactionsId } }, { new: true })
    .then((result) => ((!result
      ? res.status(404)
      : res.json(result)
    )));
};

module.exports = { getAllThoughts, createThought, getThought, deleteThought, updateThought, addReaction, deleteReaction }