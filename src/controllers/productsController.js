const db = require('./databaseController');
//
module.exports = {
    async productDeleteBuyOrder(req, res) {
        if (db.isConnected()) {
            try {
                var buyOrder = {
                    id: req.body.id,
                }
                db.execSQLQuery(`update tb_ordem_compra set tp_status_ordem = 0 where cd_ordem_compra = ${buyOrder.id}`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
    async productListBuyOrder(req, res) {
        if (db.isConnected()) {
            try {
                db.execSQLQuery(`select O.cd_ordem_compra as 'codigo', P.nm_produto as 'produto', O.qt_produto as 'quantidade', O.tp_status_ordem as 'status'  from tb_ordem_compra O INNER JOIN tb_produto P on O.fk_produto_compra = P.cd_produto`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
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
                // return res.status(200).json({ response: `exec sp_AttEstoque '${product.qnt}',${product.id}, ${product.typeTransaction}, ${product.userId}` })
                db.execSQLQuery(`exec sp_AttEstoque ${product.qnt},${product.id}, ${product.typeTransaction}, ${product.userId}`, res)
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
                db.execSQLQuery(`exec sp_AddProduto '${product.name}',${product.valor_atual}, ${product.qnt_min} , ${product.qnt_atual} , ${product.category}, 1`, res)
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
                db.execSQLQuery(`EXECUTE sp_AlterProduto '${product.codigo}', '${product.name}', '${product.valor_atual}', '${product.qnt_min}', '${product.qnt_atual}', '${product.category}', 1;`, res)
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