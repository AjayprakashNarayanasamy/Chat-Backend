const { Pool } = require('pg');
const { databaseUrl } = require('../config/env');
const { connectionString } = require('pg/lib/defaults');

const pool = new Pool({
  connectionString: databaseUrl,
});

pool.on('error', (error) => {
  console.log('Connection to DB has been Failed', error);
});

console.log('POOL', pool.query);

module.exports = pool;
