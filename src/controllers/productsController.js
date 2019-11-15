const db = require('./databaseController');
//
module.exports = {
    async productListOperations(req, res) {
        if (db.isConnected()) {
            try {
                var product = {
                    id: req.body.id,
                }
                db.execSQLQuery(`select U.nm_usuario as 'usuario', P.nm_produto 'produto', I.qt_produto as 'quantidade', O.nm_operacao as 'tipo' from item_produto_transacao I INNER JOIN tb_usuario U on I.fk_usuario = U.cd_usuario INNER JOIN tb_transacao T on I.fk_transacao = T.cd_transacao INNER JOIN tb_operacao O on T.fk_operacao = O.cd_operacao INNER JOIN tb_produto P on I.fk_produto = P.cd_produto where P.cd_produto = ${parseInt(product.id)};`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
    async productOperation(req, res) {
        if (db.isConnected()) {
            try {
                var product = {
                    qnt: req.body.qnt,
                    id: req.body.id,
                    typeTransaction: req.body.type,
                    userId: req.body.userId,
                }
                console.log(product)
                db.execSQLQuery(`exec sp_AttEstoque '${product.qnt}',${product.id}, ${product.typeTransaction}, ${product.userId}`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
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
    async productDelete(req, res) {
        if (db.isConnected()) {
            try {
                var product = {
                    codigo: req.body.codigo,
                }
                db.execSQLQuery(`EXECUTE sp_DesativarProduto '${parseInt(product.codigo)}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
    async productList(req, res) {
        if (db.isConnected()) {
            try {
                db.execSQLQuery(`EXECUTE sp_ListagemProduto`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
}