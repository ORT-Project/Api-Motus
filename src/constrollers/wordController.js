const wordModel = require('../models/wordModel');


/**
 * Récupère tous les mots
 * Path : GET /words
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getAllWords = async (req, res) => {
    console.log('getAllWords');
    try {
        const data = await wordModel.findAll()
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation des mots."
        });
    }
}

/**
 * Récupère un mot par son id
 * Path : GET /words/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
getWordById = async (req, res) => {
    console.log('getWordById')
    try {
        const data = await wordModel.findByPk(req.params.id)
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la recuperation d'un mot."
        });
    }
}

/**
 * Ajouter un mot
 * Path : POST /words
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
addWord = async (req, res) => {
    try {
        await wordModel.create(req.body)
        res.status(201).send("Ajout effectué");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de l'ajout d'un mot."
        });
    }
}

/**
 * Modifier un mot
 * Path : PUT /words/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
modifyWord = async (req, res) => {
    try {
        await wordModel.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).send("Modification effectuée");
    } catch (error) {
        res.status(500).send({
            message: error.message || "Erreur survenue lors de la moditication d'un mot."
        });
    }
}

/**
 * Supprimer un mot
 * Path : DELETE /words/:id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
deleteWord = async (req, res) => {
    try {
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