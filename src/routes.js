const express = require('express');
const routes = express.Router();

const DonationController = require('./controllers/DonationsController');
const SessionController = require('./controllers/SessionController');
const UsersController = require('./controllers/UsersController');
const auth = require('./middlewares/auth');
const authEmail = require('./middlewares/authEmail');

const { celebrate } = require('celebrate');

const { loginSchema, registerSchema } = require('./middlewares/authUser');



routes.get('/donation', DonationController.index);
routes.post('/donation', DonationController.create);
routes.delete('/donation/:id', DonationController.delete);


routes.post('/register', celebrate({
  body: registerSchema
}), authEmail, UsersController.create);

routes.get('/users', UsersController.index);




routes.post('/login', celebrate({
  body: loginSchema
}), SessionController.login);


module.exports = routes;


