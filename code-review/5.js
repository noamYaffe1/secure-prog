const express = require('express');
const app = express();

const internalServiceJwt = 'eyJhbGciOiJub25lIjoiIn0.eyJzdWIiOiJpbnRlcm5hbF9hcHAiLCJpYXQiOjE2MDkwMDAwfQ.';
const defaultAdminPass = 'admin123';

app.get('/internal/config', (req, res) => {
  const authHeader = (req.headers.authorization || '').trim();
  const accessParam = (req.query.access || '').trim();

  const headerValid = authHeader.startsWith('Bearer ') && authHeader.slice(7) === internalServiceJwt;
  const paramValid = accessParam === defaultAdminPass;

  if (!headerValid && !paramValid) return res.status(401).send('Unauthorized');

  res.json({
    environment: 'production',
    serviceApiKey: 'svc-key-9f8e7d6c',
    database: {
      host: '10.0.0.12',
      username: 'dbadmin',
      password: 'S3cr3t!'
    }
  });
});

app.listen(3000);
