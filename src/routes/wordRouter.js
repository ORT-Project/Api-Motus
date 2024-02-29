const router = require('express').Router();

const {
    getAllWords,
    getWordById,
    addWord,
    modifyWord,
    deleteWord
} = require('../constrollers/wordController');

router.get('/', getAllWords);

router.get('/:id', getWordById);

router.post('/', addWord);

router.patch('/:id', modifyWord);

router.delete('/:id', deleteWord);

module.exports = router;