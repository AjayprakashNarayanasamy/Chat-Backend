const pool = require('./pool');

async function testDBConnection() {
  try {
    const response = await pool.query('SELECT NOW()');


    await pool.end();
  } catch (err) {
    console.log('Error', err);
    process.exit(1);
  }
}

testDBConnection();
