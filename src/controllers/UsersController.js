const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const users = await connection('users').select('*');

      if (!users.length) {
        return response.status(404).json({ msg: 'not users found' });
      }

      return response.json(users);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async getUser(request, response) {
    try {
      const user = await connection('users')
        .where('id', request.id)
        .select('*');

      if (!user.length) {
        return response.status(404).json({ msg: 'not user found' });
      }

      return response.json(user[0]);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async create(request, response) {
    try {
      const {
        name,
        email,
        whatsapp,
        password,
        cep,
        city,
        address,
        neighborhood,
        uf,
        number,
        complement,
      } = request.body;

      await connection('users').insert({
        name,
        email,
        whatsapp,
        password,
        cep,
        city,
        address,
        neighborhood,
        uf,
        number,
        complement,
      });
      return response
        .status(201)
        .json({ status: 'success', message: 'user created' });
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async update(request, response) {
    const id = request.id;
    const {
      address,
      cep,
      checkPassword,
      complement,
      city,
      email,
      name,
      number,
      neighborhood,
      password,
      uf,
      whatsapp,
    } = request.body;
    try {
      const user = await connection('users')
        .select('*')
        .where('id', id)
        .update({
          address,
          cep,
          checkPassword,
          complement,
          city,
          email,
          name,
          number,
          neighborhood,
          password,
          uf,
          whatsapp,
        });
      return response.json(user);
    } catch (error) {
      response.json({
        status: 'could not update instance in database',
        error,
      });
    }
  },
};
