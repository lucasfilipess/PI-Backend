const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const companies = await connection('users')
        .select('*');

      if (!companies.length) {
        return response
          .status(404)
          .json({ msg: 'not users found' })
      }

      return response.json(companies);

    } catch (error) {
      return response
        .status(500)
        .json({ error: 'internal server error' });
    }
  },


  async create(request, response) {
    try {
      const { name, email, whatsapp, password, description, cep, city, address, neighborhood, uf } = request.body;

      await connection('users').insert({
        name,
        email,
        whatsapp,
        password,
        description,
        cep,
        city,
        address,
        neighborhood,
        uf
      })
      return response
        .status(201)
        .json({ status: 'success', message: 'user created' });


    } catch (error) {
      return response
        .status(500)
        .json({ error: 'internal server error' });
    }
  }



};