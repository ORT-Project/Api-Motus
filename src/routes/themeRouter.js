const router = require('express').Router();

const {
    getAllThemes,
    getAllThemesWithWords,
    getThemeByName,
    getThemeById,
    addTheme,
    modifyTheme,
    deleteTheme
} = require('../constrollers/themeController')

router.get('/', getAllThemes);

router.get('/words', getAllThemesWithWords);

router.get('/byName/:name', getThemeByName);

router.get('/:id', getThemeById);

router.post('/', addTheme);

router.patch('/:id', modifyTheme);

router.delete('/:id', deleteTheme);

module.exports = router;
