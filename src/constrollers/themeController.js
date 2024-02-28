const themeModel = require('../models/themeModel');

getAllThemes = (req, res) => {
    themeModel.getAllThemes((error, data) => {
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
    themeModel.getThemeById(req.params.id, (error, data) => {
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
    console.log(req)
    themeModel.addTheme(new themeModel.themeConstructor(req.body), (error, data) => {
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
    themeModel.modifyTheme(req.params.id, new themeModel.themeConstructor(req.body), (error, data) => {
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
    themeModel.deleteTheme(req.params.id, (error, data) => {
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
