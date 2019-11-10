const db = require('./databaseController');

module.exports = {
    async userLogin(req, res) {
        if (db.isConnected()) {
            const { email, password } = req.body;
            db.execSQLQuery(`SELECT * FROM tb_usuario WHERE nm_email='${email}' and cd_senha='${password}';`, res)
        } else {
            db.createDB();
        }
    },
    async userAdd(req, res) {
        if (db.isConnected()) {
            try {
                var account = {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }
                db.executeAuth(`SELECT * FROM tb_usuario WHERE nm_usuario='${account.username}' and nm_email='${account.email}' and cd_senha='${account.password}';`, res, account)

                // await db.execute(`EXECUTE sp_addUsuario '${account.username}','${account.password}','${account.email}';`)
                // db.execSQLQuery(`SELECT * FROM tb_usuario WHERE nm_usuario='${account.username}' and nm_email='${account.email}' and cd_senha='${account.password}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
    async userAlterSenha(req, res) {
        if (db.isConnected()) {
            try {
                var account = {
                    email: req.body.email,
                    password: req.body.password,
                    newpassword: req.body.newpassword
                }
                db.execSQLQuery(`EXECUTE sp_AlterSenha '${account.email}','${account.password}','${account.newpassword}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
    async userDelete(req, res) {
        if (db.isConnected()) {
            try {
                var account = {
                    email: req.body.email,
                }
                console.log(account)
                db.execSQLQuery(`EXECUTE sp_DesativaUsuario '${account.email}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    },
    async userId(req, res) {
        if (db.isConnected()) {
            try {
                var user = {
                    id: req.params.id,
                }
                db.execSQLQuery(`SELECT * FROM tb_usuario WHERE cd_usuario='${user.id}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }

        } else {
            db.createDB();
        }
    },
}