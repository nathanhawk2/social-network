const router = require('express').Router();

const { getAllUsers, getUser, createUser, deleteUser, updateUser, addFriend, deleteFriend } = require('../../controllers/userController');

router.route('/').get(getAllUsers);
router.route('/').post(createUser);

router.route('/:userId').get(getUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);

router.route('/:userId/friends/:friendsId').delete(deleteFriend);
router.route('/:userId/friends/:friendsId').put(addFriend);

module.exports = router; 