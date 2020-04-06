const connection = require('../database/connection');
const GenerateToken = require('../utils/GenerateToken');

module.exports = {
  async login(request, response) {
    try {

      const { email, password } = request.body


      const rows = await connection('users')
        .select('password', 'id', 'type', 'name')
        .where('email', email)
        .first();


      if (!rows) {
        return response.status(404).json({ msg: 'bad credentials' });
      }

      if (password === rows.password) {

        const token = GenerateToken({
          id: rows.id,
          type: rows.type,
        });

        const id = rows.id;
        const name = rows.name;
        const type = rows.type;

        return response
          .status(200)
          .json({ id, type, name, token });
      } else {
        return response.status(404).json({ msg: 'bad credentials' });
      }

    } catch (error) {
      return response
        .status(500)
        .json({ error: 'internal server error' });

    }
  }
}
