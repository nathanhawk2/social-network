const router = require('express').Router();

const { getAllUsers, getUser, createUser, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendsId').delete(deleteFriend).put(addFriend);

module.exports = router; 