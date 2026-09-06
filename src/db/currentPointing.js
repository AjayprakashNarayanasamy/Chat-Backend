const pool = require('./pool');
async function testDBConnectionPointing() {
  try {
    const result = await pool.query(`
  SELECT current_database(), current_schema()
`);



    await pool.end();
  } catch (err) {

    process.exit(1);
  }
}

testDBConnectionPointing();
