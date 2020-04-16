const connection = require('../database/connection');

module.exports = {
  async myDonation(request, response) {
    try {
      const { page = 1 } = request.query;

      const donations = await connection('donations')
        // .join('users', 'users.id', '=', 'donations.donor_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('donations.*')
        .where('donor_id', request.id);

      const [count] = await connection('donations').count();

      response.header('X-Total-Count', count['count(*)']);

      if (!donations.length) {
        return response.status(404).json({ msg: 'not donations found' });
      }

      return response.json(donations);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
  async index(request, response) {
    try {
      const { page = 1 } = request.query;

      const donations = await connection('donations').select('*');

      const [count] = await connection('donations').count();

      response.header('X-Total-Count', count['count(*)']);

      if (!donations.length) {
        return response.status(404).json({ msg: 'not donations found' });
      }

      return response.json(donations);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
  // async index(request, response) {
  //   try {
  //     const { page = 1 } = request.query;

  //     const donations = await connection('donations')
  //       .join('users', 'users.id', '=', 'donations.donor_id')
  //       .limit(5)
  //       .offset((page - 1) * 5)
  //       .select('donations.*');

  //     const [count] = await connection('donations').count();

  //     response.header('X-Total-Count', count['count(*)']);

  //     if (!donations.length) {
  //       return response.status(404).json({ msg: 'not donations found' });
  //     }

  //     return response.json(donations);
  //   } catch (error) {
  //     return response.status(500).json({ error: 'internal server error' });
  //   }
  // },

  async create(request, response) {
    try {
      const donor_id = request.id;

      const [contact] = await connection('users')
        .select('whatsapp', 'email')
        .where('id', donor_id);

      const whatsapp = contact.whatsapp;
      const email = contact.email;

      const {
        title,
        description,
        cep,
        city,
        address,
        neighborhood,
        uf,
      } = request.body;

      await connection('donations').insert({
        title,
        description,
        donor_id,
        cep,
        city,
        address,
        neighborhood,
        uf,
        whatsapp,
        email,
      });
      return response
        .status(201)
        .json({ status: 'success', message: 'donation created' });
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      const donor_id = request.id;

      const donation = await connection('donations')
        .where('id', id)
        .select('donor_id')
        .first();

      if (donation.donor_id != donor_id) {
        return response.status(401).json({ error: 'Operation not permitted.' });
      } else {
        await connection('donations').where('id', id).delete();
        return response
          .status(201)
          .json({ status: 'success', message: 'donation deleted' });
      }
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async getAddress(request, response) {
    try {
      const id = request.id;

      const address = await connection('users')
        .select('cep', 'city', 'address', 'neighborhood', 'uf')
        .where('id', id);

      if (!address.length) {
        return response.status(404).json({ msg: 'not address found' });
      }

      return response.json(address);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
};
