const router = require('express').Router();

const { getAllThoughts, getThought, createThought, deleteThought, updateThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

router.route('/').get(getAllThoughts);
router.route('/').post(createThought);

router.route('/:thoughtId').get(getThought);
router.route('/:thoughtId').delete(deleteThought);
router.route('/:thoughtId').put(updateThought);

router.route('/:thoughtId/reactions').put(addReaction);
router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction);

module.exports = router;