const themeModel = require('../models/themeModel');
const wordModel = require('../models/wordModel');
const {Op} = require("sequelize");

/**
 * Récupère tous les thèmes
 * Path : GET /themes
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getAllThemes = async (req, res) => {
    try {
        const data = await themeModel.findAll()
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation des themes."
        });
    }
}

/**
 * Récupère tous les thèmes avec les mots associés
 * Path : GET /themes/words
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getAllThemesWithWords = async (req, res) => {
    try {
        const data = await themeModel.findAll({
            include: [{
                model: wordModel
            }]
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation des themes."
        });
    }
}
/**
 * Récupère un thème par son nom
 * Path : GET /themes/:name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getThemeByName = async (req, res) => {

    try {
        const data = await themeModel.findAll({
            where: {
                name: {[Op.iLike]: req.params.name}
            },
            include: [{
                model: wordModel
            }]
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation des themes."
        });
    }
}
/**
 * Récupère un thème par son id
 * Path : GET /themes/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getThemeById = async (req, res) => {
    try {
        const data = await themeModel.findByPk(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation d'un theme."
        });
    }
}
/**
 * Ajoute un thème
 * Path : POST /themes
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
addTheme = async (req, res) => {
    try {
        await themeModel.create(req.body)
        res.status(201).send("Ajout effectué");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de l'ajout d'un theme."
        });
    }
}

/**
 * Modifie un thème
 * Path : PATCH /themes/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
modifyTheme = async (req, res) => {
    try {
        await themeModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Modification effectuée");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la moditication d'un theme."
        });
    }
}

/**
 * Supprime un thème
 * Path : DELETE /themes/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
deleteTheme = async (req, res) => {
    try {
        await themeModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Suppression effectuée");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la suppression d'un theme."
        });
    }
}

module.exports = {
    getAllThemes,
    getThemeByName,
    getAllThemesWithWords,
    getThemeById,
    addTheme,
    modifyTheme,
    deleteTheme
}
