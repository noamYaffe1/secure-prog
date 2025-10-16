const mysql = require('mysql2/promise');
const crypto = require('crypto');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'app_user',
  password: process.env.DB_PASS || 'change_me',
  database: process.env.DB_NAME || 'myDbName',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

async function createPasswordReset(email) {
  const conn = await pool.getConnection();
  try {
    const [users] = await conn.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return { success: false, message: 'No account found for that email.' };
    }

    const userId = users[0].id;
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    await conn.execute(
      'INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)',
      [userId, token, expiresAt]
    );

    return { success: true, resetToken: token };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Internal error.' };
  } finally {
    conn.release();
  }
}

module.exports = { createPasswordReset };
