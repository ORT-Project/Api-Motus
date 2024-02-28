const client = require('../db/DB-connection')

const themeConstructor = function (theme) {
    this.id = theme.id;
    this.name = theme.name;
}

getAllThemes = (result) => {
    client.query('SELECT * From "theme"', async (err, res) => {
        result(err, res.rows)
    })
}

getThemeById = (id, result) => {
    client.query('SELECT * FROM "theme" WHERE "id" = $1', [id], async (err, res) => {
        result(err, res.rows)
    })
}

addTheme = (theme, result) => {
    client.query('INSERT INTO "theme" ("name") VALUES ($1)', [theme.name], async (err, res) => {
        result(err, res)
    })
}

modifyTheme = (id, theme, result) => {
    client.query('UPDATE "theme" SET "name" = $1 WHERE "id" = $2',
        [theme.name, id],
        async (err, res) => {
            result(err, res)
        })
}

deleteTheme = (id, result) => {
    client.query('DELETE FROM "theme" WHERE "id" = $1', [id], async (err, res) => {
        result(err, res)
    })
}

module.exports = {
    themeConstructor,
    getAllThemes,
    getThemeById,
    addTheme,
    modifyTheme,
    deleteTheme
}