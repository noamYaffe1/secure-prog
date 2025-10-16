const express = require('express');
const app = express();

app.get('/admin/delete', async (req, res) => {
  const userEmail = req.query.userEmail || '';
  const role = req.query.role || '';

  if (role === 'admin') {
    // simulate deletion
    const deleted = true;
    if (deleted) {
      res.status(200).send('User with email ' + userEmail + ' has been deleted.');
    } else {
      res.status(500).send('Failed to delete user with email ' + userEmail + '.');
    }
  } else {
    res.status(403).send('Access denied. User with email ' + userEmail + ' cannot be deleted.');
  }
});

app.listen(3000);
