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
    #swagger.responses[404] = {description : 'Aucun thème trouvé avec ce nom.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des thèmes.'}
    #swagger.parameters['name'] = {description : 'Nom du thème à rechercher.', required : true}
    */
    try {
        const queryParam = {
            where: {
                name: {[Op.iLike]: req.params.name}
            },
            include: [{
                model: wordModel
            }]
        }

        if (!await themeModel.findOne(queryParam)) {
            return res.status(404).send("Aucun thème trouvé avec ce nom.");
        }

        const data = await themeModel.findAll(queryParam)
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
    #swagger.responses[404] = {description : 'Aucun thème trouvé avec cet id.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des thèmes.'}
    #swagger.parameters['id'] = {description : 'Id du thème à rechercher.', required : true}
     */
    try {
        if (!await themeModel.findByPk(parseInt(req.params.id))) {
            return res.status(404).send("Aucun thème trouvé avec cet id.");
        }

        const data = await themeModel.findByPk(parseInt(req.params.id))
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation d'un thème."
        });
    }
}
/**
 * Récupère un thème par son alias.
 * Path : GET /themes/alias/:alias
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
getThemeByAlias = async (req, res) => {
    /*
    #swagger.tags = ['Themes']
    #swagger.description = 'Récupère un thème par son alias.'
    #swagger.responses[200] = {description : 'Thème récupéré.'}
    #swagger.responses[404] = {description : 'Aucun thème trouvé avec cet alias.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la recuperation des thèmes.'}
    #swagger.parameters['alias'] = {description : 'Alias du thème à rechercher.', required : true}
     */
    try {
        if (!await themeModel.findOne({where: {alias: req.params.alias}})) {
            return res.status(404).send("Aucun thème trouvé avec cet alias.");
        }

        const data = await themeModel.findOne({where: {alias: req.params.alias}})
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
    #swagger.responses[400] = {description : 'Ce thème existe déjà.'}
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
                    },
                "alias": {
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
        if (await themeModel.findOne({where: {name: req.body.name, alias: req.body.alias}})) {
            return res.status(400).send("Ce thème existe déjà.");
        }

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
    #swagger.responses[400] = {description : 'Ce thème existe déjà.'}
    #swagger.responses[404] = {description : 'Aucun thème trouvé avec cet id.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la modification d\'un thème.'}
    #swagger.parameters['id'] = {description : 'Id du thème à modifier.', required : true}
    #swagger.parameters['name'] = {
    in: 'body',
    '@schema': {
        "required": ["name", "alias"],
        "properties": {
            "name": {
                "type": "string",
                "minLength": 1,
                "maxLength": 255,
                "example": "Some example..."
                },
            "alias": {
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
        if (!await themeModel.findByPk(parseInt(req.params.id))) {
            return res.status(404).send("Aucun thème trouvé avec cet id.");
        }

        if (await themeModel.findOne({where: {name: req.body.name, id: {[Op.not]: req.params.id}}})) {
            return res.status(400).send("Ce thème existe déjà.");
        }

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
    #swagger.responses[400] = {description : 'Ce thème est associé à des mots, suppression impossible.'}
    #swagger.responses[404] = {description : 'Aucun thème trouvé avec cet id.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la suppression d\'un thème.'}
    #swagger.parameters['id'] = {description : 'Id du thème à supprimer.', required : true}
     */
    try {
        if (!await themeModel.findByPk(req.params.id)) {
            return res.status(404).send("Aucun thème trouvé avec cet id.");
        }

        if (await wordModel.findOne({where: {theme_id: req.params.id}})) {
            return res.status(400).send("Ce thème est associé à des mots, suppression impossible.");
        }

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
    getThemeByAlias,
    getThemeById,
    addTheme,
    modifyTheme,
    deleteTheme
}
