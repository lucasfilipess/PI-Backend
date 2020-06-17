const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    try {
      const donations = await connection('donations')
        .join('users', 'users.id', '=', 'donations.donor_id')
        .select('donations.*', 'users.name');

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
  async getDonation(request, response) {
    try {
      const id = request.params.id;

      const donations = await connection('donations')
        .select('*')
        .where('id', id);

      if (!donations.length) {
        return response.status(404).json({ msg: 'not donations found' });
      }

      return response.json(donations);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async create(request, response) {
    try {
      const donor_id = request.id;

      const [auxData] = await connection('users')
        .select(
          'whatsapp',
          'email',
          'cep',
          'city',
          'address',
          'neighborhood',
          'uf',
          'number',
          'complement'
        )
        .where('id', donor_id);

      let whatsapp = auxData.whatsapp;
      let email = auxData.email;
      let title = request.body.title;
      let description = request.body.description;
      let cep = '';
      let city = '';
      let address = '';
      let neighborhood = '';
      let uf = '';
      let number = '';
      let complement = '';

      if (request.body.checked === 1) {
        cep = auxData.cep;
        city = auxData.city;
        address = auxData.address;
        neighborhood = auxData.neighborhood;
        uf = auxData.uf;
        number = auxData.number;
        complement = auxData.complement;
      } else {
        cep = request.body.cep;
        city = request.body.city;
        address = request.body.address;
        neighborhood = request.body.neighborhood;
        uf = request.body.uf;
        number = request.body.number;
        complement = request.body.complement;
      }

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
        number,
        complement,
      });
      return response
        .status(201)
        .json({ status: 'success', message: 'donation created' });
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async update(request, response) {
    const {
      id,
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
      number,
      complement,
    } = request.body;
    try {
      const donation = await connection('donations')
        .select('*')
        .where('id', id)
        .update({
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
          number,
          complement,
        });
      return response.json(donation);
    } catch (error) {
      response.json({
        status: 'could not update instance in database',
        error,
      });
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
