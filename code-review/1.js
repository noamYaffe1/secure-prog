const mysql = require('mysql2/promise');

async function getUser(username, password) {
  const conn = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '!Aa123456',
    database: 'myDbName'
  });

  const query =
    "SELECT username, email, address, age FROM users WHERE username = '" +
    username +
    "' AND password = '" +
    password +
    "'";

  try {
    const [rows] = await conn.query(query);
    await conn.end();

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        username: r.username,
        email: r.email,
        address: r.address,
        age: r.age
      };
    }
    return null;
  } catch (err) {
    console.error(err);
    try { await conn.end(); } catch (_) {}
    return null;
  }
}

module.exports = { getUser };
