const bookModel = require('../models/themeModel');

getAllThemes = (req, res) => {
    bookModel.getAllThemes((error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Erreur survenue lors de la recuperation des themes."
            });
        } else {
            res.status(200).send(data);
        }
    });
}

getThemeById = (req, res) => {
    bookModel.getThemeById(req.params.id, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Erreur survenue lors de la recuperation d'un theme."
            });
        } else {
            res.status(200).send(data);
        }
    });
}

addTheme = (req, res) => {
    bookModel.addTheme(new bookModel.themeConstructor(req.body), (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Erreur survenue lors de l'ajout d'un theme."
            });
        } else {
            res.status(201).send(data);
        }
    });
}

modifyTheme = (req, res) => {
    bookModel.modifyTheme(req.params.id, new bookModel.themeConstructor(req.body), (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Erreur survenue lors de la moditication d'un theme."
            });
        } else {
            res.status(200).send(data);
        }
    });
}

deleteTheme = (req, res) => {
    bookModel.deleteTheme(req.params.id, (error, data) => {
        if (error) {
            res.status(500).send({
                message: error.message || "Erreur survenue lors de la suppression d'un theme."
            });
        } else {
            res.status(200).send(data);
        }
    });
}

module.exports = {
    getAllThemes,
    getThemeById,
    addTheme,
    modifyTheme,
    deleteTheme
}
