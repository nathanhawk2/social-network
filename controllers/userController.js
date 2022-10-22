const { User, Thought } = require('../models');

function getAllUsers(req, res) {
  User.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500))
};

function createUser(req, res) {
  User.create(req.body)
    .then((results) => res.json(result))
    .catch((err) => res.status(500))
};

function getUser(req, res) {
  User.findOne({ _id: req.params.userId })
    .select('-__v')
    .then((result) => !result
      ? res.status(404)
      : res.json(result)
    )
};

function deleteUser(req, res) {
  User.findOneAndDelete({ _id: req.params.userId })
    .then((result) => !result
      ? res.status(404)
      : Thought.deleteMany({ _id: { $in: User.thoughts } })
    )
};

function updateUser(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
    .then((results) => !result
      ? res.status(404)
      : res.json(results)
    );
};

function addFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendsId } }, { runValidators: true, new: true })
    .then((result) => !result
      ? res.status(404)
      : res.json(result)
    );
};

function deleteFriend(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendsId } }, { runValidators: true, new: true })
    .then((result) => !result
        ? res.status(404)
        : res.json(result)
    )
};

module.exports = { getAllUsers, createUser, getUser, deleteUser, updateUser, addFriend, deleteFriend }