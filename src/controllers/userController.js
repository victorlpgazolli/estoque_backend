const db = require('./databaseController');

module.exports = {
    async userLogin(req, res) {
        if (db.isConnected()) {
            const { email, password } = req.body;
            db.execSQLQuery(`EXECUTE sp_Login '${email}','${password}';`, res)
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
                console.log(account)
                db.execSQLQuery(`EXECUTE sp_addUsuario '${account.username}','${account.password}','${account.email}';`, res)
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
    async userDelete(req, res){
        if (db.isConnected()) {
            try {
                var account = {
                    email: req.body.email,
                }
                db.execSQLQuery(`EXECUTE sp_DeleteUsuario '${account.email}';`, res)
            } catch (err) {
                return res.json({ error: err.message })
            }
        } else {
            db.createDB();
        }
    }
}