const themeModel = require('../models/themeModel');
const wordModel = require('../models/wordModel');
const {Op} = require("sequelize");

/**
 * Récupère tous les thèmes.
 * Path : GET /themes
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getAllThemes = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Récupère tous les thèmes.'
    #swagger.responses[200] = {description : 'Thèmes récupérés.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des themes.'}
    */
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
 * Récupère tous les thèmes avec les mots associés.
 * Path : GET /themes/words
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getAllThemesWithWords = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Récupère tous les thèmes avec les mots associés.'
    #swagger.responses[200] = {description : 'Thèmes et mots récupérés.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des themes.'}
    */
    try {
        const data = await themeModel.findAll({
            include: [{
                model: wordModel
            }]
        })
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation des thèmes."
        });
    }
}
/**
 * Récupère un thème par son nom avec ses mots.
 * Path : GET /themes/:name
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getThemeByName = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Récupère un thème par son nom avec ses mots.'
    #swagger.responses[200] = {description : 'Thème récupéré.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des thèmes.'}
    #swagger.parameters['name'] = {description : 'Nom du thème à rechercher.', required : true}
    */
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
            message: error.message || "Erreur survenue lors de la recuperation des thèmes."
        });
    }
}
/**
 * Récupère un thème par son id.
 * Path : GET /themes/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getThemeById = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Récupère un thème par son id.'
    #swagger.responses[200] = {description : 'Thème récupéré.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des thèmes.'}
    #swagger.parameters['id'] = {description : 'Id du thème à rechercher.', required : true}
     */
    try {
        const data = await themeModel.findByPk(parseInt(req.params.id))
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation d'un thème."
        });
    }
}
/**
 * Ajoute un thème.
 * Path : POST /themes
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
addTheme = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Ajoute un thème'
    #swagger.responses[201] = {description : 'Ajout effectué.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de l\'ajout d\'un thème.'}
    #swagger.parameters['name'] = {
        in: 'body',
        '@schema': {
            "required": ["name"],
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": "Some example..."
                    }
                }
            }
        }
    */
    try {
        await themeModel.create(req.body)
        res.status(201).send("Ajout effectué.");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de l'ajout d'un theme."
        });
    }
}

/**
 * Modifie un thème.
 * Path : PATCH /themes/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
modifyTheme = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Modifie un thème.'
    #swagger.responses[200] = {description : 'Modification effectuée.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la modification d\'un thème.'}
    #swagger.parameters['id'] = {description : 'Id du thème à modifier.', required : true}
    #swagger.parameters['name'] = {
    in: 'body',
    '@schema': {
        "required": ["name"],
        "properties": {
            "name": {
                "type": "string",
                "minLength": 1,
                "maxLength": 255,
                "example": "Some example..."
                }
            }
        }
    }
    */
    try {
        await themeModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Modification effectuée.");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la modification d'un thème."
        });
    }
}

/**
 * Supprime un thème.
 * Path : DELETE /themes/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
deleteTheme = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Supprime un thème.'
    #swagger.responses[200] = {description : 'Suppression effectuée.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la suppression d\'un thème.'}
    #swagger.parameters['id'] = {description : 'Id du thème à supprimer.', required : true}
     */
    try {
        await themeModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Suppression effectuée.");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la suppression d'un thème."
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
