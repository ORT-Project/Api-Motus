const router = require('express').Router();

const {
    getAllThemes,
    getThemeById,
    addTheme,
    modifyTheme,
    deleteTheme
} = require('../constrollers/themeController')

router.get('/', getAllThemes);

router.get('/:id', getThemeById);

router.post('/', addTheme);

router.patch('/:id', modifyTheme);

router.delete('/:id', deleteTheme);

module.exports = router;
