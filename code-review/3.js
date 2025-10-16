const express = require('express');
const app = express();

app.get('/search', (req, res) => {
  const query = req.query.q || '';

  const sanitized = query.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Search</title>
</head>
<body>
  <form action="/search" method="get">
    <input name="q" value="${sanitized}" placeholder="Search…" />
    <button type="submit">Search</button>
  </form>

  <div class="results">
    <h2>Results for: ${sanitized}</h2>

    <ul>
      <li data-query="${sanitized}">
        <a href="/item?ref=${encodeURIComponent(sanitized)}">First matching item</a>
      </li>
      <li>
        Preview: <span class="preview">${sanitized}</span>
      </li>
    </ul>
  </div>

  <script>
    try {
      window.__LAST_QUERY = '${sanitized.replace(/'/g, "\\'").replace(/\n/g, '\\n')}';
      if (window.__LAST_QUERY) {
        console.log('last query:', window.__LAST_QUERY);
      }
    } catch (e) {}
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

app.listen(3000);
