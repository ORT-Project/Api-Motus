const wordModel = require('../models/wordModel');
const {Op} = require("sequelize");


/**
 * Récupère tous les mots.
 * Path : GET /words
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getAllWords = async (req, res) => {
    /*
    #swagger.tags = ['Words']
    #swagger.description = 'Récupère tous les mots.'
    #swagger.responses[200] = {description : 'Mots récupérés.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la récuperation des mots.'}
    */
    try {
        const data = await wordModel.findAll()
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la récuperation des mots."
        });
    }
}

/**
 * Récupère un mot par son id.
 * Path : GET /words/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getWordById = async (req, res) => {
    /*
    #swagger.tags = ['Words']
    #swagger.description = 'Récupère un mot par son id.'
    #swagger.responses[200] = {description : 'Mot récupéré.'}
    #swagger.responses[404] = {description : 'Aucun mot trouvé avec cet id.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la récuperation d\'un mot.'}
    #swagger.parameters['id'] = {description : 'Id du mot à rechercher.', required : true}
    */
    try {
        if (!await wordModel.findByPk(req.params.id)) {
            return res.status(404).send("Aucun mot trouvé avec cet id.");
        }
        const data = await wordModel.findByPk(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la récuperation d'un mot."
        });
    }
}

/**
 * Ajouter un mot.
 * Path : POST /words
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
addWord = async (req, res) => {
    /*
    #swagger.tags = ['Words']
    #swagger.description = 'Ajoute un mot.'
    #swagger.responses[201] = {description : 'Ajout effectué'}
    #swagger.responses[400] = {description : 'Ce mot existe déjà.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de l\'ajout d\'un mot.'}
    #swagger.parameters['Mot à ajouter.'] = {
        in: 'body',
        '@schema': {
            "required": ["word", "definition", "theme_id"],
            "properties": {
                "word": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": "1,2, 3..."
                },
                "definition": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": "1,2, 3..."
                },
                "theme_id": {
                    "type": "integer",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": 1
                }
            }
        }
    }
    */
    try {
        if (await wordModel.findOne({where: {word: req.body.word}})) {
            return res.status(400).send("Ce mot existe déjà.");
        }
        await wordModel.create(req.body)
        res.status(201).send("Ajout effectué");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de l'ajout d'un mot."
        });
    }
}

/**
 * Modifier un mot.
 * Path : PUT /words/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
modifyWord = async (req, res) => {
    /*
    #swagger.tags = ['Words']
    #swagger.description = 'Modifie un mot'
    #swagger.responses[200] = {description : 'Modification effectuée'}
    #swagger.responses[400] = {description : 'Ce mot existe déjà.'}
    #swagger.responses[404] = {description : 'Aucun mot trouvé avec cet id.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la modification d\'un mot.'}
    #swagger.parameters['id'] = {description : 'Id du mot à modifier.', required : true}
    #swagger.parameters['Champs à modifier'] = {
        in: 'body',
        '@schema': {
            "required": ["word", "definition", "theme_id"],
            "properties": {
                "word": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": "1,2, 3..."
                },
                "definition": {
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": "Some definition..."
                },
                "theme_id": {
                    "type": "integer",
                    "minLength": 1,
                    "maxLength": 255,
                    "example": "1,2, 3..."
                }
            }
        }
    }
     */
    try {
        if (!await wordModel.findByPk(req.params.id)) {
            return res.status(404).send("Aucun mot trouvé avec cet id.");
        }

        if (await wordModel.findOne({where: {word: req.body.word}, id: {[Op.not]: req.params.id}})) {
            return res.status(400).send("Ce mot existe déjà.");
        }

        await wordModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Modification effectuée.");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la modification d'un mot."
        });
    }
}

/**
 * Supprimer un mot.
 * Path : DELETE /words/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
deleteWord = async (req, res) => {
    /*
    #swagger.tags = ['Words']
    #swagger.description = 'Supprime un mot.'
    #swagger.responses[200] = {description : 'Suppression effectuée.'}
    #swagger.responses[404] = {description : 'Aucun mot trouvé avec cet id.'}
    #swagger.responses[500] = {description : 'Erreur survenue lors de la suppression d\'un mot.'}
    #swagger.parameters['id'] = {description : 'Id du mot.', required : true}
    */
    try {
        if (!await wordModel.findByPk(req.params.id)) {
            return res.status(404).send("Aucun mot trouvé avec cet id.");
        }
        await wordModel.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Suppression effectuée");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la suppression d'un mot."
        });
    }
}

module.exports = {
    getAllWords,
    getWordById,
    addWord,
    modifyWord,
    deleteWord
}