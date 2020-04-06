const express = require('express');
const routes = express.Router();

const CompaniesController = require('./controllers/CompaniesController');
const DonorsController = require('./controllers/DonorsController');
const DonationController = require('./controllers/DonationsController');
const SessionController = require('./controllers/SessionController');
const UsersController = require('./controllers/UsersController');
const authMiddleware = require('./middlewares/auth');

routes.get('/company', CompaniesController.index);
// routes.post('/company', CompaniesController.create);

routes.get('/donor', DonorsController.index);
// routes.post('/donor', DonorsController.create);

routes.get('/donation', DonationController.index);
routes.post('/donation', authMiddleware, DonationController.create);
routes.delete('/donation/:id', authMiddleware, DonationController.delete);


routes.post('/register', UsersController.create);
routes.get('/users', UsersController.index);



routes.post('/login', SessionController.login);


module.exports = routes;


