const connection = require('../database/connection');

module.exports = {
  async donations(request, response) {
    try {
      const donations = await connection('donations')
        .select('*')
        .where('donor_id', request.id);

      const [count] = await connection('donations')
        .select('*')
        .where('donor_id', request.id)
        .count();

      response.header('X-Total-Count', count['count(*)']);

      if (!donations.length) {
        return response.status(404).json({ msg: 'not donations found' });
      }

      return response.json(donations);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },

  async profileData(request, response) {
    try {
      const donations = await connection('users')
        .select('*')
        .where('id', request.id);

      if (!donations.length) {
        return response.status(404).json({ msg: 'not user found' });
      }

      return response.json(donations);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
};
