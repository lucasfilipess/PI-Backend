const connection = require('../database/connection');

module.exports = {

  async index(request, response) {
    try {
      const companies = await connection('users')
        .select('*')
        .where('type', 'donor');

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

  // async create(request, response) {
  //   try {
  //     const { type, name, email, whatsapp, password, description, cep, address, neighborhood, uf } = request.body;

  //     const verify = await connection('users')
  //       .select('email')
  //       .where('email', email)
  //       .first()

  //     if (!verify) {
  //       await connection('users').insert({
  //         type,
  //         name,
  //         email,
  //         whatsapp,
  //         password,
  //         description,
  //         cep,
  //         address,
  //         neighborhood,
  //         uf
  //       })
  //       return response
  //         .status(201)
  //         .json({ status: 'success', message: 'donor created' });
  //     } else {
  //       return response
  //         .status(401)
  //         .json({ error: 'email already registered' });
  //     }
  //   } catch (error) {
  //     return response
  //       .status(500)
  //       .json({ error: 'internal server error' });
  //   }
  // }
};