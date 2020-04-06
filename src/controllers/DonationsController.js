const connection = require('../database/connection');

module.exports = {

  async index(request, response) {
    try {

      const { page = 1 } = request.query;

      const donations = await connection('donations')
        .join('users', 'users.id', '=', 'donations.donor_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(
          'donations.*',
          'users.name',
          'users.email',
          'users.whatsapp',
          /* 'users.cep',
           'users.address',
           'users.neighborhood',
           'users.uf'*/
        );

      const [count] = await connection('donations')
        .count();

      response.header('X-Total-Count', count['count(*)']);

      if (!donations.length) {
        return response
          .status(404)
          .json({ msg: 'not donations found' });
      }

      return response.json(donations);
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'internal server error' });

    }
  },

  async create(request, response) {
    try {


      if (request.type !== "donor") {
        return response
          .status(401)
          .json({ error: 'Operation not permitted.' });
      }

      const { title, description, amount, cep, city, address, neighborhood, uf } = request.body;
      const donor_id = request.id;

      await connection('donations').insert({
        title,
        description,
        amount,
        donor_id,
        cep,
        city,
        address,
        neighborhood,
        uf
      });
      return response
        .status(201)
        .json({ status: 'success', message: 'donation created' });

    } catch (error) {
      return response
        .status(500)
        .json({ error: 'internal server error' });

    }
  },


  async delete(request, response) {
    try {

      if (request.type !== "donor") {
        return response
          .status(401)
          .json({ error: 'Operation not permitted.' });
      }
      const { id } = request.params;
      const donor_id = request.id;

      const donation = await connection('donations')
        .where('id', id)
        .select('donor_id')
        .first();


      if (donation.donor_id != donor_id) {
        return response
          .status(401)
          .json({ error: 'Operation not permitted.' });
      }
      await connection('donations').where('id', id).delete();
      return response
        .status(201)
        .json({ status: 'success', message: 'donation deleted' });
    } catch (error) {
      return response
        .status(500)
        .json({ error: 'internal server error' });

    }

  }

};



