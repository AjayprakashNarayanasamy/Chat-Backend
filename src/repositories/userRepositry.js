const pool = require('../db/pool');

async function findAllUsers() {
  const query = `
    SELECT
      id,
      name,
      email,
      created_at FROM users ORDER BY name ASC
  `;

  const users = await pool.query(query);

  return users.rows[0] || null;
}

async function findUserByEmailVulnerable(email) {
  const query = `SELECT * FROM users WHERE email = ${email}`;
  const result = await pool.query(query);
  return result.rows;
} // Need to be validated

async function findUserbyEmail(email) {
  console.log('findUserbyEmail', email)
  const query = `SELECT id,
      name,
      email,
      password_hash,
      created_at FROM users WHERE email = $1`;

  const result = await pool.query(query, [email]);
   console.log('findUserbyEmailAjay', result)

  return result.rows[0] || null;
}

async function findUserById(id) {
  const query = `SELECT  id,
      name,
      email,
      created_at FROM users WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

async function createUser({ name, email, password_hash }) {
  const query = `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name,email, created_at`;
  const result = await pool.query(query, [name, email, password_hash]);

  return result.rows[0];
}

module.exports = {
  findAllUsers,
  findUserbyEmail,
  findUserById,
  createUser
};
