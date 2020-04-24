const express = require('express');
const routes = express.Router();

const DonationController = require('./controllers/DonationsController');
const SessionController = require('./controllers/SessionController');
const UsersController = require('./controllers/UsersController');
const ProfileController = require('./controllers/ProfileController');
const auth = require('./middlewares/auth');
const authEmail = require('./middlewares/authEmail');

const { celebrate } = require('celebrate');

const { loginSchema, registerSchema } = require('./middlewares/authUser');

routes.get('/donations', auth, DonationController.index);
routes.post('/donations', auth, DonationController.create);
routes.delete('/donations/:id', auth, DonationController.delete);

routes.get('/donation/address', auth, DonationController.getAddress);

routes.get('/profile/donations', auth, ProfileController.donations);
routes.get('/profile', auth, ProfileController.profileData);

routes.post(
  '/register',
  celebrate({
    body: registerSchema,
  }),
  authEmail,
  UsersController.create
);

routes.get('/users', UsersController.index);

routes.post(
  '/login',
  celebrate({
    body: loginSchema,
  }),
  SessionController.login
);

module.exports = routes;
