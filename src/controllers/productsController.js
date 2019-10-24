const db = require('./databaseController');

module.exports = {
    async productAdd(req, res) {
        if (db.isConnected()) {
            try {
                var product = {
                    name: req.body.name,
                    valor_atual: req.body.valor_atual,
                    qnt_min: req.body.qnt_min,
                    qnt_atual: req.body.qnt_atual,
                    category: req.body.category,
                }
                console.log(product)
                db.execSQLQuery(`exec sp_AddProduto '${product.name}',${product.valor_atual}, ${product.qnt_min} , ${product.qnt_atual} , ${product.category}`, res)
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
                    codigo: req.body.codigo,
                    name: req.body.name,
                    valor_atual: req.body.valor_atual,
                    qnt_min: req.body.qnt_min,
                    qnt_atual: req.body.qnt_atual,
                    category: req.body.category
                }
                db.execSQLQuery(`EXECUTE sp_AlterProduto '${product.codigo}', '${product.name}', '${product.valor_atual}', '${product.qnt_min}', '${product.qnt_atual}', '${product.category}';`, res)
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
                db.execSQLQuery(`EXECUTE sp_DeleteProduto '${product.codigo}';`, res)
            } catch (err) {
               return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async productList(req, res){
        if (db.isConnected()) {
            try {
                db.execSQLQuery(`SELECT * FROM tb_produto`, res)
            } catch (err) {
               return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
}