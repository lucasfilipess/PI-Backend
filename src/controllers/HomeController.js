const connection = require('../database/connection');

module.exports = {
  async getDonations(request, response) {
    try {
      let [count] = await connection('donations').count();
      count = count['count(*)'];
      return response.json(count);
    } catch (error) {
      return response.status(500).json({ error: 'internal server error' });
    }
  },
};
