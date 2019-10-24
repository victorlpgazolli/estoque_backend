const db = require('./databaseController');

module.exports = {
    async categoryAdd(req, res) {
        if (db.isConnected()) {
            try {
                var category = {
                    name: req.body.name,
                }
                db.execSQLQuery(`EXECUTE sp_AddCategoria '${category.name}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async categoryAlter(req, res) {
        if (db.isConnected()) {
            try {
                var category = {
                    name: req.body.name,
                    newname: req.body.newname
                }
                db.execSQLQuery(`EXECUTE sp_AlterCategoria '${category.name}', '${category.newname}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async categoryDelete(req, res) {
        if (db.isConnected()) {
            try {
                var category = {
                    name: req.body.name,
                }
                db.execSQLQuery(`EXECUTE sp_DeleteCategoria '${category.name}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async categoryId(req, res) {
        if (db.isConnected()) {
            try {
                var category = {
                    id: req.params.id,
                }
                db.execSQLQuery(`SELECT * FROM tb_categoria WHERE cd_categoria='${category.id}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async categoryList(req, res) {
        if (db.isConnected()) {
            try {
                db.execSQLQuery(`SELECT * FROM tb_categoria;`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB()
        }
    }
}