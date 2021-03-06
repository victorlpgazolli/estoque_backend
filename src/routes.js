const express = require('express');

const db = require('./controllers/databaseController')
const userController = require('./controllers/userController')
const productsController = require('./controllers/productsController')
const categoryController = require('./controllers/categoryController')
const routes = express.Router();

routes.post('/user/add', userController.userAdd);
routes.get('/user/:id', userController.userId);
routes.post('/user/login', userController.userLogin);
routes.post('/user/alterSenha', userController.userAlterSenha);
routes.post('/user/delete', userController.userDelete);

routes.post('/category/add', categoryController.categoryAdd);
routes.post('/category/alter', categoryController.categoryAlter);
routes.post('/category/delete', categoryController.categoryDelete);
routes.get('/category/list', categoryController.categoryList);
routes.get('/category/:id', categoryController.categoryId);

routes.post('/product/add', productsController.productAdd);
routes.post('/product/alter', productsController.productAlter);
routes.post('/product/delete', productsController.productDelete);
routes.get('/product/list', productsController.productList);
routes.post('/product/operation', productsController.productOperation);
routes.post('/product/operation/list', productsController.productListOperations);
routes.get('/product/buyOrder/list', productsController.productListBuyOrder);
routes.post('/product/buyOrder/delete', productsController.productDeleteBuyOrder);

routes.post('/', (req, res) => {
    db.execSQLQuery(`${req.body.query};`, res)
})
routes.get('/', (req, res) => res.json({ ok: 'ok' }))
module.exports = routes;