const db = require('./databaseController');

module.exports = {
    async productAdd(req, res) {
        if (db.isConnected()) {
            try {
                var product = {
                    name: req.body.name,
                    valor_atual: req.body.valor_atual,
                    qnt_atual: req.body.qnt_atual,
                    qnt_min: req.body.qnt_min,
                    category: req.body.category,
                }
                db.execSQLQuery(`EXECUTE sp_AddCategoria '${product.name}','${product.valor_atual}','${product.qnt_atual}','${product.qnt_min}','${product.category}';`, res)
            } catch (err) {
               return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    }, 
    async productAlter(req, res) {
        if (db.isConnected()) {
            try {
                var product = {
                    name: req.body.name,
                    newname: req.body.newname
                }
                db.execSQLQuery(`EXECUTE sp_AddCategoria '${product.codigo}', '${product.name}', '${product.valor_atual}', '${product.qnt_min}', '${product.qnt_atual}', '${product.category}';`, res)
            } catch (err) {
               return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async productDelete(req, res){
        if (db.isConnected()) {
            try {
                var product = {
                    codigo: req.body.codigo,
                }
                db.execSQLQuery(`EXECUTE sp_DeleteCategoria '${product.codigo}';`, res)
            } catch (err) {
               return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    }
}