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
                db.execSQLQuery(`EXECUTE sp_AddCategoria '${category.name}', '${category.newname}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async categoryDelete(req, res){
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
    }
}